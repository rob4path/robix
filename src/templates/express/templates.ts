export function getModelTemplate(replacements: { Name: string; name: string }): string {
    return `
    export interface ${replacements.Name} {
      id: number;
      // Add your model properties here
    }
  `;
}

export function getRouterTemplate(replacements: { Name: string; name: string }): string {
    return `
    import { Router } from 'express';
    import { get${replacements.Name} } from './${replacements.name}.controller';

    const router = Router();

    router.get('/', get${replacements.Name});

    export default router;
  `;
}

export function getControllerTemplate(replacements: { Name: string; name: string }): string {
    return `
    import { Request, Response } from 'express';
    import { ${replacements.Name}Service } from './${replacements.name}.service';

    export const get${replacements.Name} = async (req: Request, res: Response) => {
      const data = await ${replacements.Name}Service.getAll();
      res.json(data);
    };
  `;
}

export function getServiceTemplate(replacements: { Name: string; name: string }): string {
    return `
    export class ${replacements.Name}Service {
      static async getAll() {
        // Your service logic to fetch data
        return [{ id: 1, name: '${replacements.name}' }];
      }
    }
  `;
}
