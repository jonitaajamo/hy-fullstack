import React from 'react'

const PersonForm = (props) => (
    <div>
        <h3>Lisää uusi</h3>
        <form onSubmit={props.addPerson}>
            <div>
                nimi:
                <input value={props.newName} onChange={props.handlePersonChange}/>
                <br/>
                numero:
                <input value={props.newNumber} onChange={props.handleNumberChange}/>
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    </div>
)

export default PersonForm