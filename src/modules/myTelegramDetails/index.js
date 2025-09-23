'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './myTelegramDetails.module.scss';
import Button from '@/components/button';
import { getTelegramChannels } from '@/app/api/dashboard';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import dynamic from 'next/dynamic';
import RightArrow from '@/components/icons/rightArrow';
import YourSubscription from '../telegram/yourSubscription';

const calculateEndDate = (startDate, planType) => {
    if (!startDate || !planType) return '-';
    
    const date = new Date(startDate);
    const planTypeStr = String(planType).toLowerCase();
    
    const monthsMatch = planTypeStr.match(/(\d+)/);
    if (!monthsMatch) return '-';
    
    const months = parseInt(monthsMatch[1], 10);
    if (isNaN(months)) return '-';
    
    date.setMonth(date.getMonth() + months);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function MyTelegramDetails() {
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

                console.log("data--------", data.payload);

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
                <a aria-label="My Courses" href="/my-courses">My Courses</a>
            </div>

            <div className={styles.algobotBanner}>
                <div>
                    <h1>
                        {channel.channelName}
                    </h1>
                    <p>
                        {channel.description}
                    </p>

                    <h4 className={styles.availablePlans}>Available Plans</h4>
                </div>
            </div>

            <div className={styles.plansContainer}>
                <div className={styles.plansGrid}>
                    {channel.telegramPlan
                        .slice()
                        .sort((a, b) => {
                            const getMonths = (planType) => {
                                if (typeof planType !== 'string') return 0;
                                const planStr = planType.toLowerCase();
                                if (planStr.includes('month')) {
                                    return parseInt(planStr);
                                }
                                if (planStr.includes('year')) {
                                    return parseInt(planStr) * 12;
                                }
                                return 0;
                            };
                            return getMonths(a.planType) - getMonths(b.planType);
                        })
                        .map((plan) => (
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
                                {plan?.isPayment ? (<Button
                                    text='Subscribed'
                                    fill='fill'
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={false}
                                />) : (<Button
                                    text='Subscribe Now'
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={false}
                                />)}

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

            <div className={styles.planTable}>
                <h4 className={styles.availablePlans}>Subscribed Channel</h4>
                <div className={styles.paymentTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Telegram User ID</th>
                                <th>Plan Type</th>
                                <th>Purchase Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {channel.telegramPlan?.flatMap(plan => 
                                plan.payment?.map((payment, index) => (
                                    <tr key={`${plan._id}-${index}`}>
                                        <td>{payment.telegramAccountNo || '-'}</td>
                                        <td>{plan.planType}</td>
                                        <td>{formatDate(payment.createdAt)}</td>
                                        <td>{
                                            payment.createdAt && plan.planType 
                                                ? calculateEndDate(payment.createdAt, plan.planType) 
                                                : '-'
                                        }</td>
                                    </tr>
                                ))
                            ) || (
                                <tr>
                                    <td colSpan="4" className={styles.noData}>No subscription data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}