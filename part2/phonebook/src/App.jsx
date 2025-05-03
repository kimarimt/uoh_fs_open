import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '322-640-3544' },
    { id: 2, name: 'Ada Lovelace', number: '606-870-5958' },
    { id: 3, name: 'Dan Abramov', number: '816-635-5417' },
    { id: 4, name: 'Mary Poppendieck', number: '813-517-1447' },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredPersons = persons.filter(person => person.name.includes(searchTerm))

  const addContact = (name, number) => {
    const personExists = persons.find(person =>
      person.name === name
    )

    if (personExists) {
      alert(`${name} is already added to phonebook`)
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name,
      number,
    }

    setPersons([...persons, newPerson])
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter
        searchTerm={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <h2>New Contact</h2>
      <PersonForm addContact={addContact} />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} />
    </>
  )
}

export default App