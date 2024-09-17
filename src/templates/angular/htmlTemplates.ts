export function getHtmlTemplate(name: string, template: string): string {
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
