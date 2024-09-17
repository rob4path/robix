"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceTemplate = exports.getControllerTemplate = exports.getRouterTemplate = exports.getModelTemplate = void 0;
function getModelTemplate(replacements) {
    return `
    export interface ${replacements.Name} {
      id: number;
      // Add your model properties here
    }
  `;
}
exports.getModelTemplate = getModelTemplate;
function getRouterTemplate(replacements) {
    return `
    import { Router } from 'express';
    import { get${replacements.Name} } from './${replacements.name}.controller';

    const router = Router();

    router.get('/', get${replacements.Name});

    export default router;
  `;
}
exports.getRouterTemplate = getRouterTemplate;
function getControllerTemplate(replacements) {
    return `
    import { Request, Response } from 'express';
    import { ${replacements.Name}Service } from './${replacements.name}.service';

    export const get${replacements.Name} = async (req: Request, res: Response) => {
      const data = await ${replacements.Name}Service.getAll();
      res.json(data);
    };
  `;
}
exports.getControllerTemplate = getControllerTemplate;
function getServiceTemplate(replacements) {
    return `
    export class ${replacements.Name}Service {
      static async getAll() {
        // Your service logic to fetch data
        return [{ id: 1, name: '${replacements.name}' }];
      }
    }
  `;
}
exports.getServiceTemplate = getServiceTemplate;
