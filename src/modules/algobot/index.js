import React from 'react'
import AlgobotBanner from './algobotBanner'
import styles from './algobot.module.scss';
export default function Algobot() {
    return (
        <div className={styles.algobotPage}>
            <AlgobotBanner />
        </div>
    )
}
