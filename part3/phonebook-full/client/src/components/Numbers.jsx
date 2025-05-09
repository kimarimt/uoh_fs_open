const Numbers = ({ persons, onDelete }) => (
  <div>
    {persons.length > 0 ? (
      persons.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
          {' '}
          <button onClick={() => onDelete(person.id)}>delete</button>
        </p>
      )
    ) : <p>No contacts found</p>
    }
  </div>
)

export default Numbers