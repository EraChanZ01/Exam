import React from "react";
import QuestionsCards from "../QuestionsCards/QuestionsCards"
import CONSTANTS from '../../../constants';
import styles from './ContainerQuestions.module.sass'


const ContainerQuestions = props => {
    const { HowItWorks: { questionsCardsItem } } = CONSTANTS

    const createQuestionCards = () => {
        const newQuestionsCards = []
        Object.keys(questionsCardsItem).forEach((key) => {
            newQuestionsCards.push([...questionsCardsItem[key]])
        })
        return (
            newQuestionsCards.map((item, index) => (
                <div key={index} className={`${styles.mainBlockQuestion} BlockQuestion-${index}`}>
                    <div className={styles.placeTitle}>
                        <h1 className={styles.questionTitle}>{item[0]}</h1>
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
                    <p>Launching A Contest</p>
                    <p>Buying From Marketplace</p>
                    <p>Managed Contests</p>
                    <p>For Creatives</p>
                </div>
            </div>
            <div className={styles.placeQuestion}>
                {createQuestionCards()}
            </div>
        </div>
    )
}

export default ContainerQuestions