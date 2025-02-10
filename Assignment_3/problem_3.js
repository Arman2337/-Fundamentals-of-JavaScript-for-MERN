const fs = require("fs");
const path = require("path");
const os = require("os");

function inspectEnvironment() {
    try {
        const envDetails = {
            homeDirectory: os.homedir(),
            hostname: os.hostname(),
            networkInterfaces: os.networkInterfaces(),
            environmentVariables: filterSensitiveEnv(process.env),
        };

        const logsDir = path.join(__dirname, "logs");
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        const filePath = path.join(logsDir, "env-details.json");
        fs.writeFile(filePath, JSON.stringify(envDetails, null, 4), (err) => {
            if (err) {
                console.error("Error writing environment details:", err.message);
            } else {
                console.log(`Environment details saved to ${filePath}`);
            }
        });
    } catch (error) {
        console.error("Error inspecting environment:", error.message);
    }
}

function filterSensitiveEnv(envVars) {
    const sensitiveKeys = ["PASSWORD", "SECRET", "TOKEN", "KEY", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"];
    return Object.keys(envVars).reduce((filtered, key) => {
        if (!sensitiveKeys.some(sensitive => key.includes(sensitive))) {
            filtered[key] = envVars[key];
        }
        return filtered;
    }, {});
}

inspectEnvironment();