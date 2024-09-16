"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGenerateCommand = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function setupGenerateCommand(program) {
    program
        .command('g <name>')
        .option('-p, --path <path>', 'Specify the output directory')
        .option('-e, --entity <entity>', 'Specify the entity name for data-access files')
        .option('-w, --wrapper <wrapper>', 'Specify an optional wrapper directory')
        .option('--service', 'Generate a service file')
        .option('--template <template>', 'Specify the component template (table, basic, dialog)', 'basic')
        .description('Generate a new component, service, or module')
        .action((name, cmdObj) => {
        const outputPath = cmdObj.path || './';
        const wrapper = cmdObj.wrapper || '';
        const entity = cmdObj.entity;
        const createService = cmdObj.service || false;
        const template = cmdObj.template || 'basic';
        const componentName = kebabToCamel(name);
        const entityName = entity ? kebabToCamel(entity) : undefined;
        let fullPath = path.join(process.cwd(), outputPath);
        if (wrapper) {
            fullPath = path.join(fullPath, wrapper);
        }
        // Generate component
        generateComponent(componentName, fullPath, template);
        // Generate data-access files if entity or service is provided
        if (entityName || createService) {
            generateDataAccess(entityName, fullPath, createService);
        }
    });
}
exports.setupGenerateCommand = setupGenerateCommand;
function generateComponent(name, outputPath, template) {
    const componentDir = path.join(outputPath, name);
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
        // Create TypeScript file
        const tsFile = path.join(componentDir, `${name}.component.ts`);
        const tsTemplate = getComponentTemplate(name, template);
        fs.writeFileSync(tsFile, tsTemplate);
        // Create HTML file
        const htmlFile = path.join(componentDir, `${name}.component.html`);
        const htmlTemplate = getHtmlTemplate(name, template);
        fs.writeFileSync(htmlFile, htmlTemplate);
        // Create SCSS file
        const scssFile = path.join(componentDir, `${name}.component.scss`);
        fs.writeFileSync(scssFile, `/* ${name} component styles */`);
        console.log(`Component ${name} generated successfully at ${componentDir}!`);
    }
    else {
        console.log(`Directory ${name} already exists at ${componentDir}.`);
    }
}
function generateDataAccess(entity, outputPath, createService) {
    const dataAccessDir = path.join(outputPath, 'data-access');
    if (!fs.existsSync(dataAccessDir)) {
        fs.mkdirSync(dataAccessDir, { recursive: true });
        if (entity) {
            // Create model file
            const modelFile = path.join(dataAccessDir, `${entity}.model.ts`);
            const modelTemplate = `
        export interface ${capitalize(entity)}Model {
          id: number;
          // Define other properties here
        }
      `;
            fs.writeFileSync(modelFile, modelTemplate);
            // Create service file
            const serviceFile = path.join(dataAccessDir, `${entity}.service.ts`);
            const serviceTemplate = `
        import { Injectable } from '@angular/core';
        import { ${capitalize(entity)}Model } from './${entity}.model';

        @Injectable({
          providedIn: 'root'
        })
        export class ${capitalize(entity)}Service {
          // Define service methods here
        }
      `;
            fs.writeFileSync(serviceFile, serviceTemplate);
            console.log(`Data access files for ${entity} generated successfully at ${dataAccessDir}!`);
        }
        if (createService) {
            // Generate a service file if not already generated
            const serviceDir = path.join(outputPath, 'services');
            if (!fs.existsSync(serviceDir)) {
                fs.mkdirSync(serviceDir, { recursive: true });
                const serviceFile = path.join(serviceDir, `${entity}.service.ts`);
                const serviceTemplate = `
          import { Injectable } from '@angular/core';

          @Injectable({
            providedIn: 'root'
          })
          export class ${capitalize(entity)}Service {
            // Define service methods here
          }
        `;
                fs.writeFileSync(serviceFile, serviceTemplate);
                console.log(`Service ${entity} generated successfully at ${serviceDir}!`);
            }
        }
    }
    else {
        console.log(`Data access directory already exists at ${dataAccessDir}.`);
    }
}
// Helper function to get the component template based on the selected template type
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
        export class ${capitalize(name)}Component {
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
        export class ${capitalize(name)}Component {
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
        export class ${capitalize(name)}Component {
          constructor() {}
        }
      `;
    }
}
// Helper function to get the HTML template based on the selected template type
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
// Helper function to capitalize names
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// Helper function to convert kebab-case to CamelCase
function kebabToCamel(str) {
    return str
        .toLowerCase()
        .replace(/-./g, (match) => match.charAt(1).toUpperCase());
}
