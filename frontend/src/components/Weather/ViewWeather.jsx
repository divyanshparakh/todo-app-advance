import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewWeather.scss';
import { SearchResultsList } from "./SearchResultsList";

function ViewWeather() {
    const [results, setResults] = useState();
    const [currentWeather, setCurrentWeather] = useState();
	const selectedLocation = localStorage.getItem('coordinates');

	useEffect(() => {
        if(selectedLocation) {
            console.log(process.env.WEATHER_API_KEY);
            // console.log(selectedLocation);
            getCurrentWeather(selectedLocation);
        }
	}, [selectedLocation]);

    const weatherApi = axios.create({
        baseURL: 'https://weatherapi-com.p.rapidapi.com/',
        timeout: 1000,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/vnd.api+json",
            'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    });

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const searchLocation = async (inputLocation) => {
        // console.log(inputLocation.length);
        if(inputLocation.length > 0) {
            try {
                // console.log(inputLocation);
                const response = await weatherApi.get("/search.json", {
                    params: {
                        q: inputLocation,
                    }
                });
                if(response.status === 200) {
                    const results = response.data;
                    setResults(results);
                    // console.log(results);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Handle 401 Unauthorized error, e.g., redirect to login page
                    localStorage.removeItem('token');
                } else {
                    console.error("Error fetching Location:", error);
                }
            }
        }
    };
    
    const getCurrentWeather = async (selected) => {
        if(isJsonString(selected))
            selected = JSON.parse(selected);
        try {
            const response = await weatherApi.get("/current.json", {
                params: {
                    q: selected['lat'] + ',' + selected['lon'],
                }
            });

            if(response.status === 200) {
                const results = response.data;
                // console.log(results);
                const coordinates = { 'lat': selected.lat, 'lon': selected.lon };
                setCurrentWeather(results);
                setResults(null);
            } else {
                console.error("Error fetching weather: Unexpected status code", response.status);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error, e.g., redirect to login page
                console.log('API key has expired.');
            } else {
                console.error("Error fetching Location:", error);
            }
        }
    }

    const handleResultClick = async (result) => {
        localStorage.setItem('coordinates', JSON.stringify(result));
        await getCurrentWeather(result);
    };

    const handleSearchLocation = async (result) => {
        await searchLocation(result);
    };
    
    return (
        <div className="view-weather-wrapper">
            {
                currentWeather && Object.keys(currentWeather).length > 0 && (
                    <div className="selected-location-weather">
                        <p>
                            {currentWeather['location']['name']}
                        </p>
                        <p>
                            {currentWeather['current']['feelslike_c']}&deg;C
                        </p>
                        <p>
                            {currentWeather['current']['condition']['text']}
                        </p>
                        <img src={currentWeather['current']['condition']['icon']} alt="" srcset="" />
                        <p>
                            {currentWeather['current']['gust_kph']}
                        </p>
                        <p>
                            {currentWeather['current']['humidity']}
                        </p>
                        <p>
                            {currentWeather['current']['precip_mm']}
                        </p>
                        <p>
                            {currentWeather['current']['uv']}
                        </p>
                        <p>
                            {currentWeather['current']['wind_kph']}
                        </p>
                    </div>
                )
            }
            <br />
            <div className="search-location-wrapper">
                <input type="text" id="search-location"  placeholder="Search Location" pattern="[A-Za-z]" onChange={async (e) => handleSearchLocation(e.target.value)} />
            </div>
            { results && results.length > 0 && <SearchResultsList results={results} handleResultClick={handleResultClick} /> }
        </div>
    );
}

export default ViewWeather;