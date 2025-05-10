import axios from 'axios'

const baseUrl = '/api/persons'

const addPerson = async personObj => {
  const response = await axios.post(baseUrl, personObj)
  return response.data
}

const getPersons = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const editPerson = async (id, personObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, personObj)
  return response.data
}

const deletePerson = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default {
  addPerson,
  getPersons,
  editPerson,
  deletePerson,
}