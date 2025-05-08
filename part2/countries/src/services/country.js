import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountriesData = async () => {
  const response = await axios.get(`${BASE_URL}/all`)
  return response.data
}

const getCountryData = async name => {
  const response = await axios.get(`${BASE_URL}/name/${name}`)
  return response.data
}

export default {
  getCountriesData,
  getCountryData
}