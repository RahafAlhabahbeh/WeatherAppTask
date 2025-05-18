// src/components/CountryWeather.jsx
import React from 'react';

const CountryWeather = ({ countries }) => {
  return (
    <div className="space-y-6">
      {Object.entries(countries).map(([country, cities]) => (
        <div
          key={country}
          className="border-2 border-blue-400 p-4 rounded-lg bg-blue-50 shadow-md"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-2">{country}</h2>
          <div className="flex flex-wrap gap-4">
            {cities.map((city, i) => (
              <div
                key={i}
                className="p-4 bg-white border rounded-md shadow w-40"
              >
                <h4 className="font-semibold">{city.name}</h4>
                <p>{city.weather.temp}°C</p>
                <p className="text-sm text-gray-600">
                  {city.weather.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryWeather;
