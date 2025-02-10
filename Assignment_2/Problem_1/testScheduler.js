
const scheduler = require("./scheduler");

// Add appointments
scheduler.addAppointment("John Doe", new Date(Date.now() + 30 * 60 * 1000), "Consultation"); // 30 minutes from now
scheduler.addAppointment("Jane Smith", new Date(Date.now() + 90 * 60 * 1000), "Follow-up"); // 90 minutes from now
scheduler.addAppointment("Invalid Client", "invalid date", "Consultation"); // Invalid date

// Display upcoming appointments
scheduler.upcomingAppointments();

// Schedule reminders
scheduler.scheduleReminders();