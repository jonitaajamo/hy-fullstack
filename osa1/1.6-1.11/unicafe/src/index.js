import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.name}
    </button>
)

const Statistics = (values) => {
    if (values.sum === 0) {
        return (
            <div>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
    let average = values.average
    let positivePercentage = values.positivePercentage
    if (values.sum < 2) {
        average = 0
        positivePercentage = 0
    }
    return (
        <div>
            <h1>statistiikkaa</h1>
            <table>
                <Statistic type="hyvä" count={values.good}/>
                <Statistic type="neutraali" count={values.neutral}/>
                <Statistic type="huono" count={values.bad}/>
                <Statistic type="yhteensä" count={values.sum}/>
                <Statistic type="keskiarvo" count={average}/>
                <Statistic type="positiivisia" count={positivePercentage}/>
            </table>
        </div>
    )
}

const Statistic = (props) => (
    <tr>
        <td>{props.type}</td>
        <td>{props.count}</td>
    </tr>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good,
        setGood] = useState(0)
    const [neutral,
        setNeutral] = useState(0)
    const [bad,
        setBad] = useState(0)

    const setGoodValue = newValue => {
        setGood(newValue)
    }
    const setNeutralValue = newValue => {
        setNeutral(newValue)
    }
    const setBadValue = newValue => {
        setBad(newValue)
    }

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={() => setGoodValue(good + 1)} name="hyvä"/>
            <Button handleClick={() => setNeutralValue(neutral + 1)} name="neutraali"/>
            <Button handleClick={() => setBadValue(bad + 1)} name="huono"/>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                average={(good * 1 + bad * -1) / (good + bad + neutral)}
                sum={good + bad + neutral}
                positivePercentage={(good / (bad + good + neutral) * 100).toFixed(1) + "%"}/>
        </div>
    )
}

ReactDOM.render(
    <App/>, document.getElementById('root'))