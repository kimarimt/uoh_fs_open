import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '322-640-3544' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    
    const personExists = persons.find(person => 
      person.name === newName
    )

    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="number">Number: </label>
          <input
            id="number"
            type="text"
            value={newNumber}
            onChange={({ target }) => setNewNumber(target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </>
  )
}

export default App