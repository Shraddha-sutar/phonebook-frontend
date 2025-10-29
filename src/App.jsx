import React, { useState, useEffect } from 'react';
import personService from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // 🔹 Fetch all persons on load
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('Fetched:', response.data);
        setPersons(response.data || []); // Handle undefined case
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        alert('Error connecting to backend');
      });
  }, []);

  // 🔹 Add new person
  const handleAdd = (e) => {
    e.preventDefault();
    const person = { name: newName, number: newNumber };

    personService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response.data)); // add new data
        setNewName('');
        setNewNumber('');
      })
      .catch(err => {
        console.error('Error adding person:', err.response?.data);
        alert(err.response?.data?.error || 'Error adding person');
      });
  };

  const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete?')) {
    personService.remove(id)
      .then(() => setPersons(persons.filter(p => p._id !== id)))
      .catch(err => {
        console.error('Error deleting:', err);
        alert('Delete failed — check backend logs');
      });
  }
};

  // 🔹 Filter logic
  const filtered = persons.filter(
    p => p.name && p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>📞 Phonebook</h2>

      {/* Filter */}
      <div>
        <strong>Filter:</strong>{' '}
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name..."
        />
      </div>

      {/* Add new person */}
      <h3>Add a new</h3>
      <form onSubmit={handleAdd}>
        <div>
          Name:{' '}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div>
          Number:{' '}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="Enter number"
          />
        </div>
        <button type="submit" style={{ marginTop: '8px' }}>Add</button>
      </form>

      {/* Display persons */}
      <h3>Numbers</h3>
      <ul>
        {filtered.map(p => (
          <li key={p._id}>
            {p.name} — {p.number}{' '}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
