import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import BundleBox from "../BundleBox/BundleBox"
import { updateBundle } from '../../store/slices/bundleSlice';
import CONSTANTS from "../../constants"

const CustomerEvents = ({ renderEvent, history, classes, choseBundle, renderTimeAndStyle }) => {

    const setBundle = bundleStr => {
        const array = bundleStr.toLowerCase().split('+');
        const bundleList = {};
        bundleList.first = array[0];
        for (let i = 0; i < array.length; i++) {
            bundleList[array[i]] = i === array.length - 1 ? 'payment' : array[i + 1];
        }
        choseBundle(bundleList);
        history.push(`/events/${bundleList.first}Event`);
    }

    return (
        <div className={classes.eventContainer}>
            <div className={classes.frameBundle}>
                <BundleBox
                    path={['Name.png']}
                    header='Name'
                    describe='Get up and running with the perfect name.'
                    setBundle={setBundle}
                />
                <BundleBox
                    path={['Logo.png']}
                    header='Logo'
                    describe='Kickstart your venture with a unique, memorable logo.'
                    setBundle={setBundle}
                />
                <BundleBox
                    path={['Tagline.png']}
                    header='Tagline'
                    describe='Connect deeply with your target audience with an on-target tagline.'
                    setBundle={setBundle}
                />
            </div>
            <div className={classes.eventBox}>
                <div className={classes.eventHeader}>
                    <h1>Event List</h1>
                    <p>Remaining time<img src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}/></p>
                </div>
                <div className={classes.eventList}>
                    {renderEvent()}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    const { bundleStore, userStore, eventStore } = state;
    return { bundleStore, userStore, eventStore };
};

const mapDispatchToProps = dispatch => ({
    choseBundle: bundle => dispatch(updateBundle(bundle)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CustomerEvents);