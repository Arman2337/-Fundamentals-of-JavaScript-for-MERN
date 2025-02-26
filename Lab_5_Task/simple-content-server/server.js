const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;


app.use((req, res, next) => {
  const logEntry = {
    ip: req.ip,
    time: new Date().toISOString(),
    url: req.originalUrl
  };

  
  fs.appendFile('visits.log', JSON.stringify(logEntry) + '\n', (err) => {
    if (err) {
      console.error('Error logging visit:', err);
    }
  });

  next();
});


app.use(express.static(path.join(__dirname, 'public')));


app.get('/logs', (req, res) => {
  fs.readFile('visits.log', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading logs' });
    }
    const logs = data.split('\n').filter(Boolean).map(log => JSON.parse(log));
    res.json(logs);
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
