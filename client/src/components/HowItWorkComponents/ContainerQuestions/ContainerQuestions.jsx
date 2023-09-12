import React from "react";
import QuestionsCards from "../QuestionsCards/QuestionsCards"
import CONSTANTS from '../../../constants';
import styles from './ContainerQuestions.module.sass'


const ContainerQuestions = props => {
    const { HowItWorks: { questionsCardsItem } } = CONSTANTS

    const handelClick = (id) => {
        const element = document.getElementById(id)
        window.scrollTo(0, element.offsetTop)
    }

    const createQuestionCards = () => {
        const newQuestionsCards = []
        Object.keys(questionsCardsItem).forEach((key) => {
            newQuestionsCards.push([...questionsCardsItem[key]])
        })
        return (
            newQuestionsCards.map((item, index) => (
                <div key={index} className={`${styles.mainBlockQuestion} BlockQuestion-${index}`} id={index}>
                    <div className={styles.placeTitle} >
                        <p className={styles.questionTitle}>{item[0]}</p>
                    </div>
                    <div className={styles.relatedQuestions}>
                        {
                            item.map((element, ind) => {
                                if (ind === 0) {
                                    return null;
                                }
                                return <QuestionsCards question={element.question} key={ind} answer={element.answer} id={`${index}-${ind}`} />
                            }
                            )
                        }
                    </div>
                </div>
            ))
        )
    }


    return (
        <div className={styles["container-4"]}>
            <div className={styles.placeBoard}>
                <div className={styles.board}>
                    <p onClick={() => handelClick(0)}>Launching A Contest</p>
                    <p onClick={() => handelClick(1)}>Buying From Marketplace</p>
                    <p onClick={() => handelClick(2)}>Managed Contests</p>
                    <p onClick={() => handelClick(3)}>For Creatives</p>
                </div>
            </div>
            <div className={styles.placeQuestion}>
                {createQuestionCards()}
            </div>
        </div>
    )
}

export default ContainerQuestions