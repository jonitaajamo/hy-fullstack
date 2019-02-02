import React from 'react'

const Person = (props) => (
    <li>
        {props.name}{' '}{props.number}
        <button
            onClick={() => window.confirm("Poistetaanko " + props.name)
            ? props.handleDeleteButtonClicked(props.id)
            : window.alert("Henkilöä " + props.name + " ei poistettu")}>delete</button>
    </li>
)

export default Person