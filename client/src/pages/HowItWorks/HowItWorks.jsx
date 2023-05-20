import React from "react";
import styles from './HowItWorks.module.sass';
import Header from '../../components/Header/Header';
import ContainerQuestions from "../../components/HowItWorkComponents/ContainerQuestions/ContainerQuestions"
import CONSTANTS from '../../constants';
import Footer from '../../components/Footer/Footer'
import ContainerWays from '../../components/HowItWorkComponents/ContainerWays/ContainerWays'



const HowItWorks = props => {

    const renderRulesContestsNaming = () => {
        const arrayRules = [
            "Fill out your Naming Brief and begin receiving name ideas in minutes",
            "Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.",
            "Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.",
            "Pick a Winner. The winner gets paid for their submission."
        ]
        for (let i = 0; i < arrayRules.length; i++) {
            let additional
            if (i == 0) {
                additional = "startRule"
            }
            if (i > 0 && i < arrayRules.length - 1) {
                additional = "centerRule"
            }
            if (i == arrayRules.length - 1) {
                additional = "endRule"
            }
            arrayRules[i] = (
                <li className={`${styles.ruleBlock} ${styles[additional]}`} key={i}>
                    <div className={styles.media}>
                        <span className={styles.ruleNumber}>{i + 1 + '.'}</span>
                        <span className={styles.ruleInfo}>{arrayRules[i]}</span>
                    </div>
                </li>
            )
        }
        return arrayRules
    }

    return (
        <div>
            <Header />
            <div className={styles["container-1"]}>
                <div className={styles.partText}>
                    <span className={styles.title}>World's #1 Naming Platform</span>
                    <div className={styles.mainBlock}>
                        <h1 className={styles.headline}>How Does Squadhelp Work?</h1>
                        <div className={styles.text}>Squadhelp helps you come up with a great name for your business by combining the power of
                            crowdsourcing with sophisticated technology and Agency-level validation services.
                        </div>
                    </div>
                    <button className={styles.button}>
                        <div className={`fas fa-play ${styles.buttonIcon}`}>

                        </div>
                        Play Video
                    </button>
                </div>
                <div className={styles.partImage}>
                    <img
                        src={`${CONSTANTS.STATIC_IMAGES_PATH}app-user.png`}
                        alt='image user phone'
                    />
                </div>
            </div>
            <ContainerWays />
            <div className={styles["container-3"]}>
                <div className={styles.titleBlock}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}cup.png`} />
                    <h1 className={styles.tagLine}>How Do Naming Contests Work?</h1>
                </div>
                <div className={styles.sectionRules}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}user1.png`} />
                    <div className={styles.mainBlockRules}>
                        <ul className={styles.wrapRules}>
                            {renderRulesContestsNaming()}
                        </ul>
                    </div>
                </div>
            </div>
            <ContainerQuestions />
            <div className={styles.borderStart}>
                <div className={styles.borderInfo}>
                    <h1>Ready to get started?</h1>
                    <p>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
                    <button className={styles.borderButton}>Start A Contest</button>
                </div>
                <img className={styles.figureOne} src={`${CONSTANTS.STATIC_IMAGES_PATH}figure-1.png`} />
                <img className={styles.figureTwo} src={`${CONSTANTS.STATIC_IMAGES_PATH}figure-2.png`} />
            </div>
            <div className={styles.containerAchiev}>
                <div className={styles.achiev}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.svg`} />
                    <span><p>4.9 out of 5 stars </p>from 25,000+ customers.</span>
                </div>
                <div className={`${styles.achiev} ${styles.achievCenter}`}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}img222.webp`} />
                    <span>Our branding community stands <p>200,000+</p> strong.</span>
                </div>
                <div className={styles.achiev}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.svg`} />
                    <span><p>140+ Industries </p>supported across more than <p>85 countries </p>– and counting.</span>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HowItWorks