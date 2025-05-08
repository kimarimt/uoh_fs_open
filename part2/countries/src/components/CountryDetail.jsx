import WeatherInfo from './WeatherIInfo'

const CountryDetail = ({ country }) => (
  <>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <h2>Languages</h2>
    <ul>
      { Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
      )}
    </ul>
    <img 
      src={country.flags.png} 
      alt={country.flags.alt}
    />
    <WeatherInfo capital={country.capital[0]} />
  </>
)

export default CountryDetail