export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isCapitalized(str: string): boolean {
    return (str && str[0] === str[0].toUpperCase()) || false;
}
