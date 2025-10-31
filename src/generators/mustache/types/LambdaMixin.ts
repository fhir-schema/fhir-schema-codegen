
export type LambdaMixin = {
    lambda: {
        camelCase: () => (text: string, render: (input: string)=>string) => string;
        snakeCase: () => (text: string, render: (input: string)=>string) => string;
        pascalCase: () => (text: string, render: (input: string)=>string) => string;
        kebabCase: () => (text: string, render: (input: string)=>string) => string;
        lowerCase: () => (text: string, render: (input: string)=>string) => string;
        upperCase: () => (text: string, render: (input: string)=>string) => string;
    }
}