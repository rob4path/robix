"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlTemplate = void 0;
function getHtmlTemplate(name, template) {
    switch (template) {
        case 'table':
            return `<table><tr><td>${name} Table Component</td></tr></table>`;
        case 'dialog':
            return `<div class="dialog">${name} Dialog Component</div>`;
        case 'basic':
        default:
            return `<p>${name} works!</p>`;
    }
}
exports.getHtmlTemplate = getHtmlTemplate;
