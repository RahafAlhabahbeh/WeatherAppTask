import React from 'react'
import '../index.css';

const WeatherCard = ({weather}) => {
    if (!weather) return null
    return (
       <div>
            <h2 className=''>{weather.name}, {weather.sys.country}</h2>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
        </div> 
    )
}

export default WeatherCard