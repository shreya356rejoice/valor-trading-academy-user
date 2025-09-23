'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './herobanner.module.scss';
import ArrowIcon from '@/components/icons/arrowIcon';
import SearchIcon from '@/components/icons/searchIcon';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import { getCookie } from '../../../../cookie';
const MenImage = '/assets/images/men.png';
const DotsLine = '/assets/images/dots-line.svg';
const BottomVec = '/assets/images/bottom-vec.svg';
const ProfileGroup = '/assets/images/profile-group.svg';
const LempIcon = '/assets/images/lemp.svg';
const UnionIcon = '/assets/images/union.svg';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const floatingVariants = {
    float: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
        },
    },
};

export default function Herobanner() {
    const router = useRouter();
    const [user, setUser] = useState("");

    useEffect(() => {
        const user = getCookie("user");
        const userName = user && JSON.parse(user)?.name;
        setUser(userName);
    }, []);

    const handleNavigate = () => {
        if (user) {
            router.push('/courses')
        } else {
            router.push('/login')
        }
    }

    return (
        <div className={styles.herobanner}>
            <div className='container'>
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <motion.div className={styles.dotsLine} variants={floatingVariants} animate='float'>
                        <img src={DotsLine} alt='DotsLine' />
                    </motion.div>
                    <motion.div className={styles.bottomVec} variants={floatingVariants} animate='float'>
                        <img src={BottomVec} alt='BottomVec' />
                    </motion.div>
                    <motion.div className={styles.griditems} variants={containerVariants}>
                        <motion.div className={styles.iconText} variants={itemVariants}>
                            <ArrowIcon />
                            <span>Master Forex Trading</span>
                        </motion.div>
                        <motion.h1 variants={itemVariants}>
                            Master the Markets. Build a <span>Financial Future</span> That Lasts
                        </motion.h1>
                        <motion.div className={styles.text} variants={itemVariants}>
                            <p>
                                Live mentorship, expert-led courses, and a thriving trader community all in one platform.
                            </p>
                        </motion.div>
                        <motion.div className={styles.searchbar} variants={itemVariants}>
                            <input type='text' placeholder='Search for Course...' />
                            <div className={styles.iconAlignment}>
                                <SearchIcon />
                            </div>
                        </motion.div>
                        <motion.div className={styles.buttonAlignment} variants={itemVariants}>
                            <Button text='Explore Courses' fill onClick={handleNavigate} />
                            <Button text='Join Free Community' onClick={() => window.open('https://t.me/algomaticbot', '_blank')} />
                        </motion.div>
                    </motion.div>
                    <motion.div className={styles.griditems} variants={imageVariants}>
                        <motion.div className={styles.mainImage} variants={imageVariants}>
                            <img src={MenImage} alt='MenImage' />
                        </motion.div>
                        <motion.div className={styles.activeStudent} variants={itemVariants}>
                            <p>5,000+</p>
                            <span>Active Students</span>
                            <img src={ProfileGroup} alt='ProfileGroup' />
                        </motion.div>
                        <motion.div className={styles.satisfied} variants={itemVariants}>
                            <p>99%</p>
                            <span>Satisfied</span>
                        </motion.div>
                        <motion.div className={styles.profits} variants={itemVariants}>
                            <p>$2M+</p>
                            <span>Profits Generated</span>
                        </motion.div>
                        <motion.div className={styles.lempIcon} variants={floatingVariants} animate='float'>
                            <img src={LempIcon} alt='LempIcon' />
                        </motion.div>
                        <motion.div className={styles.unionIcon} variants={floatingVariants} animate='float'>
                            <img src={UnionIcon} alt='UnionIcon' />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

