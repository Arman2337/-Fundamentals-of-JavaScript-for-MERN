import React, { useState, useEffect } from 'react';

const API_KEY = 'c365713481bdab2b34b4be41f4631214';

function Weather() {
  const [city, setCity] = useState('London');
  const [query, setQuery] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(city);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Weather App 🌤️</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && !loading && (
        <div style={{ marginTop: '20px' }}>
          <h3>{weather.name}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
