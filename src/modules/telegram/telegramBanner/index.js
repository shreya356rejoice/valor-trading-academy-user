'use client'
import { motion } from 'framer-motion';
import React from 'react'
import styles from './telegramBanner.module.scss';
import SearchIcon from '@/components/icons/searchIcon';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function TelegramBanner() {
    return (
        <div className={styles.algobotBanner}>
            <div>
                <h1>
                Telegram <span>Marketplace</span>
                </h1>
                <p>
                Discover, buy, and sell trading bots, tools, and services directly through Telegram.
                </p>
            </div>
            <motion.div className={styles.searchbar} variants={itemVariants}>
                <input type='text' placeholder='Search for Course...' />
                <div className={styles.iconAlignment}>
                    <SearchIcon />
                </div>
            </motion.div>
        </div>
    )
}