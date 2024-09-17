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
exports.setupGenerateExpressCommand = void 0;
const path = __importStar(require("path"));
const FileUtils_1 = require("../Utils/FileUtils");
const StringUtils_1 = require("../Utils/StringUtils");
const templates_1 = require("../templates/express/templates");
function setupGenerateExpressCommand(program) {
    program
        .command('generate-express <name>')
        .alias('g e') // Alias for 'generate-express'
        .alias('g-e') // Alias for 'generate-express'
        .option('-p, --path <path>', 'Specify the output directory', './')
        .option('--js', 'Generate JavaScript (.js) files instead of TypeScript (.ts)')
        .description('Generate files for an Express app: model, router, controller, and service')
        .action((name, cmdObj) => __awaiter(this, void 0, void 0, function* () {
        const outputPath = cmdObj.path || './';
        const folderPath = path.join(outputPath, name);
        const ext = cmdObj.js ? 'js' : 'ts'; // Switch between js and ts file extensions
        const dirCreated = yield FileUtils_1.FileUtils.ensureDirExists(folderPath, true);
        if (dirCreated) {
            const replacements = {
                Name: StringUtils_1.StringUtils.capitalize(name),
                name: name.toLowerCase()
            };
            // Define file paths
            const modelFile = path.join(folderPath, `${name}.model.${ext}`);
            const routerFile = path.join(folderPath, `${name}.router.${ext}`);
            const controllerFile = path.join(folderPath, `${name}.controller.${ext}`);
            const serviceFile = path.join(folderPath, `${name}.service.${ext}`);
            // Retrieve templates
            const modelTemplate = (0, templates_1.getModelTemplate)(replacements);
            const routerTemplate = (0, templates_1.getRouterTemplate)(replacements);
            const controllerTemplate = (0, templates_1.getControllerTemplate)(replacements);
            const serviceTemplate = (0, templates_1.getServiceTemplate)(replacements);
            // Create the files
            FileUtils_1.FileUtils.createFile(modelFile, modelTemplate);
            FileUtils_1.FileUtils.createFile(routerFile, routerTemplate);
            FileUtils_1.FileUtils.createFile(controllerFile, controllerTemplate);
            FileUtils_1.FileUtils.createFile(serviceFile, serviceTemplate);
            console.log(`Express files generated successfully for ${name} at ${folderPath}`);
            process.exit(0);
        }
    }));
}
exports.setupGenerateExpressCommand = setupGenerateExpressCommand;
