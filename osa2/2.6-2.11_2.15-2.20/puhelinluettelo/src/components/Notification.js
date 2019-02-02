import React from 'react'

const Notification = (props) => {
    if (props.errorMessage === null && props.notificationMessage === null) {
        return null
    }

    if (props.notificationMessage) {
        return (
            <div className="notification">
                {props.notificationMessage}
            </div>
        )
    } else {
        return (
            <div className="error">
                {props.errorMessage}
            </div>
        )
    }

}

export default Notification