import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const AnecdoteOfDay = (props) => (
    <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={props.anecdote} points={props.points}/>
    </div>
)

const Anecdote = (props) => {
    return (
        <div>
            {props.anecdote}
            <br/>
            <p>has {props.points}
                {' '}points</p>
        </div>
    )
}

const MostVoted = (props) => {
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <Anecdote anecdote={props.anecdote} points={props.points}/>
        </div>
    )
}

const App = (props) => {
    const [selected,
        setSelected] = useState(0)

    const emptyArray = new Array(props.anecdotes.length + 1)
        .join('0')
        .split('')
        .map(parseFloat)

    const [points,
        setPoints] = useState(emptyArray)

    const setPointValue = value => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    let bestPoints = points.indexOf(Math.max(...points))

    return (
        <div>
            <AnecdoteOfDay anecdote={props.anecdotes[selected]} points={points[selected]}/>
            <Button handleClick={() => setPointValue()} text="vote"/>
            <Button
                handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))}
                text="next anecdote"/>
            <MostVoted anecdote={props.anecdotes[bestPoints]} points={points[bestPoints]}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often', 'Adding manpower to a late software project makes it later!', 'The first 90 percent of the code accounts for the first 90 percent of the develo' +
            'pment time...The remaining 10 percent of the code accounts for the other 90 perc' +
            'ent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write c' +
            'ode that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if' +
            ' you write the code as cleverly as possible, you are, by definition, not smart e' +
            'nough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>, document.getElementById('root'))