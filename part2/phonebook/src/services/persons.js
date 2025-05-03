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

const deletePerson = async id => {
  const response = await axios.delete(`${BASE_URL}/${id}`)
  return response.data
}

export default {
  getPersons,
  addPerson,
  deletePerson,
}