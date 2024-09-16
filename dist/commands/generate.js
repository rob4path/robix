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
        .command('g <type> <name>')
        .option('-p, --path <path>', 'Specify the output directory')
        .option('-e, --entity <entity>', 'Specify the entity name for data-access files')
        .option('-w, --wrapper <wrapper>', 'Specify an optional wrapper directory')
        .option('--no-data-access', 'Skip generating data-access files')
        .option('--template <template>', 'Specify the component template (table, dialog, simple)', 'simple')
        .description('Generate a new component, service, or module')
        .action((type, name, cmdObj) => {
        const outputPath = cmdObj.path || './';
        const wrapper = cmdObj.wrapper || '';
        const entity = cmdObj.entity || name; // Use name as default if no entity is provided
        const includeDataAccess = cmdObj.dataAccess !== false; // Default to true unless explicitly set to false
        const template = cmdObj.template || 'simple';
        const componentName = kebabToCamel(name);
        const entityName = kebabToCamel(entity);
        let fullPath = path.join(process.cwd(), outputPath);
        if (wrapper) {
            fullPath = path.join(fullPath, wrapper);
        }
        switch (type) {
            case 'c':
                generateComponent(componentName, fullPath, template);
                if (includeDataAccess) {
                    generateDataAccess(entityName, fullPath);
                }
                break;
            default:
                console.log(`Unsupported type: ${type}`);
                break;
        }
    });
}
exports.setupGenerateCommand = setupGenerateCommand;
function generateComponent(name, outputPath, template) {
    const componentDir = path.join(outputPath, name);
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
        // Create component files based on the selected template
        const tsFile = path.join(componentDir, `${name}.component.ts`);
        const htmlFile = path.join(componentDir, `${name}.component.html`);
        const scssFile = path.join(componentDir, `${name}.component.scss`);
        let tsTemplate;
        let htmlTemplate;
        switch (template) {
            case 'table':
                tsTemplate = `
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
                htmlTemplate = `<table><tr><td>${name} Table Component</td></tr></table>`;
                break;
            case 'dialog':
                tsTemplate = `
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
                htmlTemplate = `<div class="dialog">${name} Dialog Component</div>`;
                break;
            case 'simple':
            default:
                tsTemplate = `
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
                htmlTemplate = `<p>${name} works!</p>`;
                break;
        }
        fs.writeFileSync(tsFile, tsTemplate);
        fs.writeFileSync(htmlFile, htmlTemplate);
        fs.writeFileSync(scssFile, `/* ${name} component styles */`);
        console.log(`Component ${name} generated successfully at ${componentDir}!`);
    }
    else {
        console.log(`Directory ${name} already exists at ${componentDir}.`);
    }
}
function generateDataAccess(entity, outputPath) {
    const dataAccessDir = path.join(outputPath, 'data-access');
    if (!fs.existsSync(dataAccessDir)) {
        fs.mkdirSync(dataAccessDir, { recursive: true });
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
    else {
        console.log(`Data access directory already exists at ${dataAccessDir}.`);
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
