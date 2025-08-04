'use client'
import React from 'react';
import { motion } from 'framer-motion';
import styles from './chooseYourPath.module.scss';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import ClockIcon from '@/components/icons/clockIcon';
import Button from '@/components/button';
const CardImage = '/assets/images/card3.png';
const TopLayer = '/assets/images/top-layer.svg';
export default function ChooseYourPath() {
    return (
        <>
        <div className={styles.chooseYourPath}>
            <div className='container-lg'>
                <div className={styles.box}>
                    <div className={styles.title}>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>Choose Your Path to <span>Financial Freedom</span></motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                            Live Classes. Recorded Lessons.
                            Offline Seminars.
                        </motion.p>
                    </div>
                    <div className={styles.tabCenteralignment}>
                        <div className={styles.tab}>
                            <button aria-label='On demand courses' className={styles.active}>On demand courses</button>
                            <button aria-label='Live Online Courses'>Live Online Courses</button>
                            <button aria-label='In-Person Courses'>In-Person Courses</button>
                        </div>
                    </div>
                    <motion.div className={styles.grid} variants={{ visible: { transition: { staggerChildren: 0.3 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {
                            [...Array(3)].map((_, i) => {
                                return (
                                    <motion.div className={styles.griditems} key={i} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                                        <div className={styles.image}>
                                            <img src={CardImage} alt='CardImage' />
                                        </div>
                                        <div className={styles.details}>
                                            <h3>Crypto Currency for Beginners</h3>
                                            <div className={styles.allIconTextAlignment}>
                                                <div className={styles.iconText}>
                                                    <StarIcon />
                                                    <span>4.8</span>
                                                </div>
                                                <div className={styles.iconText}>
                                                    <ProfileIcon />
                                                    <span>1234</span>
                                                </div>
                                                <div className={styles.iconText}>
                                                    <ClockIcon />
                                                    <span>12 hours</span>
                                                </div>
                                            </div>
                                            <div className={styles.textButtonAlignment}>
                                                <h4>₹785</h4>
                                                <button aria-label='Beginner Level'>
                                                    <span>Beginner Level</span>
                                                </button>
                                            </div>
                                            <div className={styles.btnwidth}>
                                                <Button text="Enroll Now" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        }
                    </motion.div>
                </div>
            </div>
        </div>
        <div className={styles.toplayer}>
            <img src={TopLayer} alt='TopLayer'/>
        </div>
        </>
    )
}
