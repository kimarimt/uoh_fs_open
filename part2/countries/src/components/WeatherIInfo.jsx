import { useEffect } from 'react'
import { useState } from 'react'
import weatherService from '../services/weather'

const WeatherInfo = ({ capital }) => {
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = await weatherService.getWeatherData(capital)
      setForecast(weatherData)
    }

    fetchWeatherData()
  }, [capital])

  return (
    <>
      {forecast && (
        <>
          <h2>Weather in {capital}</h2>
          <p>Temperature: {forecast.current.temp_c}°C</p>
          <img src={forecast.current.condition.icon} alt={forecast.current.condition.text} />
          <p>Wind: {(forecast.current.wind_mph * 0.447).toFixed(1)} m/s</p>
        </>
      )}
    </>
  )
}

export default WeatherInfo