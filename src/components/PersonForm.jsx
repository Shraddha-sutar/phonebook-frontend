const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, handleAddPerson }) => (
  <form onSubmit={handleAddPerson}>
    <div>
      Name: <input value={newName} onChange={e => setNewName(e.target.value)} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
    </div>
    <button type="submit">Add</button>
  </form>
);

export default PersonForm;
