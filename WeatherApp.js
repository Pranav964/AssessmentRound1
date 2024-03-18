import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';


const API_KEY = '50467312e0fbda97753ec7a98a5011a1'; 

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);


  const cities = ['HO CHI MINH', 'SINGAPORE', 'KUALA', 'TOKYO','Athens'];

  
  const handleCityChange = async (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }

    
    try {
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="dropdown">From</h1>
      <select value={selectedCity} onChange={handleCityChange}>
        <option  className="select" value="">Select a city</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {weatherData && (
        <div className="weather-info">
          <h2>Current Weather in {selectedCity}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          
        </div>
      )}

      {forecastData && (
        <div className="weather-forecast">
          <h2> Next three-Day Weather Forecast for {selectedCity}</h2>
          {forecastData.list.slice(0, 3).map((forecast, index) => (
            <div key={index}>
              <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
              <p>Temperature: {forecast.main.temp} °C</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

