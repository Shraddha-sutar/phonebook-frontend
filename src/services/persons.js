import axios from 'axios'

// Backend URL (तुमच्या Render-deployed backend URL नुसार बदला)
const baseUrl = 'https://phonebook-backend-1-2eqv.onrender.com/api/persons'

// GET all persons
const getAll = () => {
  return axios.get(baseUrl)
    .then(response => {
      // response.data array आहे का ते check करा
      const data = Array.isArray(response.data) ? response.data : [];
      return data;
    })
}

// CREATE new person
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
    .then(response => response.data)
}

// UPDATE existing person
const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
    .then(response => response.data)
}

// DELETE person
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

// Default export for easy import
export default {
  getAll,
  create,
  update,
  remove
}
