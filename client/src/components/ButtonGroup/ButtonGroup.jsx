import React from "react";
import CONSTANTS from '../../constants';
import styles from './ButtonGroup.module.sass'
import ButtonComponent from './ButtonComponent/ButtonComponent'


const ButtonGroup = () => {

    return (
        <div className={styles.buttonGroup}>
            <div className={styles.title}>
                How do you want your contest to be managed?
            </div>
            <div className={styles.container}>
                <ButtonComponent icon="contest-icon1.svg" titleName="Do it Yourself" info="Hundreds of custom name suggestions for your business." price="Starts at $299" value="self" />
                <ButtonComponent icon="contest-icon2.svg" titleName="Squadhelp Managed" info="A full agency experience without the agency price tag." price="Starts at $1,499" value="squadhelp" />
            </div>
        </div>
    )
}

export default ButtonGroup