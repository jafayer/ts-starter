/**
 * Script to run when you first start a new app with this
 * quickstarter template.
 * 
 * This script will:
 * 1. Install all dependencies
 * 2. Create a fresh git history and sever the upstream connection
 * 3. Ask for the name and description of the app and update the package.json
 * 4. Remove this script from the project
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

const removeStartScript = () => {
    fs.unlinkSync(path.join(__dirname, 'start.js'));
}

const updatePackageJson = (name, description) => {
    packageJson.name = name;
    packageJson.description = description

    fs.writeFileSync
    (packageJsonPath, JSON.stringify(packageJson, null, 2));
}

const askForNameAndDescription = () => {
    rl.question('What is the name of the app? ', (name) => {
        rl.question('What is the description of the app? ', (description) => {
            updatePackageJson(name, description);
            rl.close();
        });
    });
}

const severUpstream = () => {
    execSync('rm -rf .git');
    execSync('git init', { stdio: 'ignore' });
    execSync('git add .');
    execSync('git commit -m "Initial commit"');
}

const installDependencies = () => {
    execSync('npm install');
}

const main = () => {
    installDependencies();
    askForNameAndDescription();
    removeStartScript();
    severUpstream();
}

main();