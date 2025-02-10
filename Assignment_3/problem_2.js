const fs = require('fs');
const path = require('path');
const archiver = require('archiver'); // For optional zip compression

// /**
//  * Backs up files from a source folder to a backup folder.
//  * @param {string} sourcePath - The path of the source folder.
//  * @param {string} backupPath - The path of the backup folder.
//  * @param {boolean} compress - Whether to compress the backup folder into a .zip file.
//  */
// function backupFiles(sourcePath, backupPath, compress = false) {
//     try {
//         // Check if the source folder exists
//         if (!fs.existsSync(sourcePath)) {
//             throw new Error('Source folder does not exist.');
//         }

//         // Create the backup folder if it doesn't exist
//         if (!fs.existsSync(backupPath)) {
//             fs.mkdirSync(backupPath, { recursive: true });
//         }

//         // Log file for backup details
//         const logFilePath = path.join(backupPath, 'backup-log.txt');
//         const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

//         // Function to copy files recursively
//         function copyFiles(source, backup) {
//             const files = fs.readdirSync(source);

//             files.forEach((file) => {
//                 const sourceFile = path.join(source, file);
//                 const backupFile = path.join(backup, file);

//                 if (fs.lstatSync(sourceFile).isDirectory()) {
//                     // If it's a directory, create it in the backup folder and copy its contents
//                     if (!fs.existsSync(backupFile)) {
//                         fs.mkdirSync(backupFile);
//                     }
//                     copyFiles(sourceFile, backupFile);
//                 } else {
//                     // If it's a file, copy it to the backup folder
//                     fs.copyFileSync(sourceFile, backupFile);
//                     const stats = fs.statSync(sourceFile);

//                     // Log the backup details
//                     logStream.write(
//                         `File: ${file}\n` +
//                         `Size: ${stats.size} bytes\n` +
//                         `Timestamp: ${new Date().toISOString()}\n` +
//                         `-------------------------\n`
//                     );

//                     console.log(`Copied ${file} to ${backupFile}`);
//                 }
//             });
//         }

//         // Start the backup process
//         copyFiles(sourcePath, backupPath);
//         logStream.end();

//         console.log('Backup completed successfully!');

//         // Optional: Compress the backup folder
//         if (compress) {
//             const zipFilePath = path.join(backupPath, 'backup.zip');
//             const output = fs.createWriteStream(zipFilePath);
//             const archive = archiver('zip', { zlib: { level: 9 } });

//             output.on('close', () => {
//                 console.log(`Backup compressed to ${zipFilePath}`);
//             });

//             archive.on('error', (err) => {
//                 throw new Error(`Compression failed: ${err.message}`);
//             });

//             archive.pipe(output);
//             archive.directory(backupPath, false);
//             archive.finalize();
//         }
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//     }
// }

// const sourceDir = process.argv[2];
// const backupDir = process.argv[3];
// if (!sourceDir || !backupDir) {
//     console.log("Usage: node script.js <source_directory> <backup_directory>");
// } else {
//     backupFiles(sourceDir, backupDir);
//     compressBackup(backupDir, path.join(backupDir, "backup.zip"));
// }



function backupFiles(sourceDir, backupDir) {
    try {
        if (!fs.existsSync(sourceDir)) {
            console.error("Error: Source directory does not exist.");
            return;
        }

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const logStream = fs.createWriteStream(path.join(backupDir, "backup-log.txt"), { flags: "a" });
        copyFilesRecursive(sourceDir, backupDir, logStream);
        logStream.end();
        console.log("Backup completed successfully.");
    } catch (error) {
        console.error("Error backing up files:", error.message);
    }
}

function compressBackup(backupDir, zipFilePath) {
    try {
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver("zip", { zlib: { level: 9 } });
        
        output.on("close", () => console.log(`Backup compressed: ${zipFilePath} (${archive.pointer()} bytes)`));
        archive.on("error", (err) => { throw err; });
        
        archive.pipe(output);
        archive.directory(backupDir, false);
        archive.finalize();
    } catch (error) {
        console.error("Error compressing backup:", error.message);
    }
}

// Example usage: node script.js /path/to/source /path/to/backup
const sourceDir = process.argv[2];
const backupDir = process.argv[3];
if (!sourceDir || !backupDir) {
    console.log("Usage: node script.js <source_directory> <backup_directory>");
} else {
    backupFiles(sourceDir, backupDir);
    compressBackup(backupDir, path.join(backupDir, "backup.zip"));
}
