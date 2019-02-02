import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import NumberService from './services/numbers'
import Notification from './components/Notification'

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

  const [errorMessage,
    setErrorMessage] = useState(null)

  const [notificationMessage,
    setNotificationMessage] = useState(null)

  useEffect(() => {
    NumberService
      .getAll()
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
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        personToUpdate.number = newNumber
        updateNumber(personToUpdate)
      }
    } else {
      NumberService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Lisättiin ${response.data.name}`)
        })
        .catch(error => {
          setErrorMessage('Henkilön luonti epäonnistui')
        })
    }

    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    }, 5000);
  }

  const handlePersonChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const updateNumber = (personToUpdate) => {
    NumberService
      .update(personToUpdate)
      .then(response => {
        setPersons(persons.map(person => person.id !== personToUpdate.id
          ? person
          : response))
        setNotificationMessage(`Henkilön ${personToUpdate.name} numero vaihdettu`)
      })
      .catch(error => setErrorMessage("Numeron vaihto epäonnistui"));

    setNewNumber('')
    setNewName('')
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    }, 5000);
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    const newFilteredList = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    setFilteredList(newFilteredList)
  }

  const handleDeleteButtonClicked = (id) => {
    NumberService
      .deleteNumber(id)
      .then(response => {
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
        setNotificationMessage(`Henkilö poistettu onnistuneesti`)
      })
      .catch(error => {
        setErrorMessage('Henkilö oli jo poistettu')
      });
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    }, 5000);
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification
        errorMessage={errorMessage}
        notificationMessage={notificationMessage}/>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <Numbers
        persons={persons}
        filteredList={filteredList}
        filter={filter}
        handleDeleteButtonClicked={handleDeleteButtonClicked}/>
    </div>
  )
}

export default App