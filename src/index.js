import inquirer from 'inquirer';
import fs from 'fs';
import asciiName from './utils/asciiArt.js';

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }
]

prompt(questions).then(async answers => {
    let name = answers.name;
    const asciiArt = await asciiName(name);
    console.log(asciiArt);

    // Create the data directory if it doesn't exist
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }

    const filePath = `./data/${name}tasks.json`;

    // Check if the user's tasks file exists; if not, create it
    if (!fs.existsSync(filePath)) {
        const userData = {
            user: {
                name: name,
                tasks: []
            }
        };

        fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
    }
});
