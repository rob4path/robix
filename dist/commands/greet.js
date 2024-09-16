"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGreetCommand = void 0;
function setupGreetCommand(program) {
    program
        .option('--name <name>', 'Greet the user by name')
        .action((options) => {
        if (options.name) {
            console.log(`Hello ${capitalize(options.name)}!`);
        }
    });
}
exports.setupGreetCommand = setupGreetCommand;
// Helper function to capitalize names
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
