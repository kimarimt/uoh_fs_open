import CountryDetail from './CountryDetail'

const SearchResults = ({ results }) => {
  return (
    <>
      {results &&
        <div>
          {results.length > 10 && <p>Too many matches, specify another filter</p>}
          {results.length > 1 && results.length <= 10 && results.map(country => <p key={country.name.common}>{country.name.common}</p>)}
          {results.length === 1 && <CountryDetail country={results[0]} />}
        </div>
      }
    </>
  )
}

export default SearchResults