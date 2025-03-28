import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const API_KEY = '83f1e17831b944118ab125945252703';
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const handleSubmit = (e) => {
  
    e.preventDefault();

    const fetchCity = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json`,
          {
            params: {
              key: API_KEY,
              q: city,
            },
          }
        );

        const weatherofCity = response.data;
        
        const newObj = {
          Temperature:weatherofCity.current.temp_c ,
          Humidity: weatherofCity.current.humidity,
          Condition: weatherofCity.current.condition.text ,
          WindSpeed:weatherofCity.current.wind_kph ,
        };
       
       
        setWeatherData(newObj);
       
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchCity();
  };

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <button type="submit">Search</button>
      </form>
      {weatherData &&
      <div className="weather-cards">
        <div className="weather-card">Temperature: {weatherData.Temperature}</div>
        <div className="weather-card">Humidity: {weatherData.Humidity}</div>
        <div className="weather-card">Condition: {weatherData.Condition}</div>
        <div className="weather-card">Wind Speed: {weatherData.WindSpeed}</div>
      </div>}
    </div>
  );
}

export default App;
