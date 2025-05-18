import { useState, useEffect } from 'react'
import './App.css'
import SearchBox from './component/SearchBox'
import CountryWeather from './component/CountryWeather'
import "tailwindcss"
import './index.css'

function App() {
  const [city, setCity] = useState('')
  const [countries, setCountries] = useState(() => {
    try {
      const saved = localStorage.getItem('weatherCountries')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })
  const [cityList, setCityList] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const API_KEY = "165a9dc1450828945a43097a7ee43d49"

  useEffect(() => { 

    fetch('/data/top_100_cities.json')
      .then(res => res.json())
      .then(data => setCityList(data))
  }, [])

  useEffect(() => {
    localStorage.setItem('weatherCountries', JSON.stringify(countries));
  }, [countries]);


  const addCityWeather = (cityData) => {
    const country = cityData.sys.country
    const city = cityData.name;

    setCountries(prev => {
      const currentCities = prev[country] || []
      const alreadyAdded = currentCities.some(c => c.name === city)

      if (alreadyAdded) return prev

      return {
        ...prev,
        [country]: [
          ...currentCities,
          {
            name: city,
            weather: {
              temp: Math.round(cityData.main.temp - 273.15),
              description: cityData.weather[0].description
            }
          }
        ]
      }
    })
  }

  const fetchWeather = async () => {
    if (!city) return
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    const data = await response.json()
    console.log(data)
    addCityWeather(data)
    setCity('')
    setSuggestions([])
  }

  return (
    <div className='App text-center p-4 space-y-6'>
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className='search-container flex flex-col items-center gap-4'>
        <SearchBox
          city={city}
          setCity={setCity}
          cityList={cityList}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        <button
          disabled={!city}
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Submit
        </button>
      </div>

      <CountryWeather countries={countries} />
    </div>
  )
}

export default App
