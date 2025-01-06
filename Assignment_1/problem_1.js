let tasks = [];

// Add Task: Arrow function to add a new task object
const addTask = (title, status ,priority) => {
    if(priority < 1 || priority > 5){
        console.log("Priority must be between 1 and 5");
        return;
    }
    tasks.push({title,status,priority});
};

// Filter by Status: Return tasks with the specified status
const filterByStatus = (status) => {
    return tasks.filter(task => task.status === status);
};

// Find High Priority Task: Find the first task with priority 5
const findHighPriority = () => {
    return tasks.find(task => task.priority === 5);
};

// Map tasks to a list of formatted task titles and statuses
const formatedTaskList = () => {
    return tasks.map(task => `Task : ${task.title} , Status : ${task.status}`);
};

// Log all tasks with their details in a readable format
const logAllTask = () => {
    console.log("All Task : ");
    tasks.forEach(task => {
        console.log(`Task : ${task.title} , Status : ${task.status} , Priority : ${task.priority}`);
    });
};

// Example usage
addTask("Complete homework", "Completed", 3);
addTask("Focus on Study", "Pending", 5);
addTask("Buy groceries", "Pending", 5);
addTask("Go TO GYM", "Completed", 4);

// Filter tasks by status
console.log("Pending Tasks:", filterByStatus("Pending"));
console.log("Completed Tasks:", filterByStatus("Completed"));


// Find the first high-priority task
console.log("First High Priority Task:", findHighPriority());

// Get formatted task list
console.log("Formatted Task List:", formatedTaskList());

// Log all tasks
logAllTask();