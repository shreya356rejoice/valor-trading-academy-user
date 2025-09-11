'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './telegramChannelDetails.module.scss';
import Button from '@/components/button';
import { getTelegramChannels } from '@/app/api/dashboard';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function TelegramChannelDetails() {
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    // const searchParams = useSearchParams();
    // const id = searchParams.get('id');

    const params = useParams();
    const id = params?.id;
    console.log("hellooooo", id);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const data = await getTelegramChannels(id);
                console.log(data, "===========data");

                if (data.payload && data.payload.data.length > 0) {
                    setChannel(data.payload.data[0]);
                }
            } catch (error) {
                console.error('Error fetching channel:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchChannel();
        }
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!channel) {
        return <div className={styles.notFound}>Channel not found</div>;
    }

    // Find the most discounted plan
    const mostDiscountedPlan = channel.telegramPlan.reduce((prev, current) =>
        (prev.discount > current.discount) ? prev : current
    );

    return (
        <div className={styles.algobotPage}>
            {/* <div className={styles.channelHeader}>
                <div className={styles.channelInfo}>
                    <h1>{channel.channelName}</h1>
                    <p className={styles.channelDescription}>{channel.description}</p>
                    <div className={styles.channelStats}>
                        <span className={styles.statItem}>
                            <i className="fas fa-users"></i> 5.2K Members
                        </span>
                        <span className={styles.statItem}>
                            <i className="fas fa-star"></i> 4.9 (1.2K Reviews)
                        </span>
                        <span className={styles.statItem}>
                            <i className="fas fa-bolt"></i> 98% Success Rate
                        </span>
                    </div>
                </div>
            </div> */}

            <div className={styles.algobotBanner}>
                <div>
                    <h1>
                        {channel.channelName}
                    </h1>
                    <p>
                        {channel.description}
                    </p>

                    <p className={styles.availablePlans}>Available Plans</p>
                </div>
                {/* <motion.div className={styles.searchbar} variants={itemVariants}>
                <input type='text' placeholder='Search for Course...' />
                <div className={styles.iconAlignment}>
                    <SearchIcon />
                </div>
            </motion.div> */}
            </div>

            <div className={styles.plansContainer}>
               
                <div className={styles.plansGrid}>
                    {channel.telegramPlan.map((plan) => (
                        <div key={plan._id} className={`${styles.planCard} ${plan.discount === mostDiscountedPlan.discount ? styles.highlighted : ''}`}>
                            {plan.discount > 0 && (
                                <div className={styles.discountBadge}>
                                    Save {plan.discount}%
                                </div>
                            )}
                            <h3>{plan.planType}</h3>
                            <div className={styles.priceContainer}>
                                <span className={styles.currentPrice}>${plan.price.toFixed(2)}</span>
                                {plan.discount > 0 && (
                                    <span className={styles.originalPrice}>${plan.initialPrice.toFixed(2)}</span>
                                )}
                            </div>
                            <ul className={styles.featuresList}>
                                <li>Access to all signals</li>
                                <li>24/7 Customer Support</li>
                                <li>Daily Market Analysis</li>
                                <li>Risk Management Tips</li>
                            </ul>
                            <Button
                                className={styles.subscribeButton}
                                onClick={() => { }}
                            >
                                Subscribe Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}