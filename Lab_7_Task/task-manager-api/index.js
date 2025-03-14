require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.post('/tasks', async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


app.get('/tasks', async (req, res) => {
    try {
      const { status, dueDate } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (dueDate) filters.dueDate = { $lte: new Date(dueDate) };
  
      const tasks = await Task.find(filters);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


app.get('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


app.put('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


app.delete('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));