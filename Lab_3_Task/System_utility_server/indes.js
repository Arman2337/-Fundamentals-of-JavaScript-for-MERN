var fs = require('fs').promises;
    
const inputFile = 'input.txt';  
const outputFile = 'output.txt';

async function sortNumbers(inputFile, outputFile) {
    try {
        // Read the input file asynchronously using fs.promises
        const data = await fs.readFile(inputFile, 'utf8');

        // Split the data by line breaks
        const numbers = data.split(' ');

        // Sort the numbers in ascending order
        numbers.sort((a, b) => a - b);

        // Write the sorted numbers to the output file
        await fs.writeFile(outputFile, numbers.join(' , '));

        console.log('Sorted numbers have been written to', outputFile);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function to sort numbers
sortNumbers(inputFile, outputFile);

const systemfile = 'systemRequire.txt';

var os = require('os');

async function getOsInfo() {
    return {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        arch: os.arch(),
        cpuCount: os.cpus().length,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        homedir: os.homedir(),
        uptime: os.uptime(),
        loadavg: os.loadavg(),
        networkInterfaces: os.networkInterfaces(),
        tmpdir: os.tmpdir()
    };
}

// Function to write the OS information to a file
async function writeOsInfoToFile(systemfile) {
    try {
        // Get OS information
        const osInfo = await getOsInfo();

        // Convert the information to a readable string format
        const osInfoString = `
Operating System Information:
-----------------------------
Platform: ${osInfo.platform}
Release: ${osInfo.release}
Type: ${osInfo.type}
Architecture: ${osInfo.arch}
CPU Count: ${osInfo.cpuCount}
Total Memory: ${osInfo.totalMemory} bytes
Free Memory: ${osInfo.freeMemory} bytes
Home Directory: ${osInfo.homedir}
Uptime: ${osInfo.uptime} seconds
Load Average: ${osInfo.loadavg.join(', ')}
Network Interfaces: ${JSON.stringify(osInfo.networkInterfaces, null, 2)}
Temporary Directory: ${osInfo.tmpdir}
`;

        // Write the information to a file asynchronously
        await fs.writeFile(systemfile, osInfoString);
        console.log('Operating System information saved to', systemfile);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

 writeOsInfoToFile(systemfile);
