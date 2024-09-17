"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceTemplate = exports.getModelTemplate = void 0;
function getModelTemplate(entity) {
    return `
export interface ${entity}Model {
  id: number;
  // Define other properties here
}
  `;
}
exports.getModelTemplate = getModelTemplate;
function getServiceTemplate(entity) {
    return `
import { Injectable } from '@angular/core';
import { ${entity}Model } from './${entity}.model';

@Injectable({
  providedIn: 'root'
})
export class ${entity}Service {
  // Define service methods here
}
  `;
}
exports.getServiceTemplate = getServiceTemplate;
