Problem 1: Online Appointment Scheduler
Description
A dynamic scheduler to manage online appointments asynchronously. It includes functions to add appointments, display upcoming appointments, and send reminders.

Files
src/appointmentScheduler/scheduler.js: Contains the implementation of the scheduler functions.

src/appointmentScheduler/testScheduler.js: Contains test cases for the scheduler functions.

Functions
addAppointment(clientName, appointmentTime, serviceType):

Adds a new appointment to the array.

Validates appointmentTime as a valid Date object and clientName as a non-empty string.

upcomingAppointments():

Displays appointments scheduled for the next hour.

sendReminder(appointment):

Uses setTimeout() to log a reminder message when the appointment time approaches.

Example Usage
```javascipt
import { addAppointment, upcomingAppointments, sendReminder } from './src/appointmentScheduler/scheduler.js';

try {
    addAppointment('John Doe', new Date(), 'Consultation');
    console.log(upcomingAppointments());
} catch (error) {
    console.error(error.message);
}
```
Problem 2: Expense Tracker
Description
A utility to track and analyze expenses using asynchronous programming and error handling. It includes functions to add expenses, calculate total expenses, filter expenses by date range, and fetch an expense report asynchronously.

Files
src/expenseTracker/tracker.js: Contains the implementation of the expense tracker functions.

src/expenseTracker/testTracker.js: Contains test cases for the expense tracker functions.

Functions
addExpense(description, amount, date):

Adds a new expense to the array.

Validates amount as a positive number and date as a valid Date object.

totalExpenses():

Calculates the total amount spent using reduce().

filterByDateRange(startDate, endDate):

Filters expenses within a specific date range.

fetchExpenseReport():

Simulates fetching an expense report asynchronously using a Promise.

Example Usage

```javascipt
import { addExpense, totalExpenses, filterByDateRange, fetchExpenseReport } from './src/expenseTracker/tracker.js';

try {
    addExpense('Groceries', 50, new Date());
    console.log(totalExpenses());
    console.log(filterByDateRange(new Date('2023-10-01'), new Date('2023-10-31')));
    fetchExpenseReport().then(console.log).catch(console.error);
} catch (error) {
    console.error(error.message);
}
```
Problem 3: Study Planner
Description
A study planner to manage and track study sessions for students. It includes functions to add study sessions, list today’s sessions, display a countdown for sessions, and fetch study materials asynchronously.

Files
src/studyPlanner/planner.js: Contains the implementation of the study planner functions.

src/studyPlanner/testPlanner.js: Contains test cases for the study planner functions.

Functions
addSession(topic, sessionTime, duration):

Adds a new study session to the array.

Validates duration as a positive number and sessionTime as a valid Date object.

listTodaySessions():

Displays all sessions scheduled for the current day.

sessionCountdown(session):

Uses setTimeout() to log a countdown message when the session starts.

fetchStudyMaterials(topic):

Simulates fetching study materials asynchronously for a given topic using a Promise.

Example Usage
```javascipt
import { addSession, listTodaySessions, sessionCountdown, fetchStudyMaterials } from './src/studyPlanner/planner.js';

try {
    addSession('JavaScript', new Date(), 60);
    console.log(listTodaySessions());
    fetchStudyMaterials('JavaScript').then(console.log).catch(console.error);
} catch (error) {
    console.error(error.message);
}
```

Notes
Ensure Node.js is installed on your system.

All functions include input validation using try...catch.
