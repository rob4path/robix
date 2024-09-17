import * as fs from 'fs';
import { askQuestion } from './PromptUtils';

export class FileUtils {
    static createFile(filePath: string, content: string) {
        fs.writeFileSync(filePath, content);
    }

    static readTemplate(templatePath: string): string {
        return fs.readFileSync(templatePath, 'utf-8');
    }

    static replaceTemplateVariables(template: string, replacements: { [key: string]: string }) {
        return template.replace(/{{(\w+)}}/g, (_, key) => replacements[key] || '');
    }

    static async ensureDirExists(dirPath: string, askForOverwrite: boolean = false): Promise<boolean> {
        if (fs.existsSync(dirPath)) {
            if (askForOverwrite) {
                const answer = await askQuestion(`Directory ${dirPath} already exists. Do you want to overwrite it? (yes/no) `);
                if (answer.toLowerCase() === 'yes') {
                    fs.rmSync(dirPath, { recursive: true, force: true });
                    fs.mkdirSync(dirPath, { recursive: true });
                    return true;
                } else {
                    console.log(`Directory ${dirPath} was not overwritten.`);
                    return false;
                }
            } else {
                return false;
            }
        } else {
            fs.mkdirSync(dirPath, { recursive: true });
            return true;
        }
    }
}
