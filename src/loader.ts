import { assert } from "node:console";
import fs from "node:fs/promises";
import type {
  FHIRSchema,
  FHIRSchemaBase,
  FHIRSchemaElement,
} from "./fhirschema";
import type { ClassField, TypeRef } from "./typeschema";
import { type TypeRefType, TypeSchema } from "./typeschema";
import {capitalize, isCapitalized} from "./utils";

export type { FHIRSchema } from "./fhirschema";
export type { ITypeSchema } from "./typeschema";



function convertField(
  dest: TypeSchema,
  root: FHIRSchema,
  typeschema: TypeSchema,
  path: string[],
  fieldName: string,
  field: FHIRSchemaElement,
  node: FHIRSchemaBase,
): void {
  if (field.choices) {
    dest.choices ||= {};
    dest.choices[fieldName] = {
      choices: field.choices,
    };
    return;
  }
  let typename: string | undefined;
  let parent = null;
  let type: TypeRefType | undefined = undefined;
  if (field.elements) {
    typename = path.join("");
    parent = root.name;
    type = "nested";

    const nestedschema = new TypeSchema({
      kind: "nested",
      name: {
        name: typename,
        package: root["package-meta"].name,
        parent: root.name,
      },
      base: {
        name: "BackboneElement",
        package: root["package-meta"].name,
      },
    });
    typeschema.ensureDep({
      name: "BackboneElement",
      package: root["package-meta"].name,
      type: "complex-type",
    });
    addFields(nestedschema, root, typeschema, [...path], field);
    typeschema.nestedTypes ||= [];
    typeschema.nestedTypes.push(nestedschema);
  } else if (field.choices) {
    typename = "choice";
    type = "choice";
  } else if (field.type) {
    typename = field.type;
    if (isCapitalized(typename)) {
      type = "complex-type";
    } else {
      type = "primitive-type";
    }
  } else if (field.elementReference) {
    type = "nested";
    const path = [...field.elementReference.slice(1)].filter(
      (part) => part !== "elements",
    );
    typename = typeschema.name.name + path.map(capitalize).join("");
    // console.log('elementReference', typename);
  } else {
    // console.log('Unknown field type: ' + JSON.stringify(field))
    typename = "unknown";
    type = "unknown";
  }
  const typeref: TypeRef = {
    name: typename,
    package: root["package-meta"].name,
    type: type,
  };
  const typekey = `${typeref.package}/${typeref.name}`;

  typeschema.ensureDep(typeref);

  if (parent) {
    typeref.parent = parent;
  }

  const result: ClassField = { type: typeref };

  if (field.array) {
    result.array = true;
  }

  if (field.choiceOf) {
    result.choiceOf = field.choiceOf;
  }

  if (node.required?.some((req) => req === fieldName)) {
    result.required = true;
  }

  if (field.binding) {
    const binding = field.binding;
    const vsref: TypeRef = {
      name: extractBase(binding.valueSet),
      package: root["package-meta"].name,
      url: binding.valueSet,
      type: "valueset",
    };
    result.binding = {
      valueSet: vsref,
      strength: field.binding.strength,
    };
    typeschema.ensureDep(vsref);
  }

  dest.fields ||= {};
  dest.fields[fieldName] = result;
}

function addFields(
  dest: TypeSchema,
  root: FHIRSchema,
  typeschema: TypeSchema,
  path: string[],
  node: FHIRSchemaBase,
): void {
  for (const [key, field] of Object.entries(node.elements || {})) {
    const newPath = [...path, capitalize(key)];
    convertField(dest, root, typeschema, newPath, key, field, node);
  }
}

function extractBase(url: string): string {
  return url.split("/")?.pop() ?? "";
}

export function convert(schema: FHIRSchema): TypeSchema {
  let kind: TypeRefType = "unknown";
  if (schema.kind === "resource" && schema.derivation === "constraint") {
    kind = "profile";
  } else if (schema.kind === "resource") {
    kind = "resource";
  } else if (schema.kind === "complex-type") {
    kind = "complex-type";
  } else if (schema.kind === "primitive-type") {
    kind = "primitive-type";
  } else if (schema.kind === "logical") {
    kind = "logical";
  }

  assert(
    `Unknown schema kind: ${schema.kind}/${schema.derivation} ${JSON.stringify(schema)}`,
  );

  const res: TypeSchema = new TypeSchema({
    kind: kind,
    name: { name: schema.name, package: schema["package-meta"].name },
  });

  if (schema.base) {
    const ref = {
      name: extractBase(schema.base),
      package: schema["package-meta"].name,
    };
    res.base = ref;
    res.ensureDep({ name: ref.name, package: ref.package, type: "resource" });
  }

  if (schema.elements) {
    addFields(res, schema, res, [schema.name], schema);
  }

  return res;
}

export interface LoaderOptions {
  urls?: string[];
  files?: string[];
  dirs?: string[];
}

export class SchemaLoader {
  private opts: LoaderOptions;
  private canonicalResources: Record<string, any> = {};
  private convertedCanonicalResources: Record<string, any> = {};

  constructor(opts: LoaderOptions = { urls: [], files: [], dirs: [] }) {
    this.opts = opts;
  }

  async load() {
    if (this.opts.urls) {
      for (const url of this.opts.urls) {
        await this.loadFromURL(url);
      }
    }
    if (this.opts.files) {
      for (const file of this.opts.files) {
        await this.loadFromFile(file);
      }
    }
    if (this.opts.dirs) {
      for (const dir of this.opts.dirs) {
        await this.loadFromDirectory(dir);
      }
    }
  }

  loadNDJSONContent(text: string) {
    const lines = text.split("\n").filter((line) => line.trim().length > 0);
    for (const line of lines) {
      const resource = JSON.parse(line);
      const rt =
        resource.resourceType ||
        (resource["package-meta"] && "FHIRSchema") ||
        "Package";
      this.canonicalResources[rt] ||= [];
      this.canonicalResources[rt].push(resource);
      if(rt === 'FHIRSchema') {
        this.convertedCanonicalResources[rt] ||= [];
        this.convertedCanonicalResources[rt].push(convert(resource));
      }
    }
  }

  async loadFromURL(url: string) {
    const response = await fetch(url);

    let text: string;
    if (url.endsWith(".gz")) {
      const buffer = await response.arrayBuffer();
      const decompressed = await new Response(
        new Blob([buffer])
          .stream()
          .pipeThrough(new DecompressionStream("gzip")),
      ).text();
      text = decompressed;
    } else {
      text = await response.text();
    }
    this.loadNDJSONContent(text);
  }

  async loadFromFile(path: string) {
    let text: string;
    if (path.endsWith(".gz")) {
      const buffer = await fs.readFile(path);
      const decompressed = await new Response(
        new Blob([buffer])
          .stream()
          .pipeThrough(new DecompressionStream("gzip")),
      ).text();
      text = decompressed;
    } else {
      text = await fs.readFile(path, "utf-8");
    }
    this.loadNDJSONContent(text);
  }

  async loadFromDirectory(path: string) {}

  resources(): TypeSchema[] {
    return this.canonicalResources.FHIRSchema.map((res: FHIRSchema) => {
      return convert(res);
    }).filter((res: TypeSchema) => res.kind === "resource");
  }

  profiles(): TypeSchema[] {
    return this.convertedCanonicalResources.FHIRSchema.filter(
      (res: TypeSchema) => res.kind === "profile",
    );
  }

  primitives(): TypeSchema[] {
    return this.convertedCanonicalResources.FHIRSchema.filter(
      (res: TypeSchema) => res.kind === "primitive-type",
    );
  }

  complexTypes(): TypeSchema[] {
    return this.convertedCanonicalResources.FHIRSchema.filter(
      (res: TypeSchema) =>
        res.kind === "complex-type" && res.base?.name !== "Extension",
    );
  }

  extensions(): TypeSchema[] {
    return [];
  }

  valueSets(): TypeSchema[] {
    return [];
  }
}
