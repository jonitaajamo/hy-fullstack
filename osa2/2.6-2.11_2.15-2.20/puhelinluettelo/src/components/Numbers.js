import React from 'react'
import Person from './Person'

const Numbers = (props) => (
    <div>
        <h3>Numerot</h3>
        <ul>
            {props.filter
                ? props
                    .filteredList
                    .map(person => <Person
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        number={person.number}
                        handleDeleteButtonClicked={props.handleDeleteButtonClicked}/>)
                : props
                    .persons
                    .map(person => <Person
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        number={person.number}
                        handleDeleteButtonClicked={props.handleDeleteButtonClicked}/>)}
        </ul>
    </div>
)

export default Numbers