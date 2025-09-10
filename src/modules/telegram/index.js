import React from 'react'
import styles from './telegram.module.scss';
import TelegramBanner from './telegramBanner';
import TelegramDetails from './telegramDetails';

export default function Telegram() {
    return (
        <div className={styles.algobotPage}>
            <TelegramBanner />
            <TelegramDetails />
        </div>
    )
}