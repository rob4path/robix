"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGreetCommand = void 0;
const StringUtils_1 = require("../Utils/StringUtils");
function setupGreetCommand(program) {
    program
        .option('--name <name>', 'Greet the user by name')
        .action((options) => {
        if (options.name) {
            console.log(`Hello ${StringUtils_1.StringUtils.capitalize(options.name)}!`);
        }
    });
}
exports.setupGreetCommand = setupGreetCommand;
