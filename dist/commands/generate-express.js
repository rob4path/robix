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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline = __importStar(require("readline"));
// Helper function to ask for user confirmation
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, (ans) => {
        rl.close();
        resolve(ans);
    }));
}
// Helper function to create the files
function createFile(filePath, content) {
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
    console.log(`File created: ${filePath}`);
}
function setupGenerateExpressCommand(program) {
    program
        .command('generate-express <name>')
        .option('-p, --path <path>', 'Specify the output directory', './')
        .description('Generate files for an Express app: model, router, controller, and service')
        .action((name, cmdObj) => __awaiter(this, void 0, void 0, function* () {
        const outputPath = cmdObj.path || './';
        const folderPath = path.join(outputPath, name);
        // Check if directory already exists
        if (fs.existsSync(folderPath)) {
            const answer = yield askQuestion(`Directory ${folderPath} already exists. Do you want to overwrite it? (yes/no): `);
            if (answer.toLowerCase() !== 'yes') {
                console.log('Operation canceled.');
                return;
            }
        }
        else {
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
    }));
}
exports.setupGenerateExpressCommand = setupGenerateExpressCommand;
// Helper function to capitalize the first letter of the name
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
