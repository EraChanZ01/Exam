import React from "react";
import CONSTANTS from '../../constants';
import styles from './ButtonGroup.module.sass'


const ButtonGroup = () => {

    const renderButton = (icon, titleName, info, price, value) => {

        const handleClick = ({ target }) => {
            const arrayElement = [...document.querySelectorAll(`.${styles.contestBox}`)].forEach(el => el.classList.remove(`${styles.contestBoxClick}`))
            const arrayParentElement = [...document.querySelectorAll(`.${styles.button}`)].forEach(el => el.style.border = "1px solid rgb(219, 219, 219)")
            target.nextElementSibling.classList.add(`${styles.contestBoxClick}`)
            target.parentNode.parentNode.style.border = "1px solid rgb(74, 74, 255)"
        }

        return (
            <div className={styles.button}>
                <label>
                    <input type="radio" value={value} onClick={(e) => handleClick(e)} />
                    <div className={styles.contestBox}>
                        <div className={styles.icon}>
                            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}${icon}`} />
                        </div>
                        <h1>{titleName}</h1>
                        <p>{info}</p>
                        <span>{price}</span>
                    </div>
                </label>
            </div>
        )
    }

    return (
        <div className={styles.buttonGroup}>
            <div className={styles.title}>
                How do you want your contest to be managed?
            </div>
            <div className={styles.container}>
                {renderButton("contest-icon1.svg", "Do it Yourself", "Hundreds of custom name suggestions for your business.", "Starts at $299", "self")}
                {renderButton("contest-icon2.svg", "Squadhelp Managed", "A full agency experience without the agency price tag.", "Starts at $1,499", "squadhelp")}
            </div>
        </div>
    )
}

export default ButtonGroup