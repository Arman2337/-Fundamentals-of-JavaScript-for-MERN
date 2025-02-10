const http = require('http');
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');

function getUsers() {
    if (!fs.existsSync(usersFile)) return [];
    return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'GET' && req.url === '/users') {
        const users = getUsers();
        res.end(JSON.stringify(users));
    } else if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const users = getUsers();
            const newUser = JSON.parse(body);
            newUser.id = Date.now().toString();
            users.push(newUser);
            saveUsers(users);
            res.end(JSON.stringify({ message: 'User added', user: newUser }));
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
        const userId = req.url.split('/')[2];
        let users = getUsers();
        users = users.filter(user => user.id !== userId);
        saveUsers(users);
        res.end(JSON.stringify({ message: 'User deleted' }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});