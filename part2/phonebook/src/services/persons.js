import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getPersons = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const addPerson = async personObj => {
  const response = await axios.post(BASE_URL, personObj)
  return response.data
}

export default {
  getPersons,
  addPerson,
}