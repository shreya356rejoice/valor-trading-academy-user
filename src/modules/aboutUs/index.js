import React from 'react'
import styles from './aboutUs.module.scss';
import CommonBanner from '@/components/commonBanner';
import TradingAcademy from '../home/tradingAcademy';
import AboutUsDetails from '../home/aboutdetails';

export default function AboutUs() {
    return (
        <div className={styles.algobotPage}>
            <CommonBanner title='About EduFins Trading Academy' description='EduFins Trading Academy is your one-stop solution for forex success. We offer an advanced AlgoBot, expert-led forex courses (recorded, live, or in-person), and a premium Telegram channel. Learn, automate, and grow your trading skills—all in one place. Easy online purchases make it simple to get started today.' />
            <AboutUsDetails />
            <div className='tradingacademy'><TradingAcademy /></div>
            <div className={styles.valorText}>
                <h3>EduFins Academy</h3>
            </div>
        </div>
    )
}
