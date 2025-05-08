import axios from 'axios'

const BASE_URL = 'http://api.weatherapi.com/v1/current.json'

const getWeatherData = async capital => {
  const url = `${BASE_URL}?key=${import.meta.env.VITE_API_KEY}&q=${capital}`

  const response = await axios.get(url)
  return response.data
}

export default {
  getWeatherData
}