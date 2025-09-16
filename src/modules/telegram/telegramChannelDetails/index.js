'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './telegramChannelDetails.module.scss';
import Button from '@/components/button';
import { getTelegramChannels } from '@/app/api/dashboard';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import dynamic from 'next/dynamic';
import RightArrow from '@/components/icons/rightArrow';

const YourSubscription = dynamic(() => import('../yourSubscription'), {
    ssr: false
});

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function TelegramChannelDetails() {
    const [channel, setChannel] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const params = useParams();
    const channelId = params?.id;

    const handleSubscribe = (plan) => {
        setSelectedPlan(plan);
        setShowSubscriptionDialog(true);
    };

    const handleCloseDialog = () => {
        setShowSubscriptionDialog(false);
        setSelectedPlan(null);
    };

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const data = await getTelegramChannels(channelId);

                if (data.payload && data.payload.data.length > 0) {
                    setChannel(data.payload.data[0]);
                }
            } catch (error) {
                console.error('Error fetching channel:', error);
            } finally {
                setLoading(false);
            }
        };

        if (channelId) {
            fetchChannel();
        }
    }, [channelId]);

    const TelegramChannelSkeleton = () => (
        <div className={styles.algobotPage}>
            <div className={styles.algobotBanner}>
                <div>
                    <Skeleton height={40} width="60%" style={{ marginBottom: '20px' }} />
                    <Skeleton count={3} style={{ marginBottom: '20px' }} />
                    <Skeleton height={20} width="30%" style={{ marginBottom: '30px' }} />
                </div>
            </div>
            <div className={styles.plansContainer}>
                <Skeleton height={30} width="20%" style={{ marginBottom: '20px' }} />
                <div className={styles.plansGrid}>
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className={styles.planCard}>
                            <Skeleton height={30} width="50%" style={{ marginBottom: '15px' }} />
                            <div style={{ margin: '20px 0' }}>
                                <Skeleton height={20} width="70%" style={{ marginBottom: '10px' }} />
                                <Skeleton height={20} width="60%" />
                            </div>
                            <Skeleton height={45} width="100%" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <TelegramChannelSkeleton />;
    }

    if (!channel) {
        return <div className={styles.algobotPage}>Channel not found</div>;
    }

    // Find the most discounted plan
    const mostDiscountedPlan = channel.telegramPlan.reduce((prev, current) =>
        (prev.discount > current.discount) ? prev : current
    );

    return (
        <div className={styles.algobotPage}>
            <div className={styles.breadcumbAlignment}>
                <a aria-label="Home" href="/dashboard">Home</a>
                <RightArrow />
                <a aria-label="Telegram Channels" href="/telegram">Telegram Channels</a>
            </div>

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
            </div>

            <div className={styles.plansContainer}>

                <div className={styles.plansGrid}>
                    {channel.telegramPlan.map((plan) => (
                        <div key={plan._id} className={styles.planCard}>
                            <div className={styles.planType}>
                                <h3>{plan.planType}</h3>
                                {plan.discount > 0 && (
                                    <span className={styles.originalPrice}>${plan.price.toFixed(2)}</span>
                                )}
                            </div>
                            <div className={styles.plandetails}>
                                <div className={styles.plandetailsflx}>
                                    <p>M.R.P :</p>
                                    <span>${plan.initialPrice.toFixed(2)}</span>
                                </div>
                                <div className={styles.plandetailsflx}>
                                    <p>Discount :</p>
                                    <span className={styles.discount}>-{plan.discount}%</span>
                                </div>
                            </div>
                            <Button 
                                text='Subscribe Now' 
                                fill='fill' 
                                onClick={() => handleSubscribe(plan)} 
                                disabled={false} 
                            />
                        </div>
                    ))}
                </div>
            </div>
            {showSubscriptionDialog && selectedPlan && (
                <YourSubscription 
                    plan={selectedPlan}
                    onClose={handleCloseDialog}
                    channel={channel}
                />
            )}
        </div>
    );
}