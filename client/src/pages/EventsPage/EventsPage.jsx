import React, { useState, useEffect } from "react"
import { connect } from 'react-redux';
import BundleBox from "../../components/BundleBox/BundleBox"
import { updateBundle } from '../../store/slices/bundleSlice';
import styles from "./EventsPage.module.sass"
import Header from "../../components/Header/Header";
import CONSTANTS from '../../constants';
import CustomerEvents from "../../components/CustomerEvents/CustomerEvents";
import CreatorEvents from "../../components/CreatorEvents/CreatorEvents";
import Spinner from "../../components/Spinner/Spinner"



const EventsPage = props => {

    const [event, setEvent] = useState([])

    const renderTimeAndStyle = () => {
        if (window.location.pathname != "/events") {
            return clearInterval(intervalId)
        }
        const subtractTime = (timeEvent, now) => {
            const result = timeEvent - now
            const days = Math.floor(result / (60 * 60 * 24));
            const hours = Math.floor((result % (3600 * 24)) / 3600);
            const min = Math.floor((result % 3600) / 60);
            return [days, hours, min, result];
        }
        const renderConponent = (timoutOrMessage, style, component) => {
            const result = timoutOrMessage instanceof Array ? `${timoutOrMessage[0]} day ${timoutOrMessage[1]} hour ${timoutOrMessage[2]} min` : `${timoutOrMessage}`
            component.style.background = style
            if (component.childNodes[1]) {
                component.removeChild(component.childNodes[1])
            }
            const spanElem = document.createElement('span')
            spanElem.innerHTML = result
            component.append(spanElem)
        }
        const element = [...document.getElementsByClassName("eventLi")]
        if (element.length != 0) {
            const nowTime = ~~(new Date().getTime() / 1000)
            element.forEach(event => {
                const { startDateTime, endDateTime } = props.eventStore[event.id]
                if (endDateTime < nowTime) {
                    return renderConponent(`${props.eventStore[event.id].entries.length} Entries`, "#FF8587", event)
                }
                if (startDateTime > nowTime) {
                    return renderConponent(subtractTime(startDateTime, nowTime), "#FBFFA3", event)
                }
                if (startDateTime <= nowTime) {
                    const [days, hours, min, result] = subtractTime(endDateTime, nowTime)
                    const percentComplete = ((endDateTime - (result * 1000)) * 100) / (endDateTime)
                    return renderConponent([days, hours, min, result], `linear-gradient(90deg, #ADFFB3 ${percentComplete}%, #f4f4f4 ${percentComplete}%)`, event)
                }
            })
        }
    }   
    const sortEvent = (arr) => {
        const newArr = [...arr]
        const timeNow = ~~(Date.now() / 1000)
        newArr.sort((a, b) => {
            if (a.endDateTime < timeNow && b.endDateTime > timeNow) {
                return 1
            }
            if (a.startDateTime > timeNow && b.startDateTime < timeNow && b.endDateTime > timeNow) {
                return 1
            }
            if (a.endDateTime - timeNow > b.endDateTime - timeNow && b.startDateTime < timeNow && b.endDateTime > timeNow) {
                return 1
            }
            if (a.endDateTime - timeNow > b.endDateTime - timeNow && a.startDateTime > timeNow && b.startDateTime > timeNow) {
                return 1
            } else {
                return -1
            }
        })
        setEvent(newArr)
    }
    const openEvent = (id) => {
        props.history.push(`event/${id}`)
    }

    const renderEvent = () => {
        return (
            <ul>
                {event.map(event => {
                    const { id, name } = event
                    return (
                        <li id={id} key={id} className={`${styles.event} eventLi`} onClick={() => openEvent(id)}>
                            <h1>{name}</h1>
                        </li>
                    )
                })}
            </ul>
        )
    }
    let intervalId
    useEffect(() => {
        renderTimeAndStyle()
    }, [event]);
    useEffect(() => {
        sortEvent([...props.eventStore])
        intervalId = setInterval(() => {
            renderTimeAndStyle()
            sortEvent([...props.eventStore])
        }, 5000)
    }, [])
    return (
        <div className={styles.eventPage}>
            {props.isFetching ? <Spinner /> :
                <>
                    <Header />
                    {props.data.role === CONSTANTS.CUSTOMER ? (
                        <CustomerEvents
                            renderEvent={renderEvent}
                            renderTimeAndStyle={renderTimeAndStyle}
                            history={props.history}
                            classes={{
                                eventContainer: styles.eventContainer,
                                frameBundle: styles.frameBundle,
                                eventBox: styles.eventBox,
                                eventHeader: styles.eventHeader,
                                eventList: styles.eventList
                            }} />
                    ) : (
                        <CreatorEvents
                            renderEvent={renderEvent}
                            renderTimeAndStyle={renderTimeAndStyle}
                            classes={{
                                eventContainer: styles.eventContainer,
                                eventBox: styles.eventBox,
                                eventHeader: styles.eventHeader,
                                eventList: styles.eventList
                            }} />
                    )
                    }
                </>
            }
        </div>
    )
}

const mapStateToProps = state => {
    const { bundleStore, userStore, eventStore } = state;
    return { bundleStore, ...userStore, eventStore };
};

const mapDispatchToProps = dispatch => ({
    choseBundle: bundle => dispatch(updateBundle(bundle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);