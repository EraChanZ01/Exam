import React, { useState, useEffect } from "react"
import { connect } from 'react-redux';
import { updateBundle } from '../../store/slices/bundleSlice';
import { sortEvent } from '../../store/slices/eventSlice'
import styles from "./EventsPage.module.sass"
import Header from "../../components/Header/Header";
import CONSTANTS from '../../constants';
import CustomerEvents from "../../components/CustomerEvents/CustomerEvents";
import CreatorEvents from "../../components/CreatorEvents/CreatorEvents";
import Spinner from "../../components/Spinner/Spinner"



const EventsPage = props => {


    let intervalId

    useEffect(() => {
        props.sortEvent()
        intervalId = setInterval(() => {
            props.sortEvent()
        }, 60000)
    }, [])

    return (
        <div className={styles.eventPage}>
            {props.isFetching ? <Spinner /> :
                <>
                    <Header />
                    {props.data.role === CONSTANTS.CUSTOMER ? (
                        <CustomerEvents
                            arrayEvents={props.eventStore.events}
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
                            arrayEvents={props.eventStore.events}
                            history={props.history}
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
    sortEvent: () => dispatch(sortEvent())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);