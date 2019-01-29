import React from 'react'
import Person from './Person'

const Numbers = (props) => (
    <div>
        <h3>Numerot</h3>
        <ul>
            {props.filter
                ? props
                    .filteredList
                    .map(person => <Person key={person.id} name={person.name} number={person.number}/>)
                : props
                    .persons
                    .map(person => <Person key={person.id} name={person.name} number={person.number}/>)}
        </ul>
    </div>
)

export default Numbers