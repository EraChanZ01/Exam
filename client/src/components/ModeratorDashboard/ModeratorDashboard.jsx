import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getOffers } from '../../store/slices/offersSlice'
import CONSTANTS from '../../constants';
import styles from './ModeratorDashboard.module.sass'
import { confirmAlert } from 'react-confirm-alert';
import { setOfferModerStatus } from '../../store/slices/offersSlice';
import classNames from 'classnames';




const ModeratorDashboard = props => {

    useEffect(() => {
        getOffers(props.offers.data.length)
    }, [])

    const getOffers = (startFrom) => {
        props.getOffers({
            limit: 3,
            offset: startFrom
        })
    }

    const resolveOffer = (userId, offerId, contestId) => {
        confirmAlert({
            title: 'confirm',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        props.setOfferModerStatus({ creatorId: userId, offerId, status: 'resolve', contestId }),
                },
                {
                    label: 'No',
                },
            ],
        });
    }

    const rejectOffer = (userId, offerId, contestId) => {
        confirmAlert({
            title: 'confirm',
            message: 'Are u sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        props.setOfferModerStatus({ creatorId: userId, offerId, status: 'rejected', contestId }),
                },
                {
                    label: 'No',
                },
            ],
        });
    }
    const offerStatus = (status) => {
        if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
            return (
                <i className={classNames('fas fa-times-circle reject', styles.reject)} />
            );
        }
        if (status === CONSTANTS.OFFER_STATUS_RESOLVE) {
            return (<i className={classNames('fas fa-check-circle resolve', styles.resolve)} />
            );
        }
        return null;
    };

    const renderOffers = () => {
        return props.offers.data.map((offer, index) => {
            const { User: { firstName, lastName, displayName, avatar, email } } = offer
            return (
                <div className={styles.sectionOffer} key={index}>
                    {offerStatus(offer.status)}
                    <div className={styles.containerHeader}>
                        <div className={styles.containerUser}>
                            <img src={`${CONSTANTS.publicURL}${avatar}`} />
                            <div className={styles.addInfoUser}>
                                <div className={styles.firstName}>{firstName}<span className={styles.lastName}>{lastName}</span></div>
                                <div className={styles.email}>{email}</div>
                            </div>
                        </div>
                        {offer.text ? <div className={styles.offer}>{offer.text}</div> : <img className={styles.offer} src={`${CONSTANTS.publicURL}${offer.fileName}`} />}
                        <div></div>
                    </div>
                    <div className={styles.btnsContainer}>
                        <div onClick={() => resolveOffer(offer.userId, offer.id, offer.contestId)} className={styles.resolveBtn}>
                            Resolve
                        </div>
                        <div onClick={() => rejectOffer(offer.userId, offer.id, offer.contestId)} className={styles.rejectBtn}>
                            Reject
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={styles.moderatorDashboard}>

            <>
                <div className={styles.filter}>

                </div>
                <div className={styles.containerOffers}>
                    {renderOffers()}
                    <button onClick={() => getOffers(props.offers.data.length)}>More</button>
                </div>
            </>

        </div>
    )
}

const mapStateToProps = (state) => {
    const { offers } = state;
    return { offers };
};

const mapDispatchToProps = (dispatch) => ({
    getOffers: (data) => dispatch(getOffers(data)),
    setOfferModerStatus: (data) => dispatch(setOfferModerStatus(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard) 