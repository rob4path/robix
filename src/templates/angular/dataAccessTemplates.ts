export function getModelTemplate(entity: string): string {
    return `
export interface ${entity}Model {
  id: number;
  // Define other properties here
}
  `;
}

export function getServiceTemplate(entity: string): string {
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
