import React from 'react'
import AlgobotBanner from './algobotBanner'
import styles from './algobot.module.scss';
import AlgobotDetails from './algobotDetails';
export default function Algobot() {
    return (
        <div className={styles.algobotPage}>
            <AlgobotBanner />
            <AlgobotDetails />
        </div>
    )
}
