const SearchBar = ({ searchTerm, handleChange }) => (
  <div>
    <label htmlFor='search'>Find countries: </label>
    <input
      id='search'
      type='text'
      value={searchTerm}
      onChange={handleChange}
    />
  </div>
)

export default SearchBar