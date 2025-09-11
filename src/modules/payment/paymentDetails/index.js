'use client'
import React, { useEffect, useState } from 'react'
import styles from './paymentDetails.module.scss';
import Button from '@/components/button';
import Pagination from '@/components/pagination';


import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getPurchasedCourses } from '@/app/api/algobot';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';

const ITEMS_PER_PAGE = 4;

const TABS = {
    All: 'All Payments',
    COURSES: 'Course Sales',
    BOTS: 'Bots Sales',
    TELEGRAM: 'Telegram Sales',
};

export default function PaymentDetails() {
    const [selectedTab, setSelectedTab] = useState('RECORDED');
    const [purchasedCourses, setPurchasedCourses] = useState({
        RECORDED: [],
        LIVE: [],
        PHYSICAL: [],
        BOTS: [],
        TELEGRAM: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const fetchPurchasedCourses = async () => {
        try {
            setIsLoading(true);
            const response = await getPurchasedCourses();

            if (response?.success && response.payload) {
                setPurchasedCourses({
                    RECORDED: response.payload.RECORDED || [],
                    LIVE: response.payload.LIVE || [],
                    PHYSICAL: response.payload.PHYSICAL || [],
                    BOTS: response.payload.BOTS || [],
                    TELEGRAM: response.payload.TELEGRAM || []
                });
            }
        } catch (error) {
            console.error('Error fetching purchased courses:', error);
            setError('Failed to load purchased courses. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchasedCourses();
    }, []);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const renderSkeleton = () => {
        return Array(4).fill(0).map((_, index) => (
            <div className={styles.griditems} key={`skeleton-${index}`}>
                <div className={styles.image}>
                    <Skeleton height={180} style={{ display: 'block', borderRadius: '10px' }} />
                </div>
                <div className={styles.details} style={{ padding: '0px' }}>
                    <h3><Skeleton width="80%" /></h3>
                    <p><Skeleton count={2} /></p>
                    <div className={styles.pricingSection}>
                        <div className={styles.priceCard}>
                            <Skeleton height={80} width="100%" />
                        </div>
                    </div>
                    <Skeleton height={40} width={150} style={{ marginTop: '10px', borderRadius: '40px' }} />
                </div>
            </div>
        ));
    };

    const EmptyState = () => (
        <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
                <div className={styles.emptyIllustration}>
                    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M90 15C50.5 15 17.5 48 17.5 87.5C17.5 127 50.5 160 90 160C129.5 160 162.5 127 162.5 87.5C162.5 48 129.5 15 90 15ZM90 147.5C56.5 147.5 30 121 30 87.5C30 54 56.5 27.5 90 27.5C123.5 27.5 150 54 150 87.5C150 121 123.5 147.5 90 147.5Z" fill="#E5E7EB" />
                        <path d="M112.5 72.5H100V60C100 55 96 50 90 50C84 50 80 55 80 60V72.5H67.5C62.5 72.5 57.5 76.5 57.5 82.5C57.5 88.5 62.5 92.5 67.5 92.5H80V105C80 110 84 115 90 115C96 115 100 110 100 105V92.5H112.5C117.5 92.5 122.5 88.5 122.5 82.5C122.5 76.5 117.5 72.5 112.5 72.5ZM97.5 82.5V105C97.5 107.8 94.3 110 90 110C85.7 110 82.5 107.8 82.5 105V82.5H67.5C65.7 82.5 62.5 81.3 62.5 77.5C62.5 73.7 65.7 72.5 67.5 72.5H82.5V60C82.5 57.2 85.7 55 90 55C94.3 55 97.5 57.2 97.5 60V72.5H112.5C114.3 72.5 117.5 73.7 117.5 77.5C117.5 81.3 114.3 82.5 112.5 82.5H97.5Z" fill="#9CA3AF" />
                    </svg>
                </div>
                <h3>No {TABS[selectedTab]?.toLowerCase() || 'items'} found</h3>
                <p>You haven't purchased any {TABS[selectedTab]?.toLowerCase() || 'items'} yet.</p>
            </div>
        </div>
    );

    const renderCourseCard = (item) => {
        const isCourse = !!item.courseId;
        const isBot = !!item.botId;
        const isTelegram = !!item.telegramId;

        const title = isCourse ? item.courseId?.CourseName :
            isBot ? item.botId?.strategyId?.title :
                isTelegram ? item.telegramId?.telegramId?.channelName : 'N/A';

        const description = isCourse ? item.courseId?.description :
            isBot ? item.botId?.strategyId?.shortDescription :
                isTelegram ? item.telegramId?.telegramId?.description : '';

        const imageUrl = isCourse ? item.courseId?.courseVideo :
            isBot ? item.botId?.strategyId?.imageUrl :
                isTelegram ? '/assets/images/telegram-placeholder.jpg' : '';

        const price = parseFloat(item.price || 0).toFixed(2);
        const initialPrice = isBot ? item.botId?.initialPrice :
            isTelegram ? item.telegramId?.initialPrice :
                item.courseId?.price;
        const discount = isBot ? item.botId?.discount :
            isTelegram ? item.telegramId?.discount :
                0;

        return (
            <div className={styles.griditems} key={item._id}>
                {imageUrl && (
                    <div className={styles.image}>
                        <img
                            src={imageUrl}
                            alt={title}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/images/placeholder.jpg';
                            }}
                        />
                    </div>
                )}
                <div className={styles.details}>
                    <h3>{title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: description?.substring(0, 150) + '...' }} />

                    <div className={styles.pricingSection}>
                        <div className={styles.priceCard}>
                            <div className={styles.priceSubtitle}>
                                <span>Plan Type:</span>
                                <span>{item.planType || 'N/A'}</span>
                            </div>
                            <div className={styles.priceSubtitle}>
                                <span>Price:</span>
                                <span className={styles.price}>${price}</span>
                            </div>
                            {initialPrice > 0 && (
                                <div className={styles.priceSubtitle}>
                                    <span>Initial Price:</span>
                                    <span className={styles.originalPrice}>${initialPrice}</span>
                                </div>
                            )}
                            {discount > 0 && (
                                <div className={styles.priceSubtitle}>
                                    <span>Discount:</span>
                                    <span>{discount}%</span>
                                </div>
                            )}
                            <div className={styles.priceSubtitle}>
                                <span>Purchased On:</span>
                                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        text={isCourse ? 'View Course' : isBot ? 'View Bot' : 'View Channel'}
                        onClick={() => {
                            // Handle navigation based on type
                            if (isCourse) {
                                router.push(`/course/${item.courseId?._id}`);
                            } else if (isBot) {
                                router.push(`/algobot-details/${item.botId?.strategyId?._id}`);
                            } else if (isTelegram) {
                                // Handle telegram channel navigation
                                window.open(item.telegramId?.telegramId?.link, '_blank');
                            }
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.recentcourse}>
            <div className={styles.tabCenteralignment}>
                <div className={styles.tab}>
                    {Object.entries(TABS).map(([key, label]) => (
                        <button
                            key={key}
                            className={selectedTab === key ? styles.active : ''}
                            onClick={() => handleTabChange(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* <div className={styles.grid}>
                {isLoading ? (
                    renderSkeleton()
                ) : purchasedCourses[selectedTab]?.length === 0 ? (
                    <EmptyState />
                ) : (
                    purchasedCourses[selectedTab]?.map((item) => renderCourseCard(item))
                )}
            </div> */}
        </div>

    )
}
