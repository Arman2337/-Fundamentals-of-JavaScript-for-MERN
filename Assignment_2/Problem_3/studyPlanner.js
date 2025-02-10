// studyPlanner.js

// Array to store study sessions
let studySessions = [];

// Function to add a new study session
function addSession(topic, sessionTime, duration) {
    try {
        // Validate topic
        if (!topic || typeof topic !== "string") {
            throw new Error("Invalid topic. Please provide a non-empty string.");
        }

        // Validate sessionTime (must be a valid Date object)
        if (!(sessionTime instanceof Date) || isNaN(sessionTime)) {
            throw new Error("Invalid session time. Please provide a valid Date object.");
        }

        // Validate duration (must be a positive number)
        if (typeof duration !== "number" || duration <= 0) {
            throw new Error("Invalid duration. Please provide a positive number.");
        }

        // Add the session to the array
        studySessions.push({ topic, sessionTime, duration });
        console.log(`Study session added: ${topic} at ${sessionTime} for ${duration} minutes.`);
    } catch (error) {
        console.error(`Error adding study session: ${error.message}`);
    }
}

// Function to list today's study sessions
function listTodaySessions() {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const todaysSessions = studySessions.filter((session) => {
        return session.sessionTime >= todayStart && session.sessionTime < todayEnd;
    });

    if (todaysSessions.length > 0) {
        console.log("Today's study sessions:");
        todaysSessions.forEach((session) => {
            console.log(
                `- ${session.topic} at ${session.sessionTime} for ${session.duration} minutes`
            );
        });
    } else {
        console.log("No study sessions scheduled for today.");
    }
}

// Function to log a countdown message when a session starts
function sessionCountdown(session) {
    const currentTime = new Date();
    const timeUntilSession = session.sessionTime - currentTime;

    if (timeUntilSession > 0) {
        setTimeout(() => {
            console.log(`Session on ${session.topic} starts now!`);
        }, timeUntilSession);
    }
}

// Function to schedule countdowns for all sessions
function scheduleCountdowns() {
    studySessions.forEach((session) => {
        sessionCountdown(session);
    });
}

// Function to simulate fetching study materials asynchronously
async function fetchStudyMaterials(topic) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const materials = {
                topic: topic,
                materials: [
                    "PDF Notes",
                    "Video Lectures",
                    "Practice Questions",
                ],
            };

            if (topic) {
                resolve(materials);
            } else {
                reject("Topic not provided. Unable to fetch study materials.");
            }
        }, 1500); // Simulate a 1.5-second delay
    });
}

// Export the functions
module.exports = {
    addSession: addSession,
    listTodaySessions: listTodaySessions,
    scheduleCountdowns: scheduleCountdowns,
    fetchStudyMaterials: fetchStudyMaterials,
};