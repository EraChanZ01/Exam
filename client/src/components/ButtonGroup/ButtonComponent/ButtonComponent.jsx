import React from "react"
import styles from './ButtonComponent.module.sass'



const ButtonComponent = (icon, titleName, info, price, value) => {

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

export default ButtonComponent