import React, {useState, useEffect} from 'react';
import axios from 'axios'

const SearchForm = (props) => (
  <form>
    find countries:
    <input type="text" value={props.filter} onChange={props.filterChangeHandler}/>
  </form>
)

const Country = (props) => {
  props.fetchWeather(props.capital)
  return (
    <div>
      <h1>{props.name}</h1>
      <p>capital: {props.capital}</p>
      <p>population: {props.population}</p>
      <h2>languages</h2>
      <ul>{props
          .countries
          .map(country => country.languages.map(language => <li key={language.name}>{language.name}</li>))}
      </ul>
      <p>
        <img src={props.imageUrl} alt="country flag" height="100" hspace="20"/>
      </p>
      <h2>Weather in {props.capital}</h2>
      <p>
        <b>temperature:
        </b>
        {props.temperature}
        Celsius
      </p>
      <p><img src={props.icon} alt="weather icon"/></p>
      <p>
        <b>wind:</b>
        {props.wind}
        mps, direction {props.windDirection}
        degrees
      </p>
    </div>
  )
}

const CountryList = (props) => {
  const countries = props.filteredCountries

  return (
    <ul>
      {countries.length > 10
        ? "Too many matches, specify another filter"
        : countries.map(country => <li key={country.name}>{country.name}
          <button onClick={() => props.handleClick(country.name)}>show</button>
        </li>)}
    </ul>
  )
}

const App = () => {

  const [countryData,
    setCountryData] = useState([])
  const [filter,
    setFilter] = useState('')
  const [filteredCountries,
    setFilteredCountries] = useState([])
  const [temperature,
    setTemperature] = useState('')
  const [wind,
    setWind] = useState('')
  const [icon,
    setIcon] = useState('')
  const [windDirection,
    setWindDirection] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const newCountryData = response
          .data
          .map(country => {
            return ({name: country.name, capital: country.capital, population: country.population, languages: country.languages, flag: country.flag})
          })
        setCountryData(newCountryData)
        setFilteredCountries(newCountryData)
      })
  }, [])

  const filterChangeHandler = (event) => {
    changeFilter(event.target.value)
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
    const filteredList = countryData.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    setFilteredCountries(filteredList)
  }

  const handleClick = (name) => {
    changeFilter(name)
  }

  const fetchWeather = (capital) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=143cc3e71f52aefc4fc09113d65a2013`)
      .then(responseJson => {
        console.log(responseJson.data.wind.direction)
        setTemperature(responseJson.data.main.temp)
        setWind(responseJson.data.wind.speed)
        setIcon("http://openweathermap.org/img/w/" + responseJson.data.weather[0].icon + ".png")
        setWindDirection(responseJson.data.wind.direction)
      })
  }

  return (
    <div>
      <SearchForm filter={filter} filterChangeHandler={filterChangeHandler}/> {filteredCountries.length === 1
        ? <Country
            countries={filteredCountries}
            name={filteredCountries[0].name}
            capital={filteredCountries[0].capital}
            population={filteredCountries[0].population}
            imageUrl={filteredCountries[0].flag}
            temperature={temperature}
            wind={wind}
            icon={icon}
            windDirection={windDirection}
            fetchWeather={fetchWeather}/>
        : <CountryList filteredCountries={filteredCountries} handleClick={handleClick}/>}
    </div>
  )
}

export default App;