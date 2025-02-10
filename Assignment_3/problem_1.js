const fs = require("fs");
const path = require("path");

// Define file categories
const categories = {
    Images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
    Documents: [".pdf", ".doc", ".docx", ".txt", ".xls", ".xlsx", ".ppt", ".pptx"],
    Videos: [".mp4", ".mkv", ".avi", ".mov", ".wmv"],
    Audio: [".mp3", ".wav", ".aac", ".flac"],
    Archives: [".zip", ".rar", ".7z", ".tar", ".gz"],
    Code: [".js", ".html", ".css", ".py", ".java", ".cpp", ".c", ".rb", ".php"],
};

function organizeDirectory(directoryPath) {
    try {
        if (!fs.existsSync(directoryPath)) {
            console.error("Error: Directory does not exist.");
            return;
        }
        
        const files = fs.readdirSync(directoryPath);
        
        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            
            if (fs.statSync(filePath).isFile()) {
                const ext = path.extname(file).toLowerCase();
                let folderName = "Others";
                
                for (const category in categories) {
                    if (categories[category].includes(ext)) {
                        folderName = category;
                        break;
                    }
                }
                
                const folderPath = path.join(directoryPath, folderName);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }
                
                const newFilePath = path.join(folderPath, file);
                fs.renameSync(filePath, newFilePath);
                console.log(`Moved: ${file} -> ${folderName}`);
            }
        });
        console.log("Directory organized successfully.");
    } catch (error) {
        console.error("Error organizing directory:", error.message);
    }
}

// Example usage: node script.js /path/to/directory
const directoryPath = process.argv[2];
if (!directoryPath) {
    console.log("Usage: node script.js <directory_path>");
} else {
    organizeDirectory(directoryPath);
}
