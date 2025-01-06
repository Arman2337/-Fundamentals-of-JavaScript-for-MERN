let weatherData = [];

// Add City Weather: Function to add a new city weather object
const addCityWeather = (cityName, temperature , condition) => {
    weatherData.push({cityName, temperature , condition});
};

// Find Hottest City: Use find() to identify the city with the highest temperature
const findHottestCity = () => {
    const hottestCity = weatherData.reduce((hottest , city) =>
        city.temperature > hottest.temperature ? city : hottest,
        weatherData[0]
    );
    return hottestCity;
};
// Filter by Condition: List all cities with a specific weather condition
const filterByCondition = (condition) => {
    return weatherData.filter(city => city.condition === condition);
};

// Map to list city names with temperatures
const formatCityTemperatures = () => {
    return weatherData.map(city => `City : ${city.cityName} , Temp : ${city.temperature}°C`);
};

// Log details of the hottest city using destructuring
const logHottestCityDetails = () => {
    const { cityName, temperature, condition } = findHottestCity();
    console.log(`Hottest City: ${cityName}, Temp: ${temperature}°C, Condition: ${condition}`);
};


// Log weather summary for all cities using template literals
const logWeatherSummary = () => {
    console.log("Weather Summary:");
    weatherData.forEach(city => {
        console.log(`City: ${city.cityName}, Temp: ${city.temperature}°C, Condition: ${city.condition}`);
    });
};


// Test Cases
addCityWeather("Dubai", 30, "Sunny");
addCityWeather("Nadiad", 22, "Cloudy");
addCityWeather("Mumbai", 35, "Sunny");
addCityWeather("Kapadvanj", 20, "Cloudy");


// Find the hottest city and log details
logHottestCityDetails();

// Filter cities by weather condition
console.log("Sunny Cities:", filterByCondition("Sunny"));
console.log("Rainy Cities:", filterByCondition("Rainy"));

// Get formatted list of city temperatures
console.log("Formatted City Temperatures:", formatCityTemperatures());

// Log weather summary for all cities
logWeatherSummary();