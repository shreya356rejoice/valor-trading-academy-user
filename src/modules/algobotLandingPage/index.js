import React from 'react'
import CommonBanner from '@/components/commonBanner'
import AlgobotDetails from './algobotDetails'
import styles from './algobotLandingPage.module.scss'
export default function AlgobotLandingPage() {
    return (
        <div className={styles.algobotPage}>
            <div>
                <CommonBanner title='AlgoBots' description='Leverage the power of automation with our intelligent AlgoBot, designed to assist you in making data-driven trading decisions. This smart tool analyzes market trends, executes strategies, and manages trades based on predefined rules — all in real time. Perfect for traders who value efficiency, consistency, and the ability to act without emotional bias, AlgoBot helps you streamline your trading while minimizing manual effort.' />
                <div className='container'>

                    <AlgobotDetails />
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>EduFins Academy</h3>
            </div>
        </div>
    )
}