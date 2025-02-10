// testExpenseTracker.js
const { addExpense, getTotalExpenses, filterExpensesByDate, fetchExpenseReport } = require('./expenseTracker');

// Add sample expenses
addExpense("Lunch", 15.5, "2025-02-10");
addExpense("Groceries", 50, "2025-02-09");

// Get total expenses
console.log("Total Expenses:", getTotalExpenses());

// Filter expenses in a date range
console.log("Filtered Expenses:", filterExpensesByDate("2025-02-08", "2025-02-10"));

// Fetch expense report asynchronously
fetchExpenseReport()
    .then(report => console.log("Expense Report:", report))
    .catch(error => console.error("Error fetching report:", error));
