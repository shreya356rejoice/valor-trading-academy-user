'use client'

import React, { useEffect, useState } from 'react'
import styles from './joinPrivate.module.scss'
import Button from '@/components/button'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import { getTelegramChannels } from '@/app/api/dashboard'

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

    const [telegramChannels, setTelegramChannels] = useState([]);
    const router = useRouter()

    useEffect(() => {
        const fetchTelegramChannels = async () => {
            try {
                const response = await getTelegramChannels();
                setTelegramChannels(response.payload.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchTelegramChannels();
    }, []);

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
                        animate={inView ? 'visible' : 'hidden'}
                    >
                        {telegramChannels?.length > 0 && telegramChannels?.slice(0, 3).map((channel, i) => {
                            return (
                                <motion.div
                                    key={channel._id || i}
                                    className={styles.griditems}
                                    variants={cardVariants}
                                >
                                    <div className={styles.cardHeaderAlignment}>
                                        <h3>{channel?.channelName}</h3>
                                        <img src={GrowthIcon} alt='GrowthIcon' />
                                    </div>
                                    <div className={styles.listContent}>
                                        <p>{channel?.description}</p>
                                    </div>
                                    <div className={styles.pricingSection}>
                                        {channel.telegramPlan?.map((plan, planIndex) => (
                                            <div key={planIndex} className={styles.priceCard}>
                                                <div className={styles.priceHeader}>
                                                    <span className={styles.price}>${plan.price}</span>
                                                </div>
                                                <div className={styles.priceSubtitle}>
                                                    <span>{plan.planType}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.cardFooteralignment}>
                                        <Button text='Join Now' fill onClick={() => router.push(`/join-telegram-channel?telegramId=${channel._id}`)} />
                                    </div>
                                </motion.div>
                            )
                        }
                        )
                        }
                    </motion.div>
                </div>
            </div>

            <div className={styles.bottomlayer}>
                <img src={BottomLayer} alt='BottomLayer' />
            </div>
        </>
    )
}
