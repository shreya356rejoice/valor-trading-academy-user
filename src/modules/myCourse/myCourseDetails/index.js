'use client'
import React, { useEffect, useState } from 'react'
import styles from './myCourseDetails.module.scss';
import Button from '@/components/button';
import Pagination from '@/components/pagination';


import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getPurchasedCourses, getRegisteredCourses } from '@/app/api/algobot';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';

const ITEMS_PER_PAGE = 4;

const TABS = {
    RECORDED: 'Pre Recorded Courses',
    LIVE: 'Live Webinars',
    PHYSICAL: 'Traders Meet',
    BOTS: 'My AlgoBots',
    TELEGRAM: 'My Telegram'
};

export default function MyCourseDetails() {
    const [selectedTab, setSelectedTab] = useState('RECORDED');
    const [purchasedCourses, setPurchasedCourses] = useState({
        RECORDED: [],
        LIVE: [],
        PHYSICAL: [],
        BOTS: [],
        TELEGRAM: []
    });
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const fetchPurchasedCourses = async () => {
        try {
            setIsLoading(true);

            if (selectedTab === 'LIVE' || selectedTab === 'PHYSICAL') {
                const response = await getRegisteredCourses(selectedTab);

                if (response?.success) {
                    if (selectedTab === 'LIVE' && response?.payload?.LIVE) {
                        setRegisteredCourses(response.payload.LIVE);
                    } else if (selectedTab === 'PHYSICAL' && response?.payload?.PHYSICAL) {
                        setRegisteredCourses(response.payload.PHYSICAL);
                    } else {
                        setRegisteredCourses([]);
                    }
                } else {
                    setRegisteredCourses([]);
                }
            } else {
                const response = await getPurchasedCourses();
                if (response?.success && response?.payload) {
                    setPurchasedCourses({
                        RECORDED: response.payload.RECORDED || [],
                        LIVE: response.payload.LIVE || [],
                        PHYSICAL: response.payload.PHYSICAL || [],
                        BOTS: response.payload.BOTS || [],
                        TELEGRAM: response.payload.TELEGRAM || []
                    });
                }
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
    }, [selectedTab]);

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


        const courseId = isCourse ? item?.courseId?._id : null;
        const botId = item?.botId?.strategyId?._id ? item?.botId?.strategyId?._id : null;
        const telegramId = item?.telegramId?.telegramId?._id ? item?.telegramId?.telegramId?._id : null;

        // Additional data based on tab type
        const instructorName = isCourse ? item?.courseId?.instructor : '';
        const hours = isCourse ? item?.courseId?.hours : '';
        const courseStart = isCourse ? new Date(item?.courseId?.courseStart) : null;
        const courseEnd = isCourse ? new Date(item?.courseId?.courseEnd) : null;
        const formattedDateRange = courseStart && courseEnd ?
            `${courseStart.toLocaleDateString()} - ${courseEnd.toLocaleDateString()}` : 'Not scheduled';
        const scheduleOn = formattedDateRange;
        const courseType = isCourse ? item.courseId?.courseType : '';
        const location = isCourse ? item.courseId?.location : '';
        const planType = item.planType || 'Standard';

        const handleCardClick = (register) => {
            if (selectedTab === 'TELEGRAM') {
                router.push(`/my-telegram-details/${telegramId}`);
            } else if (selectedTab === 'BOTS') {
                router.push(`/my-algobot-details?algobotId=${botId}`);
            } else if (selectedTab === 'RECORDED') {
                router.push(`/my-course-details?courseId=${courseId}&category=${selectedTab}`);
            } else if (['LIVE', 'PHYSICAL'].includes(selectedTab)) {
                router.push(`/my-course-details?courseId=${register?.courseId?._id}&category=${selectedTab}`);
            }
        };

        return (
            <>
                {(selectedTab === 'LIVE' || selectedTab === 'PHYSICAL') ? (<>
                    {registeredCourses.map((register) => {
                        return (
                            <div className={styles.griditems} key={register?._id} onClick={() => handleCardClick(register)}>
                                <div>
                                    <div className={styles.image}>
                                        <img
                                            src={register?.courseId?.courseVideo}
                                            alt={title}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/assets/images/placeholder.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className={styles.details}>
                                        <h3>{register?.courseId?.CourseName}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: register?.courseId?.description?.substring(0, 150) + '...' }} />
                                        <div className={styles.infoCard}>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Instructor:</span>
                                                <span className={styles.infoValue}>{register?.courseId?.instructor || 'N/A'}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Date:</span>
                                                <span className={styles.infoValue}>
                                                    {register?.courseId?.createdAt ? new Date(register.courseId.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'N/A'}
                                                </span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Time:</span>
                                                <span className={styles.infoValue}>
                                                    {register?.courseId?.startTime} to {register?.courseId?.endTime}
                                                </span>
                                            </div>
                                            {selectedTab === 'PHYSICAL' && (<div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Location:</span>
                                                <span className={styles.infoValue}>
                                                    {register?.courseId?.location}
                                                </span>
                                            </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>) :
                    (<>
                        <div className={styles.griditems} key={item._id} onClick={handleCardClick}>
                            {selectedTab !== 'TELEGRAM' && (imageUrl && (
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
                            ))}

                            <div className={styles.details}>
                                <h3>{title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: description?.substring(0, 150) + '...' }} />

                                <div className={styles.infoCard}>
                                    {(selectedTab === 'RECORDED' || selectedTab === 'LIVE' || selectedTab === 'PHYSICAL') && (
                                        <>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Instructor:</span>
                                                <span className={styles.infoValue}>{instructorName || 'N/A'}</span>
                                            </div>
                                        </>
                                    )}

                                    {selectedTab === 'LIVE' && (
                                        <>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Duration:</span>
                                                <span className={styles.infoValue}>{hours || '0'} hours</span>
                                            </div>
                                        </>
                                    )}

                                    {selectedTab === 'PHYSICAL' && (
                                        <>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Location:</span>
                                                <span className={styles.infoValue}>{location || '-'}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Schedule:</span>
                                                <span className={styles.infoValue}>{scheduleOn || 'To be announced'}</span>
                                            </div>
                                        </>
                                    )}

                                    {(selectedTab === 'BOTS' || selectedTab === 'TELEGRAM') && (
                                        <div className={styles.infoRow}>
                                            <span className={styles.infoLabel}>Plan:</span>
                                            <span className={styles.infoValue}>{planType}</span>
                                        </div>
                                    )}

                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>Purchased On:</span>
                                        <span className={styles.infoValue}>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    {/*                         
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Price Paid:</span>
                            <span className={styles.price}>${price}</span>
                        </div> */}
                                </div>
                            </div>
                        </div ></>)
                }
            </>
        );
    };

    const currentItems = selectedTab === 'LIVE' ? registeredCourses : (purchasedCourses[selectedTab] || []);
    const totalItems = selectedTab === 'LIVE' ? registeredCourses.length : (purchasedCourses[selectedTab]?.length || 0);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

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

            <div className={styles.grid}>
                {isLoading ? (
                    renderSkeleton()
                ) : currentItems.length === 0 ? (
                    <EmptyState />
                ) : (
                    currentItems.map((item) => renderCourseCard(item))
                )}
            </div>
        </div>

    )
}
