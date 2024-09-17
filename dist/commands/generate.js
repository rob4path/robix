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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGenerateCommand = void 0;
const path = __importStar(require("path"));
const FileUtils_1 = require("../Utils/FileUtils");
const StringUtils_1 = require("../Utils/StringUtils");
const componentTemplates_1 = require("../templates/angular/componentTemplates");
const htmlTemplates_1 = require("../templates/angular/htmlTemplates");
const dataAccessTemplates_1 = require("../templates/angular/dataAccessTemplates");
function setupGenerateCommand(program) {
    program
        .command('g <name>')
        .option('-p, --path <path>', 'Specify the output directory')
        .option('-e, --entity <entity>', 'Specify the entity name for data-access files')
        .option('-w, --wrapper <wrapper>', 'Specify an optional wrapper directory')
        .option('--service', 'Generate a service file')
        .option('--template <template>', 'Specify the component template (table, basic, dialog)', 'basic')
        .description('Generate a new component, service, or module')
        .action((name, cmdObj) => __awaiter(this, void 0, void 0, function* () {
        const outputPath = cmdObj.path || './';
        const wrapper = cmdObj.wrapper || '';
        const entity = cmdObj.entity;
        const createService = cmdObj.service || false;
        const template = cmdObj.template || 'basic';
        const componentName = StringUtils_1.StringUtils.kebabToCamel(name);
        const entityName = entity ? StringUtils_1.StringUtils.kebabToCamel(entity) : undefined;
        let fullPath = path.join(process.cwd(), outputPath);
        if (wrapper) {
            fullPath = path.join(fullPath, wrapper);
        }
        const dirCreated = yield FileUtils_1.FileUtils.ensureDirExists(fullPath, true);
        if (dirCreated) {
            // Generate component
            generateComponent(componentName, fullPath, template);
            // Generate data-access files if entity or service is provided
            if (entityName || createService) {
                generateDataAccess(entityName, fullPath, createService);
            }
        }
        process.exit(0);
    }));
}
exports.setupGenerateCommand = setupGenerateCommand;
function generateComponent(name, outputPath, template) {
    const componentDir = path.join(outputPath, name);
    FileUtils_1.FileUtils.ensureDirExists(componentDir, true).then((dirCreated) => {
        if (dirCreated) {
            // Create TypeScript file
            const tsFile = path.join(componentDir, `${name}.component.ts`);
            const tsTemplate = (0, componentTemplates_1.getComponentTemplate)(name, template);
            FileUtils_1.FileUtils.createFile(tsFile, tsTemplate);
            // Create HTML file
            const htmlFile = path.join(componentDir, `${name}.component.html`);
            const htmlTemplate = (0, htmlTemplates_1.getHtmlTemplate)(name, template);
            FileUtils_1.FileUtils.createFile(htmlFile, htmlTemplate);
            // Create SCSS file
            const scssFile = path.join(componentDir, `${name}.component.scss`);
            FileUtils_1.FileUtils.createFile(scssFile, `/* ${name} component styles */`);
            console.log(`Component ${name} generated successfully at ${componentDir}!`);
        }
    });
}
function generateDataAccess(entity, outputPath, createService) {
    const dataAccessDir = path.join(outputPath, 'data-access');
    FileUtils_1.FileUtils.ensureDirExists(dataAccessDir, true).then((dirCreated) => {
        if (dirCreated && entity) {
            // Create model file
            const modelFile = path.join(dataAccessDir, `${entity}.model.ts`);
            const modelTemplate = (0, dataAccessTemplates_1.getModelTemplate)(entity);
            FileUtils_1.FileUtils.createFile(modelFile, modelTemplate);
            // Create service file
            if (createService) {
                const serviceFile = path.join(dataAccessDir, `${entity}.service.ts`);
                const serviceTemplate = (0, dataAccessTemplates_1.getServiceTemplate)(entity);
                FileUtils_1.FileUtils.createFile(serviceFile, serviceTemplate);
            }
            console.log(`Data access files for ${entity} generated successfully at ${dataAccessDir}!`);
        }
    });
}
