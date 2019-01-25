import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            {props
                .parts
                .map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part}
                {' '}
                {props.exercises}
            </p>
        </div>
    )
}

const Total = (props) => {
    const total = props
        .parts
        .reduce((s, p) => {
            return s + p.exercises
        }, 0)

    return (
        <p>yhteensä: {total}
            {' '}tehtävää</p>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course}/>
            <Content parts={props.parts}/>
            <Total parts={props.parts}/>
        </div>
    )
}

export default Course