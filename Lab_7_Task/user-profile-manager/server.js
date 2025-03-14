require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

app.post("/users", async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
