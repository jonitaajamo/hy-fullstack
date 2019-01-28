import React from 'react'

const Filter = (props) => (
    <div>
        <h3>Rajaa</h3>
        rajaa näytettäviä:
        <input value={props.value} onChange={props.onChange}/>

    </div>
)

export default Filter