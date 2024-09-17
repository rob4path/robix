#!/usr/bin/env node

import { Command } from 'commander';
import { setupGenerateCommand } from './commands/generate';
import { setupGreetCommand } from './commands/greet';
import {setupGenerateExpressCommand} from "./commands/generate-express";

const program = new Command();

// Set up the 'g' and 'nx' commands from their respective files
setupGenerateCommand(program);
setupGreetCommand(program);
setupGenerateExpressCommand(program);

// // Add a custom help command
// program
//     .command('help')
//     .description('Display help information for all available commands')
//     .action(() => {
//         console.log(`
// Available commands:
//
//   generate-express <name>     Generate files for an Express app: model, router, controller, and service
//   g e <name>                 Alias for generate-express command
//   g-e <name>                 Alias for generate-express command
//   greet --name <name>        Greet the specified name
//   version (-v, --version)    Display the version number
//   help                       Display this help information
//   rx <command> --help       Display help information for a specific command
//
//     `);
//     });


// Parse the command-line arguments
program.parse(process.argv);
