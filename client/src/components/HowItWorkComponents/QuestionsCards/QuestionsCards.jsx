import React, { useEffect, useState } from "react"
import styles from "./QuestionsCards.module.sass"


const QuestionsCards = ({ question, answer, id }) => {
    const handleClick = ({ target }) => {
        let ourContent = document.getElementById(id)
        document.querySelectorAll(`.${styles.cardSection}`).forEach(el => el.style.maxHeight = null)
        document.querySelectorAll(`.${styles.small}`).forEach(el => el.style.transform = "rotate(0deg)")
        if (!ourContent.style.maxHeight) {
            document.getElementById(`small${id}`).style.transform = "rotate(90deg)"
            ourContent.style.maxHeight = ourContent.scrollHeight + 'px'
        }
    }
    const renderAnswer = () => {
        if (answer instanceof Array) {
            return (
                <>
                    {answer.map((el, index) => <p key={index + 'A'}>{el}</p>)}
                </>
            )
        }
        if (answer instanceof Object) {
            return (
                <>
                    <p>{answer.title}</p>
                    <ul className={styles.listAnswer}>
                        {answer.value.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </>
            )
        }

        return answer
    }
    return (
        <div className={styles.card} key={id} onClick={handleClick}>
            <div className={styles.Question}>
                <button className={styles.cardButton} >{question}</button>
                <span className={`fas fa-arrow-right ${styles.small}`} id={`small${id}`}></span>
            </div>
            <div className={styles.cardSection} id={id}>
                <div className={styles.cardBody}>
                    {renderAnswer()}
                </div>
            </div>
        </div>
    )

}

export default QuestionsCards