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
              className="px-4 py-2 w-72 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            <ul className="list-none my-1 bg-white max-h-40 overflow-auto shadow-md border border-gray-200 rounded-md mt-2">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => {
                  setCity(s);
                  setSuggestions([]); // hide after selecting
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  {s}
                </li>
              ))}
            </ul>
    </div>

  )
}

export default SearchBox