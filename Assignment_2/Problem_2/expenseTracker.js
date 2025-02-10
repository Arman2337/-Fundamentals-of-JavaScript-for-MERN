// expenseTracker.js
const expenses = [];

// Function to add an expense
function addExpense(description, amount, date) {
    try {
        if (!description || typeof description !== 'string') {
            throw new Error("Invalid description.");
        }
        
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Amount must be a positive number.");
        }
        
        const expenseDate = new Date(date);
        if (isNaN(expenseDate.getTime())) {
            throw new Error("Invalid date.");
        }
        
        expenses.push({ description, amount, date: expenseDate });
        console.log("Expense added successfully.");
    } catch (error) {
        console.error("Error adding expense:", error.message);
    }
}

// Function to calculate total expenses
function getTotalExpenses() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Function to filter expenses by date range
function filterExpensesByDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error("Invalid date range.");
        return [];
    }
    return expenses.filter(expense => expense.date >= start && expense.date <= end);
}

// Function to simulate fetching an expense report asynchronously
function fetchExpenseReport() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (expenses.length === 0) {
                reject("No expenses found.");
            } else {
                resolve({ total: getTotalExpenses(), count: expenses.length, expenses });
            }
        }, 2000);
    });
}

module.exports = { addExpense, getTotalExpenses, filterExpensesByDate, fetchExpenseReport };
