import React from "react";
import styles from './EventComponent.module.sass'


const EventComponent = ({ event, history }) => {

    const openEvent = (id) => {
        history.push(`event/${id}`)
    }

    const nowTime = ~~(new Date().getTime() / 1000)

    const subtractTime = (timeEvent, now) => {
        const result = timeEvent - now
        const days = Math.floor(result / (60 * 60 * 24));
        const hours = Math.floor((result % (3600 * 24)) / 3600);
        const min = Math.floor((result % 3600) / 60);
        return [days, hours, min, result];
    }

    const { id, name, startDateTime, endDateTime } = event
    const [days, hours, min, result] = subtractTime(endDateTime, nowTime)
    let background
    let eventEnd
    if (endDateTime < nowTime) {
        background = '#FF8587'
        eventEnd = true
    }
    else if (startDateTime > nowTime) {
        background = '#FBFFA3'
        eventEnd = false
    }
    else if (startDateTime <= nowTime) {
        eventEnd = false
        const percentComplete = ((nowTime - startDateTime) / (endDateTime - startDateTime)) * 100
        background = `linear-gradient(90deg, #ADFFB3 ${percentComplete}%, #f4f4f4 ${percentComplete}%)`
    }

    return (
        <li id={id} key={id} className={`${styles.event} eventLi`} style={{ background }} onClick={() => openEvent(id)}>
            <h1>{name}</h1>
            <span>{eventEnd ? `${event.entries.length} Entries` : `${days} day ${hours} hour ${min} min`}</span>
        </li>
    )

}

export default EventComponent