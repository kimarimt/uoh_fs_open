import { useState } from 'react'
import { useEffect } from 'react'
import countriesService from './services/countries'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await countriesService.fetchCountries(searchTerm)
      setCountries(countriesData)
    }

    fetchCountries()
  }, [])

  const searchResults = countries 
    ? countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  return (
    <>
      { countries && 
        <>
          <SearchBar 
            searchTerm={searchTerm} 
            handleChange={({ target }) => setSearchTerm(target.value)}
          />
          <SearchResults results={searchResults} />
        </>
      }
    </> 
  )
}

export default App
