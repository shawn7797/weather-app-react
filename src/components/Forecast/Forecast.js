import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import {
    textInput,
    Radio,
    Button
} from './Forecast.module.css';
import SearchedCities from '../SearchedCities/SearchedCities';

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    const uriEncodedCity = encodeURIComponent(city);    

    function getForecast(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});
        
        setLoading(true);

        if (localStorage.length > 0 && Object.keys(localStorage).includes(uriEncodedCity)) {
            for(let i=0; i<localStorage.length; i++) {
                let keys = Object.keys(localStorage);
                let obj = localStorage[keys[i]];
                setResponseObj(JSON.parse(obj));
                setTimeout(() => {
                    setLoading(false);
                }, 500);
                break;
            }
        }
        else {
                fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&id=2172797&units=${unit}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                        "x-rapidapi-key": "41549e6021msh9f5eaa983576a99p13842cjsne477563429cb"
                    }
                })
                .then(response => response.json())
                .then(response => {
                    if (response.cod !== 200) {
                        throw new Error()
                    }
    
                    setResponseObj(response);
                    let convertedUnit = unit === "imperial" ? "Fahrenheit" : "Celsius";
                    localStorage.setItem(
                        `${response.name}`,
                        JSON.stringify({...response, unit: convertedUnit})
                        );
                    setLoading(false);
                })
                .catch(err => {
                    setError(true);
                    setLoading(false);
                    console.log(err.message);
                });
        }
    }

    return (
        <div>
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    name="city"
                    id="cityInput1"
                    placeholder="Enter City"
                    maxLength="50"
                    className={textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />

                <SearchedCities cities={localStorage}/>

                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celsius
                </label>

                <button className={Button} type="submit">Get Forecast</button>
            </form>
            <Conditions
               responseObj={responseObj}
               city={uriEncodedCity}
               error={error}
               loading={loading}
            />
        </div>
    )
}

export default Forecast;