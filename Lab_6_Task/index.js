const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

const TASKS_FILE = path.join(__dirname, "tasks.json");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read tasks from file
const readTasks = () => {
    try {
        const data = fs.readFileSync(TASKS_FILE, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Write tasks to file
const writeTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Validate task input
const validateTask = (req, res, next) => {
    const { title, status } = req.body;
    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required and must be a string." });
    }
    if (status && !["pending", "completed"].includes(status)) {
        return res.status(400).json({ error: "Status must be 'pending' or 'completed'." });
    }
    next();
};

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(readTasks());
});

// Get a specific task by ID
app.get("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: "Task not found." });
    }
    res.json(task);
});

// Create a new task
app.post("/tasks", validateTask, (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: req.body.title,
        status: req.body.status || "pending"
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", validateTask, (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    let tasks = readTasks();
    const filteredTasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    if (tasks.length === filteredTasks.length) {
        return res.status(404).json({ error: "Task not found." });
    }
    writeTasks(filteredTasks);
    res.json({ message: "Task deleted successfully." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
