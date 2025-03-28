import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const API_KEY = "83f1e17831b944118ab125945252703";
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchCity = async () => {
      setLoadingData(true);
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
          Temperature: weatherofCity.current.temp_c,
          Humidity: weatherofCity.current.humidity,
          Condition: weatherofCity.current.condition.text,
          WindSpeed: weatherofCity.current.wind_kph,
        };

        setWeatherData(newObj);
      } catch (error) {
        console.error(error);
        setWeatherData(null);
        window.alert("Failed to fetch weather data");
      } finally {
        setLoadingData(false);
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
      {loadingData ? (
        <p>Loading data...</p>
      ) : (
        <>
          {weatherData && (
            <div className="weather-cards">
              <div className="weather-card">
                <div>
                  <b>Temperature:</b>
                  <br />
                  {weatherData.Temperature} °C{" "}
                </div>
              </div>
              <div className="weather-card">
                <div>
                <b>Humidity:</b> <br /> {weatherData.Humidity}%
                </div>
              </div>
              <div className="weather-card">
                <div><b>Condition:</b>
                <br /> {weatherData.Condition}
                </div>
              </div>
              <div className="weather-card">
                <div>
                <b>Wind Speed:</b>
                <br /> {weatherData.WindSpeed} kph
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
