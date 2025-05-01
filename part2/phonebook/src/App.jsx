import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '322-640-3544' },
    { id: 2, name: 'Ada Lovelace', number: '606-870-5958' },
    { id: 3, name: 'Dan Abramov', number: '816-635-5417' },
    { id: 4, name: 'Mary Poppendieck', number: '813-517-1447' },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPersons = persons.filter(person => person.name.includes(searchTerm))

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
      <div>
        <label htmlFor='search'>Search Contacts: </label>
        <input
          id='search'
          type='text'
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
      </div>
      <div>
        <h2>New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name: </label>
            <input
              id='name'
              type='text'
              value={newName}
              onChange={({ target }) => setNewName(target.value)}
            />
          </div>
          <div>
            <label htmlFor='number'>Number: </label>
            <input
              id='number'
              type='text'
              value={newNumber}
              onChange={({ target }) => setNewNumber(target.value)}
            />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Numbers</h2>
        { filteredPersons.length > 0 ? (
            filteredPersons.map(person =>
              <p key={person.id}>{person.name} {person.number}</p>
            )
          ) : <p>No contacts found</p>
        }
      </div>
    </>
  )
}

export default App