const Filter = ({ searchTerm, onChange }) => (
  <div>
    <label htmlFor='search'>Search Contacts: </label>
    <input
      id='search'
      type='text'
      value={searchTerm}
      onChange={onChange}
    />
  </div>
)

export default Filter