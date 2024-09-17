export class StringUtils {
    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static kebabToCamel(str: string): string {
        return str
            .toLowerCase()
            .replace(/-./g, (match) => match.charAt(1).toUpperCase());
    }
}
