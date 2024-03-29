import React from "react";
import { Form, Formik } from 'formik';
import FormInput from '../FormInput/FormInput'
import styles from './FormEvent.module.sass'


const FormEvent = props => {
    const currentDate = Date.now()
    const validateData = (values) => {
        const errors = {}
        const dateTimeStart = new Date(values.startDate + 'T' + values.startTime).getTime()
        const dateTimeNotifi = new Date(values.notificationDate + 'T' + values.notificationTime).getTime()
        if (dateTimeStart < currentDate + 43200000) errors.startDate = "Invalid event start date selected"
        if (new Date(values.endDate).getTime() < currentDate + 86400000) errors.endDate = "Invalid event end date selected"
        if (dateTimeNotifi >= dateTimeStart) errors.notificationDate = "Invalid event notification date selected"
        return errors
    }
    return (
        <div className={styles.formEvent}>
            <Formik
                initialValues={{
                    name: "",
                    startTime: "",
                    startDate: "",
                    endDate: "",
                    endTime: "",
                    notificationTime: "",
                    notificationDate: ""
                }}
                onSubmit={props.handleSubmit}
                innerRef={props.formRef}
                validate={validateData}
            >
                <Form>
                    <div className={styles.formItem}>
                        <h1>Event name</h1>
                        <FormInput
                            name="name"
                            type="text"
                            label="name"
                            classes={{
                                container: styles.componentInputContainer,
                                input: styles.input,
                                warning: styles.warning,
                            }}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h1>Schedule the start of the event</h1>
                        <div className={styles.formStartTime}>
                            <FormInput
                                name="startDate"
                                type="date"
                                label="startDate"
                                classes={{
                                    container: styles.componentInputContainer,
                                    input: styles.input,
                                    warning: styles.warning,
                                }}
                            />
                            <FormInput
                                name="startTime"
                                type="time"
                                label="startTime"
                                classes={{
                                    container: styles.componentInputContainer,
                                    input: styles.input,
                                    warning: styles.warning,
                                }}
                            />
                        </div>

                    </div>
                    <div className={styles.formItem}>
                        <h1>Select the end date of the event</h1>
                        <div className={styles.formEndsTime}>
                            <FormInput
                                name="endDate"
                                type="date"
                                label="endTime"
                                classes={{
                                    container: styles.componentInputContainer,
                                    input: styles.input,
                                    warning: styles.warning,
                                }}
                            />
                            <FormInput
                                name="endTime"
                                type="time"
                                label="endTime"
                                classes={{
                                    container: styles.componentInputContainer,
                                    input: styles.input,
                                    warning: styles.warning,
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <h1>Select the time for event notification</h1>
                        <div className={styles.notificationForm}>
                            <FormInput
                                name="notificationDate"
                                type="date"
                                label="notification Date"
                                classes={{
                                    container: styles.componentInputContainer,
                                    input: styles.input,
                                    warning: styles.warning,
                                    minlabel: styles.minlabel
                                }}
                            />
                            <FormInput
                                name="notificationTime"
                                type="time"
                                label="notification Time"
                                classes={{
                                    container: styles.componentInputContainer,
                                    input: styles.input,
                                    warning: styles.warning,
                                    minlabel: styles.minlabel
                                }}
                            />
                        </div>
                    </div>

                </Form>
            </Formik>
        </div>
    )
}

export default FormEvent