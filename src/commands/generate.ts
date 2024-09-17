import * as path from 'path';
import { Command } from 'commander';
import { FileUtils } from '../Utils/FileUtils';
import { StringUtils } from '../Utils/StringUtils';
import { getComponentTemplate } from '../templates/angular/componentTemplates';
import { getHtmlTemplate } from '../templates/angular/htmlTemplates';
import { getModelTemplate, getServiceTemplate } from '../templates/angular/dataAccessTemplates';

export function setupGenerateCommand(program: Command) {
    program
        .command('g <name>')
        .option('-p, --path <path>', 'Specify the output directory')
        .option('-e, --entity <entity>', 'Specify the entity name for data-access files')
        .option('-w, --wrapper <wrapper>', 'Specify an optional wrapper directory')
        .option('--service', 'Generate a service file')
        .option('--template <template>', 'Specify the component template (table, basic, dialog)', 'basic')
        .description('Generate a new component, service, or module')
        .action(async (name: string, cmdObj: { path?: string; entity?: string; wrapper?: string; service?: boolean; template?: string }) => {
            const outputPath = cmdObj.path || './';
            const wrapper = cmdObj.wrapper || '';
            const entity = cmdObj.entity;
            const createService = cmdObj.service || false;
            const template = cmdObj.template || 'basic';

            const componentName = StringUtils.kebabToCamel(name);
            const entityName = entity ? StringUtils.kebabToCamel(entity) : undefined;

            let fullPath = path.join(process.cwd(), outputPath);

            if (wrapper) {
                fullPath = path.join(fullPath, wrapper);
            }

            const dirCreated = await FileUtils.ensureDirExists(fullPath, true);

            if (dirCreated) {
                // Generate component
                generateComponent(componentName, fullPath, template);

                // Generate data-access files if entity or service is provided
                if (entityName || createService) {
                    generateDataAccess(entityName, fullPath, createService);
                }
            }
            process.exit(0)

        });
}

function generateComponent(name: string, outputPath: string, template: string) {
    const componentDir = path.join(outputPath, name);
    FileUtils.ensureDirExists(componentDir, true).then((dirCreated) => {
        if (dirCreated) {
            // Create TypeScript file
            const tsFile = path.join(componentDir, `${name}.component.ts`);
            const tsTemplate = getComponentTemplate(name, template);
            FileUtils.createFile(tsFile, tsTemplate);

            // Create HTML file
            const htmlFile = path.join(componentDir, `${name}.component.html`);
            const htmlTemplate = getHtmlTemplate(name, template);
            FileUtils.createFile(htmlFile, htmlTemplate);

            // Create SCSS file
            const scssFile = path.join(componentDir, `${name}.component.scss`);
            FileUtils.createFile(scssFile, `/* ${name} component styles */`);

            console.log(`Component ${name} generated successfully at ${componentDir}!`);
        }
    });
}

function generateDataAccess(entity: string | undefined, outputPath: string, createService: boolean) {
    const dataAccessDir = path.join(outputPath, 'data-access');
    FileUtils.ensureDirExists(dataAccessDir, true).then((dirCreated) => {
        if (dirCreated && entity) {
            // Create model file
            const modelFile = path.join(dataAccessDir, `${entity}.model.ts`);
            const modelTemplate = getModelTemplate(entity);
            FileUtils.createFile(modelFile, modelTemplate);

            // Create service file
            if (createService) {
                const serviceFile = path.join(dataAccessDir, `${entity}.service.ts`);
                const serviceTemplate = getServiceTemplate(entity);
                FileUtils.createFile(serviceFile, serviceTemplate);
            }

            console.log(`Data access files for ${entity} generated successfully at ${dataAccessDir}!`);
        }
    });
}
