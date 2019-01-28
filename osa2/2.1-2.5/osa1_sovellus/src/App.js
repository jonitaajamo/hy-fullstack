import React from 'react'
import Course from './components/Course'

const App = (props) => {
    return (
        <div>
            {props
                .courses
                .map(course => <Course key={course.id} course={course.name} parts={course.parts}/>)}
        </div>
    )
}

export default App
