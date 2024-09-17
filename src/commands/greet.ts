import { Command } from 'commander';
import {StringUtils} from "../Utils/StringUtils";

export function setupGreetCommand(program: Command) {
    program
        .option('--name <name>', 'Greet the user by name')
        .action((options) => {
            if (options.name) {
                console.log(`Hello ${StringUtils.capitalize(options.name)}!`);
            }
        });
}

