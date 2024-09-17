"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentTemplate = void 0;
function getComponentTemplate(name, template) {
    switch (template) {
        case 'table':
            return `
import { Component } from '@angular/core';

@Component({
  selector: '${name}',
  templateUrl: './${name}.component.html',
  styleUrls: ['./${name}.component.scss']
})
export class ${name}Component {
  // Table-specific logic here
}
      `;
        case 'dialog':
            return `
import { Component } from '@angular/core';

@Component({
  selector: '${name}',
  templateUrl: './${name}.component.html',
  styleUrls: ['./${name}.component.scss']
})
export class ${name}Component {
  // Dialog-specific logic here
}
      `;
        case 'basic':
        default:
            return `
import { Component } from '@angular/core';

@Component({
  selector: '${name}',
  templateUrl: './${name}.component.html',
  styleUrls: ['./${name}.component.scss']
})
export class ${name}Component {
  constructor() {}
}
      `;
    }
}
exports.getComponentTemplate = getComponentTemplate;
