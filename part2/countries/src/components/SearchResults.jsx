import { useState } from 'react'
import countriesService from '../services/countries'
import CountryDetail from './CountryDetail'

const SearchResults = ({ results }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [country, setCountry] = useState(null)

  const handleChange = async name => {
    const countryData = await countriesService.fetchCountry(name)
    setCountry(countryData)
    setShowDetail(true)
  }

  const reset = () => {
    setName('')
    setShowDetail(false)
    setCountry(null)
  }

  return (
    <>
      {showDetail && country && (
        <>
          <CountryDetail country={country} />
          <br />
          <button onClick={reset}>Back</button>
        </>
      )}
      {!showDetail &&
        <>
          {results &&
            <div>
              {results.length > 10 && <p>Too many matches, specify another filter</p>}
              {results.length > 1 && results.length <= 10 && results.map(country => (
                <p key={country.name.common}>
                  {country.name.common}
                  <button onClick={() => handleChange(country.name.common)}>Show</button>
                </p>
              ))}
              {results.length === 1 && <CountryDetail country={results[0]} />}
            </div>
          }
        </>
      }
    </>
  )
}

export default SearchResults