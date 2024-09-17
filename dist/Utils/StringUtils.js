"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
class StringUtils {
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static kebabToCamel(str) {
        return str
            .toLowerCase()
            .replace(/-./g, (match) => match.charAt(1).toUpperCase());
    }
}
exports.StringUtils = StringUtils;
