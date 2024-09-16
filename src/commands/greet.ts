import { Command } from 'commander';

export function setupGreetCommand(program: Command) {
    program
        .option('--name <name>', 'Greet the user by name')
        .action((options) => {
            if (options.name) {
                console.log(`Hello ${capitalize(options.name)}!`);
            }
        });
}

// Helper function to capitalize names
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
