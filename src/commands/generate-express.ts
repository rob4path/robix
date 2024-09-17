import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { Command } from 'commander';

// Helper function to ask for user confirmation
function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, (ans: string) => {
        rl.close();
        resolve(ans);
    }));
}

// Helper function to create the files
function createFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
    console.log(`File created: ${filePath}`);
}

export function setupGenerateExpressCommand(program: Command) {
    program
        .command('generate-express <name>')
        .option('-p, --path <path>', 'Specify the output directory', './')
        .description('Generate files for an Express app: model, router, controller, and service')
        .action(async (name: string, cmdObj: { path?: string }) => {
            const outputPath = cmdObj.path || './';
            const folderPath = path.join(outputPath, name);

            // Check if directory already exists
            if (fs.existsSync(folderPath)) {
                const answer = await askQuestion(`Directory ${folderPath} already exists. Do you want to overwrite it? (yes/no): `);

                if (answer.toLowerCase() !== 'yes') {
                    console.log('Operation canceled.');
                    return;
                }
            } else {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log(`Directory created: ${folderPath}`);
            }

            // Generate the files
            const modelFile = path.join(folderPath, `${name}.model.ts`);
            const routerFile = path.join(folderPath, `${name}.router.ts`);
            const controllerFile = path.join(folderPath, `${name}.controller.ts`);
            const serviceFile = path.join(folderPath, `${name}.service.ts`);

            // File content templates
            const modelTemplate = `
        export interface ${capitalize(name)} {
          id: number;
          // Add your model properties here
        }
      `;

            const routerTemplate = `
        import { Router } from 'express';
        import { get${capitalize(name)} } from './${name}.controller';

        const router = Router();

        router.get('/', get${capitalize(name)});

        export default router;
      `;

            const controllerTemplate = `
        import { Request, Response } from 'express';
        import { ${capitalize(name)}Service } from './${name}.service';

        export const get${capitalize(name)} = async (req: Request, res: Response) => {
          const data = await ${capitalize(name)}Service.getAll();
          res.json(data);
        };
      `;

            const serviceTemplate = `
        export class ${capitalize(name)}Service {
          static async getAll() {
            // Your service logic to fetch data
            return [{ id: 1, name: '${name}' }];
          }
        }
      `;

            // Create the files
            createFile(modelFile, modelTemplate);
            createFile(routerFile, routerTemplate);
            createFile(controllerFile, controllerTemplate);
            createFile(serviceFile, serviceTemplate);

            console.log(`Express files generated successfully for ${name} at ${folderPath}`);
        });
}

// Helper function to capitalize the first letter of the name
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
