'use client'
import React, { useEffect, useState } from 'react'
import styles from './algobotDetails.module.scss';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter, useSearchParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getAlgobot, getAlgobotCategories } from '@/app/api/algobot';
import Slider from 'react-slick';
import Sliderarrow from '@/components/icons/sliderarrow';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';

const ITEMS_PER_PAGE = 4;

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={styles.nextArrow}
            onClick={onClick}
        ><Sliderarrow /></div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={styles.prevArrow}
            onClick={onClick}
        ><Sliderarrow /></div>
    );
}

export default function AlgobotDetails() {
    const [selectedTab, setSelectedTab] = useState("recorded");
    const [strategies, setStrategies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: ITEMS_PER_PAGE
    });
    const router = useRouter();

    const fetchCategories = async () => {
        try {
            setIsCategoriesLoading(true);
            const data = await getAlgobotCategories();
            if (data?.success && data.payload?.length > 0) {
                setCategories(data.payload);
                // Set the first category as selected by default
                setSelectedCategory(data.payload[0]._id);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Failed to load categories');
        } finally {
            setIsCategoriesLoading(false);
        }
    };

    const fetchStrategies = async (page = 1) => {
        try {
            setIsLoading(true);
            const data = await getAlgobot(selectedCategory, '', page, ITEMS_PER_PAGE);

            if (data?.success) {
                setStrategies(data?.payload?.result || []);
            }

            setPagination(prev => ({
                ...prev,
                currentPage: page,
                totalItems: data?.payload?.count || 0,
            }));
        }
        catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to load courses. Please try again later.');
            // setCourses([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Sort categories to ensure 'Arbitrage Algo' comes first
    const sortCategories = (categories) => {
        if (!categories || !Array.isArray(categories)) return [];
        return [...categories].sort((a, b) => {
            if (a.title === 'Arbitrage Algo') return -1;
            if (b.title === 'Arbitrage Algo') return 1;
            return 0;
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle URL parameters and set selected category
    useEffect(() => {
        if (categories.length > 0) {
            const categoryParam = searchParams?.get('category');
            const sortedCategories = sortCategories(categories);

            if (categoryParam) {
                // Find category by title (converting to lowercase for case-insensitive comparison)
                const category = categories.find(
                    cat => cat.title.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
                );
                if (category) {
                    setSelectedCategory(category._id);
                    return;
                }
            }

            // Default to 'Arbitrage Algo' if no category in URL or not found
            const defaultCategory = sortedCategories[0]?._id || '';
            setSelectedCategory(defaultCategory);
        }
    }, [categories, searchParams]);

    useEffect(() => {
        fetchStrategies(pagination.currentPage);
    }, [pagination.currentPage, selectedCategory]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
            fetchStrategies(newPage);
            // Optional: Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
                    <div className={styles.iconalignment} style={{ padding: '0px' }}>
                        <h4 className={styles.iconText}><Skeleton width={40} height={20} /></h4>
                        <div className={styles.iconText}>
                            <Skeleton circle width={20} height={20} style={{ marginRight: '4px' }} />
                            <Skeleton width={80} />
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
                <h3>No Strategies Found</h3>
                <p>We couldn't find any strategies matching your criteria.</p>
            </div>
        </div>
    );

    return (
        <div className={styles.recentcourse}>
            <div className={styles.tabCenteralignment}>
                <div className={styles.tab}>
                    {sortCategories(categories).map((category) => (
                        <button
                            key={category._id}
                            className={selectedCategory === category._id ? styles.active : ''}
                            onClick={() => setSelectedCategory(category._id)}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.grid}>
                {isLoading ? (
                    renderSkeleton()
                ) : strategies.length === 0 ? (
                    <EmptyState />
                ) : (
                    strategies.map((strategy, i) => (
                        <>
                            <div className={styles.griditems} key={i}>
                                <div className={styles.image}>
                                    <img src={strategy?.imageUrl} alt={strategy?.title} />
                                </div>
                                <div className={styles.details}>
                                    <h3>{strategy?.title}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: strategy?.shortDescription }} />
                                    <div className={styles.pricingSection}>
                                        <Slider
                                            dots={false}
                                            infinite={false}
                                            speed={300}
                                            slidesToShow={strategy.strategyPlan?.length > 2 ? 2 : strategy.strategyPlan?.length}
                                            slidesToScroll={1}
                                            arrows={true}
                                            className={styles.priceSlider}
                                            nextArrow={<SampleNextArrow />}
                                            prevArrow={<SamplePrevArrow />}
                                            responsive={[
                                                {
                                                    breakpoint: 768,
                                                    settings: {
                                                        slidesToShow: 1.5,
                                                        slidesToScroll: 1,
                                                        infinite: false,
                                                        dots: true
                                                    }
                                                }
                                            ]}
                                        >
                                            {strategy.strategyPlan
                                                ?.slice()
                                                .sort((a, b) => {
                                                    const getMonths = (planType) => {
                                                        if (planType?.toLowerCase().includes('month')) {
                                                            return parseInt(planType);
                                                        }
                                                        if (planType?.toLowerCase().includes('year')) {
                                                            return parseInt(planType) * 12;
                                                        }
                                                        return 0;
                                                    };

                                                    return getMonths(a.planType) - getMonths(b.planType);
                                                })
                                                .map((plan, planIndex) => (
                                                    <div key={planIndex} className={styles.priceCard}>
                                                        <div className={styles.priceSubtitle}>
                                                            <span>{plan.planType}</span>
                                                            <span className={styles.price}>${plan.price}</span>
                                                        </div>
                                                        <div className={styles.priceSubtitle}>
                                                            <span>M.R.P:</span>
                                                            <span>${plan.price}</span>
                                                        </div>
                                                        <div className={styles.priceSubtitle}>
                                                            <span>Discount:</span>
                                                            <span>{plan.discount}%</span>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                    </div>

                                    {/* <div className={styles.iconalignment}>
                                    <h4>${strategy?.strategyPlan?.[0]?.price || '0'}</h4>
                                    <div className={styles.iconText}>
                                        <img src={BathIcon} alt="BathIcon" />
                                        <span>View Details</span>
                                    </div>
                                </div> */}

                                    {strategy.strategyPlan?.some(plan => plan?.isPayment) ? (
                                        <Button
                                            text="Purchased"
                                            fill
                                            onClick={() => {
                                                const categoryParam = searchParams.get('category');
                                                router.push(`/my-algobot-details?algobotId=${strategy?._id}${categoryParam ? `&category=${categoryParam}` : ''}`);
                                            }}
                                            style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                        />
                                    ) : (
                                        <Button
                                            text="Buy Now"
                                            onClick={() => {
                                                const categoryParam = searchParams.get('category');
                                                router.push(`/algobot-details?algobotId=${strategy?._id}${categoryParam ? `&category=${categoryParam}` : ''}`);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    ))
                )}
            </div>
            {!isLoading && strategies.length > 0 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>

    )
}
