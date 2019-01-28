import React, {useState} from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons,
    setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '050-6666420'
    }, {
      name: 'Matti Mattila',
      number: '040-11111111'
    }
  ])

  const [newName,
    setNewName] = useState('')

  const [newNumber,
    setNewNumber] = useState('')

  const [filter,
    setFilter] = useState('')

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
    event.preventDefault()
    setFilter(event.target.value)
  }

  const personsToShow = persons
    .filter(person => person.name.toLowerCase().includes(filter))
    .map(person => <Person key={person.name} name={person.name} number={person.number}/>)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter value={filter} onChange={handleFilterChange}/>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <Numbers persons={personsToShow}/>
    </div>
  )
}

export default App