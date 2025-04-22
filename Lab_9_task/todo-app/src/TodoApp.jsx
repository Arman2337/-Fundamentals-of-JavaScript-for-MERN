import { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>To-Do List</h1>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
          style={{ flexGrow: 1, padding: "8px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px", background: "#007BFF", color: "#fff" }}>
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ color: "#888", marginTop: "20px" }}>No tasks available</p>
      ) : (
        <ul style={{ listStyle: "disc", paddingLeft: "20px", marginTop: "20px" }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
              <span>{task.text}</span>
              <button
                onClick={() => removeTask(task.id)}
                style={{ color: "#dc3545", border: "none", background: "none", cursor: "pointer" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoApp;
