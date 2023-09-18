import React, { useState, useEffect } from "react"
import CONSTANTS from "../../constants"
import EventComponent from '../EventComponent/EventComponent'


const CreatorEvents = ({ arrayEvents, classes, history }) => {

    const [events, setEvents] = useState(arrayEvents)

    useEffect(() => {

        setEvents(arrayEvents)
    }, [arrayEvents])

    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventBox}>
                <div className={classes.eventHeader}>
                    <h1>Event List</h1>
                    <p>Remaining time <img src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`} alt="clock" /></p>
                </div>
                <div className={classes.eventList}>
                    <ul>
                        {events.map((event, index) => {
                            if (event.notifiDateTime <= ~~(new Date().getTime() / 1000)) return <EventComponent key={index} event={event} history={history} />
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CreatorEvents