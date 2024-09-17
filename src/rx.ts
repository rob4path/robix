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

// Parse the command-line arguments
program.parse(process.argv);
