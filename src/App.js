import React, {useState} from "react";
import axios from "axios";
import config from './config';

function App() {

  const API_KEY = config.API_KEY;
  const [data, setData] = useState({});
  const [city, setCity] = useState('') ;
  const [countryCode, setCountryCode] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${API_KEY}`

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        console.log("Location:", city);
        console.log("CountryCode:", countryCode);
      })
      setCity('');
      setCountryCode('');
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="City"
          type="text"
        />
        <input
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Country code"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null }
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

    {data.name !== undefined &&
      <div className="bottom">
        <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
          <p>Feels like</p>
        </div>
        <div className="humidity">
        {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
        <p>humidity</p>
        </div>
        <div className="wind">
        {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
        <p>Wind Speed</p>
        </div>
      </div>
    }

      </div>
    </div>
  );
}

export default App;
