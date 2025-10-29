import axios from 'axios';

// ✅ Render backend URL
const baseUrl = 'https://phonebook-backend-1-2eqv.onrender.com/api/persons';

// सर्व persons मिळवा
const getAll = () => axios.get(baseUrl);

// नवीन person add करा
const create = (newPerson) => axios.post(baseUrl, newPerson);

// person delete करा
const remove = (id) => axios.delete(`${baseUrl}/${id}`);

// update (optional)
const update = (id, updatedPerson) => axios.put(`${baseUrl}/${id}`, updatedPerson);

export default { getAll, create, remove, update };
