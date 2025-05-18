const CityCard = ({ name, weather }) => {
    return (
      <div className="city-card">
        <h4>{name}</h4>
        <p>{weather.temp}°C</p>
        <p>{weather.description}</p>
      </div>
    );
  };
  