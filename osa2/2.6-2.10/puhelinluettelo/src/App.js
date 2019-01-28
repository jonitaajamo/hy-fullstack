import React, {useState} from 'react'

const App = () => {
  const [persons,
    setPersons] = useState([
    {
      name: 'Arto Hellas'
    }
  ])

  const [newName,
    setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log("klikked")
  }

  const handleNoteChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi:
          <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numerot</h2>
      ...
    </div>
  )

}

export default App
