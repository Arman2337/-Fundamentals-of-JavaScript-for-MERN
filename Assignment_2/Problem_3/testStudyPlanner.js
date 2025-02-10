// testStudyPlanner.js

const studyPlanner = require("./studyPlanner");

// Add study sessions
studyPlanner.addSession("Mathematics", new Date(Date.now() + 30 * 60 * 1000), 60); // 30 minutes from now
studyPlanner.addSession("Physics", new Date(Date.now() + 90 * 60 * 1000), 45); // 90 minutes from now
studyPlanner.addSession("Invalid Session", "invalid date", -10); // Invalid input

// List today's sessions
studyPlanner.listTodaySessions();

// Schedule countdowns for sessions
studyPlanner.scheduleCountdowns();

// Fetch study materials asynchronously
(async () => {
    try {
        const materials = await studyPlanner.fetchStudyMaterials("Mathematics");
        console.log("Study Materials:", materials);
    } catch (error) {
        console.error("Error fetching study materials:", error);
    }
})();