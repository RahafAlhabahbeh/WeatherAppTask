import React from 'react'
import '../index.css';

const SearchBox = ({city, setCity, cityList, setSuggestions, suggestions}) => {
  const handleChange = (e) => {
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
  }

  return (
    <div className='search-inner'>
            <input
              type="text"
              value={city}
              placeholder='Enter city'
              onChange={handleChange}
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

  )
}

export default SearchBox