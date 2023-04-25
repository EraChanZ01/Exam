import React from "react"


const CreatorEvents = ({ renderEvent, classes }) => {

    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventBox}>
                <div className={classes.eventHeader}>
                    <h1>Event List</h1>
                    <p>Remaining time</p>
                </div>
                <div className={classes.eventList}>
                    {renderEvent()}
                </div>
            </div>
        </div>
    )
}

export default CreatorEvents