import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState(null)

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
    
    toggleNotification(`Added ${newPerson.name}`, 'green')
    setPersons([...persons, newPerson])
  }

  const editContact = async newPerson => {
    if (confirm(`${newPerson.name} already exists in the phonebook. Would you like to update the number`)) {
      const updatedPerson = await personsService.editPerson(newPerson.id, newPerson)
      toggleNotification(`Number for ${updatedPerson.name} updated`, 'green')
      setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
    }
  }

  const deleteContact = async id => {
    try {
      const deletedPerson = await personsService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
    } catch (_) {
      toggleNotification(`Contact not found`, 'red')
    }
  }

  const toggleNotification = (message, color) => {
    setMessage(message)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor(null)
    }, 2000)
  }

  return (
    <>
      <h1>Phonebook</h1>
      {message && color &&
        <Notification message={message} color={color} />
      }
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