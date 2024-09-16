#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generate_1 = require("./commands/generate");
const greet_1 = require("./commands/greet");
const program = new commander_1.Command();
// Set up the 'g' and 'nx' commands from their respective files
(0, generate_1.setupGenerateCommand)(program);
(0, greet_1.setupGreetCommand)(program);
// Parse the command-line arguments
program.parse(process.argv);
