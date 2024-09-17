import * as path from 'path';
import { Command } from 'commander';
import { FileUtils } from '../Utils/FileUtils';
import { StringUtils } from '../Utils/StringUtils';
import {
    getModelTemplate,
    getRouterTemplate,
    getControllerTemplate,
    getServiceTemplate
} from '../templates/express/templates';

export function setupGenerateExpressCommand(program: Command) {
    program
        .command('generate-express <name>')
        .alias('g e')  // Alias for 'generate-express'
        .alias('g-e') // Alias for 'generate-express'
        .option('-p, --path <path>', 'Specify the output directory', './')
        .option('--js', 'Generate JavaScript (.js) files instead of TypeScript (.ts)')
        .description('Generate files for an Express app: model, router, controller, and service')
        .action(async (name: string, cmdObj: { path?: string; js?: boolean }) => {
            const outputPath = cmdObj.path || './';
            const folderPath = path.join(outputPath, name);
            const ext = cmdObj.js ? 'js' : 'ts'; // Switch between js and ts file extensions

            const dirCreated = await FileUtils.ensureDirExists(folderPath, true);

            if (dirCreated) {
                const replacements = {
                    Name: StringUtils.capitalize(name),
                    name: name.toLowerCase()
                };

                // Define file paths
                const modelFile = path.join(folderPath, `${name}.model.${ext}`);
                const routerFile = path.join(folderPath, `${name}.router.${ext}`);
                const controllerFile = path.join(folderPath, `${name}.controller.${ext}`);
                const serviceFile = path.join(folderPath, `${name}.service.${ext}`);

                // Retrieve templates
                const modelTemplate = getModelTemplate(replacements);
                const routerTemplate = getRouterTemplate(replacements);
                const controllerTemplate = getControllerTemplate(replacements);
                const serviceTemplate = getServiceTemplate(replacements);

                // Create the files
                FileUtils.createFile(modelFile, modelTemplate);
                FileUtils.createFile(routerFile, routerTemplate);
                FileUtils.createFile(controllerFile, controllerTemplate);
                FileUtils.createFile(serviceFile, serviceTemplate);

                console.log(`Express files generated successfully for ${name} at ${folderPath}`);
                process.exit(0)
            }
        });
}
