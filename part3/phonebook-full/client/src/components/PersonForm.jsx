import { useState } from 'react'

const PersonForm = ({ addContact }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    addContact(newName, newNumber)
    
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input
            id='name'
            type='text'
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
            required='true'
          />
        </div>
        <div>
          <label htmlFor='number'>Number: </label>
          <input
            id='number'
            type='phone'
            value={newNumber}
            onChange={({ target }) => setNewNumber(target.value)}
            required='true'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm