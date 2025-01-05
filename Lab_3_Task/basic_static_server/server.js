const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// Create the server
const server = http.createServer((req, res) => {
    // Define the file path based on the request URL
    let filePath = '.' + req.url;
    if (filePath == './') filePath = './index.html'; // Default to index.html

    // Determine the file extension and set content type accordingly
    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';
    if (extname == '.css') contentType = 'text/css';
    if (extname == '.jpg' || extname == '.jpeg') contentType = 'image/jpeg';

    // Check if the file exists
    fs.exists(filePath, (exists) => {
        if (exists) {
            // If file exists, serve it
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server error: ' + err.code);
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            });
        } else {
            // If file not found, return a 404 error
            res.writeHead(404);
            res.end('404 Not Found');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
