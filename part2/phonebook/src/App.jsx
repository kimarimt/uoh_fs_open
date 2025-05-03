import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPersons = async () => {
      const persons = await personsService.getPersons()
      setPersons(persons)
    } 

    fetchPersons()
  }, [])

  const filteredPersons = persons ? persons.filter(person => person.name.includes(searchTerm)) : []

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