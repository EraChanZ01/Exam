import styles from "./ContainerWays.module.sass"
import React from "react"
import CONSTANTS from '../../../constants';


const ContainerWays = () => {

    const renderCards = () => {
        const arrayCards = [{
            img: "injected.png",
            tagLine: "Launch a Contest",
            text: "Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.",
            buttonText: "Launch a Contest"
        }, {
            img: "write.png",
            tagLine: "Explore Names For Sale",
            text: "Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design",
            buttonText: "Explore Names For Sale"
        }, {
            img: "bulb.png",
            tagLine: "Agency-level Managed Contests",
            text: "Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs",
            buttonText: "Learn More"
        }]
        for (let i = 0; i < arrayCards.length; i++) {
            arrayCards[i] = (
                <div className={styles.card} key={i}>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}${arrayCards[i].img}`} alt="" />
                    <div className={styles.sectionInfo}>
                        <h1 className={styles.tagLine}>{arrayCards[i].tagLine}</h1>
                        <p className={styles.text}>{arrayCards[i].text}</p>
                    </div>
                    <button className={styles.buttonCards}>
                        {arrayCards[i].buttonText}
                    </button>
                </div>
            )
        }
        return arrayCards
    }

    return (
        <div className={styles["container-2"]}>
            <div className={styles.blockTitle}>
                <span className={styles["title-1"]}>Our Services</span>
                <h1 className={styles["title-2"]}>3 Ways To Use Squadhelp</h1>
                <p className={styles["title-3"]}>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
            </div>
            <div className={styles.mainBlockCards}>
                {renderCards()}
            </div>
        </div>
    )
}

export default ContainerWays