
// Array to store appointments
let appointments = [];

// Function to add a new appointment
function addAppointment(clientName, appointmentTime, serviceType) {
    try {
        // Validate clientName
        if (!clientName || typeof clientName !== "string") {
            throw new Error("Invalid client name. Please provide a non-empty string.");
        }

        // Validate appointmentTime as a valid Date object
        if (!(appointmentTime instanceof Date) || isNaN(appointmentTime)) {
            throw new Error("Invalid appointment time. Please provide a valid Date object.");
        }

        // Validate serviceType
        if (!serviceType || typeof serviceType !== "string") {
            throw new Error("Invalid service type. Please provide a non-empty string.");
        }

        // Add the appointment to the array
        appointments.push({ clientName, appointmentTime, serviceType });
        console.log(`Appointment added for ${clientName} at ${appointmentTime}.`);
    } catch (error) {
        console.error(`Error adding appointment: ${error.message}`);
    }
}

// Function to display upcoming appointments in the next hour
function upcomingAppointments() {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000); // Current time + 1 hour

    const upcoming = appointments.filter((appointment) => {
        return appointment.appointmentTime > now && appointment.appointmentTime <= oneHourFromNow;
    });

    if (upcoming.length > 0) {
        console.log("Upcoming appointments in the next hour:");
        upcoming.forEach((appointment) => {
            console.log(
                `- ${appointment.clientName} at ${appointment.appointmentTime} for ${appointment.serviceType}`
            );
        });
    } else {
        console.log("No upcoming appointments in the next hour.");
    }
}

// Function to send a reminder for an appointment
function sendReminder(appointment) {
    const currentTime = new Date();
    const timeUntilAppointment = appointment.appointmentTime - currentTime;

    if (timeUntilAppointment > 0) {
        setTimeout(() => {
            console.log(
                `Reminder: Your appointment for ${appointment.serviceType} with ${appointment.clientName} is scheduled at ${appointment.appointmentTime}.`
            );
        }, timeUntilAppointment);
    }
}

// Function to schedule reminders for all appointments
function scheduleReminders() {
    appointments.forEach((appointment) => {
        sendReminder(appointment);
    });
}

// Export the functions
module.exports = {
    addAppointment: addAppointment,
    upcomingAppointments: upcomingAppointments,
    scheduleReminders: scheduleReminders,
};