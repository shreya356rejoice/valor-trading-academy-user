'use client'

import React from 'react'
import styles from './joinPrivate.module.scss'
import Button from '@/components/button'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const BottomLayer = '/assets/images/bottom-layer.svg'
const ProfileImage = '/assets/images/profile-sm.png'
const GrowthIcon = '/assets/icons/growth.svg'

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function JoinPrivate() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
    const animationControls = useAnimation()

    React.useEffect(() => {
        if (inView) {
            animationControls.start('visible')
        }
    }, [inView, animationControls])

    return (
        <>
            <div className={styles.joinPrivate} ref={ref}>
                <div className='container'>
                    <motion.div
                        className={styles.title}
                        initial="hidden"
                        animate={animationControls}
                        variants={titleVariants}
                    >
                        <h2>Join Private Telegram Communities</h2>
                        <p>
                            Connect with experts and peers for daily insights, trade setups, and support.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.grid}
                        variants={containerVariants}
                        initial="hidden"
                        animate={animationControls}
                    >
                        {[...Array(3)].map((_, index) => (
                            <motion.div
                                key={index}
                                className={styles.griditems}
                                variants={cardVariants}
                            >
                                <div className={styles.cardHeaderAlignment}>
                                    <button>
                                        <span>Free</span>
                                    </button>
                                    <img src={GrowthIcon} alt='GrowthIcon' />
                                </div>
                                <div className={styles.details}>
                                    <h3>Intraday Calls</h3>
                                </div>
                                <div className={styles.imageTextAlignment}>
                                    <div className={styles.image}>
                                        <img src={ProfileImage} alt='ProfileImage' />
                                        <img src={ProfileImage} alt='ProfileImage' />
                                        <div className={styles.plus}>
                                            <span>+</span>
                                        </div>
                                    </div>
                                    <span>12.5k members</span>
                                </div>
                                <div className={styles.listContent}>
                                    <ul>
                                        <li>Daily market insights</li>
                                        <li>Live trade calls</li>
                                        <li>Community support</li>
                                    </ul>
                                </div>
                                <div className={styles.cardFooteralignment}>
                                    <span>Free Access</span>
                                    <Button text='Join Now' fill />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className={styles.bottomlayer}>
                <img src={BottomLayer} alt='BottomLayer' />
            </div>
        </>
    )
}
