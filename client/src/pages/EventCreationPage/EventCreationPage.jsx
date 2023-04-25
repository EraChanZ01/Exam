import React, { useRef } from "react"
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import styles from "./EventCreationPage.module.sass";
import { createEvent } from "../../store/slices/eventSlice"
import FormEvent from "../../components/FormEvent/FormEvent"
import NextButton from '../../components/NextButton/NextButton';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from "../../components/Spinner/Spinner"



const EventCreationPage = props => {
    const formRef = useRef();

    const handleSubmit = (values) => {
        props.createEvent({
            startDateTime: new Date(`${values.startDate} ${values.startTime}`).getTime() / 1000,
            endDateTime: new Date(`${values.endDate} ${values.endTime}`).getTime() / 1000,
            notifiDateTime: new Date(`${values.notifiDate} ${values.notifiTime}`).getTime() / 1000,
            name: values.name,
            status: "active",
            user: {
                id: props.data.id,
                email: props.data.email
            },
            entries: []
        })
        props.history.push('/events')
    }
    const submitForm = () => {
        formRef.current.handleSubmit()
    }
    return (
        <div>
            <Header />
            {props.isFetching ? (<Spinner />) : (
                <>
                    <div className={styles.form}>
                        <FormEvent
                            handleSubmit={handleSubmit}
                            formRef={formRef}
                        />
                    </div>
                    <div className={styles.conteinerButton}>
                        <BackButton />
                        <NextButton submit={submitForm} />
                    </div>
                </>
            )
            }

        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    createEvent: (data) => dispatch(createEvent(data))

})
const mapStateToProps = state => {
    const { isFetching, userStore } = state.userStore;
    return { isFetching, ...userStore };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreationPage);