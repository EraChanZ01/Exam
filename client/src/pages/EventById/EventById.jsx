import React, { useState } from "react"
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import styles from "./EventById.module.sass"
import Spinner from "../../components/Spinner/Spinner"
import Header from "../../components/Header/Header";
import { updateEvent, updateStatusEvent } from "../../store/slices/eventSlice"
import Rating from 'react-rating';
import { confirmAlert } from 'react-confirm-alert';

const EventById = props => {
    const { params } = props.match;
    const [text, setText] = useState("")
    const handleChange = ({ target: { value } }) => {
        setText(value)
    }
    const setEventStatus = (userId, eventId, entriesId, command) => {
        props.updateStatusEvent({
            eventId: eventId,
            userId: userId,
            status: command,
            entrieId: entriesId
        })
    }
    const handleClickResolve = (entriesId) => {
        confirmAlert({
            title: 'confirm',
            message: 'Are u sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        setEventStatus(props.data.id, params.id, entriesId, 'resolve'),
                },
                {
                    label: 'No',
                },
            ],
        })
    }
    const handleClickReject = (entriesId) => {
        confirmAlert({
            title: 'confirm',
            message: 'Are u sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        setEventStatus(props.data.id, params.id, entriesId, 'reject'),
                },
                {
                    label: 'No',
                },
            ],
        })
    }
    const sendOffer = () => {
        props.updateEvent({
            creatorId: props.data.id,
            eventId: params.id,
            text: text,
            status: "pending"
        })
    }

    const renderEntries = () => {
        return (
            props.eventStore[params.id].entries.map((el, index) => {
                return (
                    <li key={el.id} id={el.id} className={styles.entrie}>
                        <div className={styles.container}>
                            <div className={styles.entrieCreater}>
                                <div className={styles.createrInfo}>
                                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}anonym.png`} />
                                    <div className={styles.additionalInfo}>
                                        <div>User</div>
                                        <span>User@gmail.com</span>
                                    </div>
                                </div>
                                <Rating
                                    initialRating={2}
                                    fractions={2}
                                    fullSymbol={
                                        <img
                                            src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                                            alt="star"
                                        />
                                    }
                                    placeholderSymbol={
                                        <img
                                            src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                                            alt="star"
                                        />
                                    }
                                    emptySymbol={
                                        <img
                                            src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                                            alt="star-outline"
                                        />
                                    }
                                    readonly
                                />
                            </div>
                            <div className={styles.entrieContent}>{el.text ? (
                                el.text
                            ) : (
                                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}${el.fileName}`} />
                            )}
                            </div>
                            {el.status === "won" ? (
                                <div className={styles.entrieGradeGreen}>
                                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}check.png`} />
                                </div>
                            ) : (
                                el.status === "rejected" ? (
                                    <div className={styles.entrieGradeRed}>
                                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}cross.png`} />
                                    </div>
                                ) : (
                                    <div className={styles.entrieGrade}>
                                    </div>
                                )

                            )}
                        </div>
                        {props.data.role === CONSTANTS.CUSTOMER &
                            props.eventStore[params.id].user.id === props.data.id &
                            el.status === "pending" ?
                            <div className={styles.solution}>
                                <button className={styles.resolve} onClick={() => handleClickResolve(el.id)}>Resolve</button>
                                <button className={styles.reject} onClick={() => handleClickReject(el.id)}>Reject</button>
                            </div>
                            : null
                        }
                    </li>
                )
            })
        )
    }

    return (
        <div>
            {props.isFetching ? (<Spinner />
            ) : (
                <>
                    <Header />
                    <div className={styles.sectionEntries}>
                        <h1>{props.eventStore[params.id].name}</h1>
                        {props.data.role === CONSTANTS.CUSTOMER ||
                            props.eventStore[params.id].endDateTime <= ~~(Date.now() / 1000) ||
                            props.eventStore[params.id].startDateTime > ~~(Date.now() / 1000) ?
                            null
                            :
                            (<div className={styles.formEntrie}>
                                <input onChange={handleChange} />
                                <button className={styles.entrieButton} onClick={sendOffer}>Send offer</button>
                            </div>)
                        }
                        <div className={styles.containerEntries}>
                            <ul>
                                {renderEntries()}
                            </ul>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    )
}

const mapStateToProps = state => {
    const { userStore, eventStore } = state;
    return { ...userStore, eventStore };
};
const mapDispatchToProps = dispatch => ({
    updateEvent: (data) => dispatch(updateEvent(data)),
    updateStatusEvent: (data) => dispatch(updateStatusEvent(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(EventById)