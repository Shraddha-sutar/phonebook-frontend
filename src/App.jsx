import React, { useState, useEffect } from 'react';
import personService from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // Fetch all persons from backend
  useEffect(() => {
    personService.getAll()
      .then(response => {
        if (Array.isArray(response.data)) {
          setPersons(response.data);
        } else {
          console.error('Unexpected data:', response.data);
          setPersons([]);
        }
      })
      .catch(() => alert('Error connecting to backend'));
  }, []);

  // Add new person
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) {
      alert('Name or Number cannot be empty');
      return;
    }

    const person = { name: newName, number: newNumber };

    personService.create(person)
      .then(response => {
        if (response.data && response.data._id) {
          setPersons(persons.concat(response.data));
        }
      })
      .catch(err => {
        console.error('Error adding person:', err.response?.data);
        alert(err.response?.data?.error || 'Error adding person');
      });

    setNewName('');
    setNewNumber('');
  };

  // Delete person
  const handleDelete = (_id) => {
    if (!_id) return;
    if (window.confirm('Are you sure you want to delete?')) {
      personService.remove(_id)
        .then(() => setPersons(persons.filter(p => p && p._id !== _id)))
        .catch(() => alert('Error deleting person'));
    }
  };

  // Filtered list with safety check
  const filtered = persons.filter(p =>
    p && p.name && p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        Filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={handleAdd}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filtered.map(p => (
          <li key={p._id}>
            {p.name} {p.number} <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
