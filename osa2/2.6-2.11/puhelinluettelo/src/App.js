import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

import axios from 'axios'

const App = () => {
  const [persons,
    setPersons] = useState([])

  const [newName,
    setNewName] = useState('')

  const [newNumber,
    setNewNumber] = useState('')

  const [filter,
    setFilter] = useState('')

  const [filteredList,
    setFilteredList] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    const newFilteredList = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    setFilteredList(newFilteredList)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <Numbers persons={persons} filteredList={filteredList} filter={filter}/>
    </div>
  )
}

export default App