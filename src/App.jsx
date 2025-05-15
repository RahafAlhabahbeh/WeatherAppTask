import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null)
  const [cityList, setCityList] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const API_KEY = "165a9dc1450828945a43097a7ee43d49"


  useEffect(() => {
    fetch('/data/top_100_cities.json')
      .then(res => res.json())
      .then(data => setCityList(data))
  }, [])


  const fetchWeather = async () => {
    if (!city) return
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=165a9dc1450828945a43097a7ee43d49`)
    const data = await response.json()
    console.log(data)
    setWeather(data)
  }

  return (
    <>
      <div className='App'>
        <h1>Weather App</h1>
        <div className='search-container'>
          <div className='search-inner'>
            <input
              type="text"
              value={city}
              placeholder='Enter city'
              onChange={(e) => {
                const value = e.target.value
                setCity(value)
                
                if (!value.trim()) {
                  setSuggestions([])
                  return
                }

                const filtered = cityList.filter(c =>
                  c.toLowerCase().startsWith(value.toLowerCase())
                )
                setSuggestions(filtered)
              }}
            />
            <ul className="suggestions-list">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => {
                  setCity(s);
                  setSuggestions([]); // hide after selecting
                }}>
                  {s}
                </li>
              ))}
            </ul>

          </div>
          <button disabled={!city} onClick={fetchWeather}>Submit</button>
        </div>
        {/* to be sure that the there is infromation before print it*/}
        {weather && (
          <div>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )

        }

      </div>
    </>
  )
}

export default App
