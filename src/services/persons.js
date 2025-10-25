import axios from 'axios'

// Backend URL 
const baseUrl = 'https://phonebook-backend-1-2eqv.onrender.com/api/persons'

// API functions
const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// Default export for easy import
export default {
  getAll,
  create,
  update,
  remove
}
