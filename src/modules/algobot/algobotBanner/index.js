'use client'
import { motion } from 'framer-motion';
import React from 'react'
import styles from './algobotBanner.module.scss';
import SearchIcon from '@/components/icons/searchIcon';
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};
export default function AlgobotBanner() {
    return (
        <div className={styles.algobotBanner}>
            <div>
                <h1>
                    AlgoBot <span>Marketplace</span>
                </h1>
                <p>
                    Automate your trading with professionally developed algorithmic trading bots
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

