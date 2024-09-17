import * as readline from 'readline';



export function askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close(); // Close readline interface after receiving input
            resolve(answer);
        });
    });
}
