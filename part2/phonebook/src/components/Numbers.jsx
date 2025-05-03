const Numbers = ({ persons }) => (
  <div>
    {persons.length > 0 ? (
      persons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )
    ) : <p>No contacts found</p>
    }
  </div>
)

export default Numbers