import { Generator, type GeneratorOptions } from "../generator";
import type { TypeSchema } from "../typeschema";
import {capitalize} from "../utils";

export interface TypeScriptGeneratorOptions extends GeneratorOptions {
  generateClasses?: boolean;
}

const typeMap: Record<string, string> = {
  boolean: "boolean",
  integer: "number",
  decimal: "number",
  positiveInt: "number",
  number: "number",
  // 'instant': 'date',
  // 'dateTime': 'date',
  // 'date': 'date'
};


function kebabToCamelCase(input: string){
  return input.split("-").map(capitalize).join("")
}


export class TypeScriptGenerator extends Generator {
  private generateClasses: boolean;
  constructor(options: TypeScriptGeneratorOptions) {
    super(options);
    this.generateClasses = options.generateClasses ?? false;
  }

  generateType(schema: TypeSchema) {
    const base = schema.base ? `extends ${schema.base.name}` : "";
    const typeName = schema.name.name.includes("-") ? kebabToCamelCase(schema.name.name)  : schema.name.name;
    this.curlyBlock(["export", "interface", typeName, base], () => {
      if (schema.fields) {
        for (const [fieldName, field] of Object.entries(schema.fields).sort(
          (a, b) => a[0].localeCompare(b[0]),
        )) {
          const tp = field.type.name;
          let type = tp;
          let fieldSymbol = fieldName;
          if (!field.required) {
            fieldSymbol += "?";
          }
          if (field.type.type === "primitive-type") {
            type = typeMap[tp] || "string";
          } else {
            type = field.type.name;
          }
          this.lineSM(fieldSymbol, ":", type + (field.array ? "[]" : ""));
        }
      }
    });
    this.line();
  }
  generate() {
    this.dir("src", async () => {
      this.file("types.ts", () => {
        for (const schema of this.loader.complexTypes()) {
          this.generateType(schema);
        }
      });

      for (const schema of this.loader.resources()) {
        this.file(`${schema.name.name}.ts`, () => {
          if (schema.allDependencies) {
            const commonDeps: string[] = [];
            for (const dep of schema.allDependencies) {
              if (dep.type === "complex-type") {
                commonDeps.push(dep.name);
              }
            }
            this.lineSM(
              "import",
              "type",
              "{",
              commonDeps.join(", "),
              "}",
              "from",
              '"./types.ts"',
            );

            for (const dep of schema.allDependencies.filter(
              (d) => d.type === "resource",
            )) {
              this.lineSM(
                "import",
                "type",
                "{",
                dep.name,
                "}",
                "from",
                `"./${dep.name}.ts"`,
              );
            }
          }

          this.line();

          if (schema.nestedTypes) {
            for (const subtype of schema.nestedTypes) {
              this.generateType(subtype);
            }
          }
          this.line();

          this.generateType(schema);
        });
      }
    });
  }
}
