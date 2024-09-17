#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generate_1 = require("./commands/generate");
const greet_1 = require("./commands/greet");
const generate_express_1 = require("./commands/generate-express");
const program = new commander_1.Command();
// Set up the 'g' and 'nx' commands from their respective files
(0, generate_1.setupGenerateCommand)(program);
(0, greet_1.setupGreetCommand)(program);
(0, generate_express_1.setupGenerateExpressCommand)(program);
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
