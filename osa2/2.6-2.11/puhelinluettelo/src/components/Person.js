import React from 'react'

const Person = (props) => (
    <li>
        {props.name}{' '}{props.number}
    </li>
)

export default Person