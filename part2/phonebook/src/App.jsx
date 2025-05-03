import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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

  const addContact = async (name, number) => {
    const personExists = persons.find(person =>
      person.name === name
    )

    if (personExists) {
      editContact({ ...personExists, number })
      return
    }

    const person = {
      id: uuidv4(),
      name,
      number,
    }

    const newPerson = await personsService.addPerson(person)
    setPersons([...persons, newPerson])
  }

  const editContact = async newPerson => {
    if (confirm(`${newPerson.name} already exists in the phonebook. Would you like to update the number`)) {
      const updatedPerson = await personsService.editPerson(newPerson.id, newPerson)
      setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
    }
  }

  const deleteContact = async id => {
    const deletedPerson = await personsService.deletePerson(id)
    setPersons(persons.filter(person => person.id !== deletedPerson.id))
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
      <Numbers
        persons={filteredPersons}
        onDelete={deleteContact}
      />
    </>
  )
}

export default App