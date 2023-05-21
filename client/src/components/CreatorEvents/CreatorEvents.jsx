import React from "react"
import CONSTANTS from "../../constants"


const CreatorEvents = ({ renderEvent, classes }) => {

    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventBox}>
                <div className={classes.eventHeader}>
                    <h1>Event List</h1>
                    <p>Remaining time <img src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`} /></p>
                </div>
                <div className={classes.eventList}>
                    {renderEvent()}
                </div>
            </div>
        </div>
    )
}

export default CreatorEvents