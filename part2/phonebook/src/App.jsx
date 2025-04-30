import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    
    const newPerson = {
      name: newName
    }
    
    setPersons([...persons, newPerson])
    setNewName('')
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newName">Name: </label>
          <input
            id="newName"
            type="text"
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>
      )}
    </>
  )
}

export default App