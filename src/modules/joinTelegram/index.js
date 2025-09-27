import React from 'react'
import styles from './joinTelegram.module.scss';
import CommonBanner from '@/components/commonBanner';
import TelegramChannelDetails from './telegramChannelDetails';

export default function JoinTelegram() {
    return (
        <div className={styles.algobotPage}>
            <CommonBanner title='EduFins Forex Telegram Channel' description='Get instant forex signals, expert insights, and daily trading tips — all delivered straight to your Telegram. Perfect for traders on the go.' />
            <TelegramChannelDetails />
        </div>
    )
}
