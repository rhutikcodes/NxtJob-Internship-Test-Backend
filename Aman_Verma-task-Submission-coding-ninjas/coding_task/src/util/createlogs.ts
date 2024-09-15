import * as fs from 'fs';
import * as path from 'path';

const logDir = path.join('logs');
const errorLogPath = path.join(logDir, 'error.log');
const appLogPath = path.join(logDir, 'app.log');
const filesPath = path.join("public", "files");

// Function to ensure a file exists
function ensureFileExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
        console.log(`File '${filePath}' does not exist. Creating it...`);
        fs.writeFileSync(filePath, ''); // Create an empty file
    }
}

// Function to ensure a directory exists
function ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory '${dirPath}' does not exist. Creating it...`);
        fs.mkdirSync(dirPath, { recursive: true });
    }
}


export function createLogDirectory():void{
    ensureDirectoryExists(logDir);
    ensureDirectoryExists(filesPath);
    ensureFileExists(errorLogPath);
    ensureFileExists(appLogPath);
}