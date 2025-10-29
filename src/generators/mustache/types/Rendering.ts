export type Rendering = {
    source: string;
    fileNameFormat: string;
    path: string;
    filter?: {
        whitelist?: (string | RegExp)[];
        blacklist?: (string | RegExp)[];
    }
    properties?: Record<string, any>;
}