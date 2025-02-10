const fs = require('fs');
const path = require('path');

const categories = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
    Documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'],
    Videos: ['.mp4', '.mkv', '.avi', '.mov'],
    Others: []
};

function getCategory(ext) {
    for (const category in categories) {
        if (categories[category].includes(ext)) {
            return category;
        }
    }
    return 'Others';
}

function organizeFiles(directory) {
    if (!fs.existsSync(directory)) {
        console.log('Directory does not exist');
        return;
    }

    const files = fs.readdirSync(directory);
    let logData = '';
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        if (fs.lstatSync(filePath).isFile()) {
            const ext = path.extname(file).toLowerCase();
            const category = getCategory(ext);
            const categoryDir = path.join(directory, category);
            
            if (!fs.existsSync(categoryDir)) {
                fs.mkdirSync(categoryDir);
            }

            const newFilePath = path.join(categoryDir, file);
            fs.renameSync(filePath, newFilePath);
            logData += `Moved: ${file} -> ${category}\n`;
        }
    });
    
    fs.writeFileSync(path.join(directory, 'summary.txt'), logData);
    console.log('File organization complete. Summary written to summary.txt');
}
const directory = process.argv[2];
if (!directory) {
    console.log('Usage: node organizer.js <directory-path>');
} else {
    organizeFiles(directory);
}
