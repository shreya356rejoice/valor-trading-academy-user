'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './algobotInDetail.module.scss';
import RightArrow from '@/components/icons/rightArrow';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
// import CourseDetailsTab from './courseDetailsTab';
// import Recentcourse from '../course/recentcourse';
// import Recent from './Recent';
import { useRouter, useSearchParams } from 'next/navigation';
// import { EmptyState } from './emptyState';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getPaymentUrl } from '@/app/api/dashboard';
import Button from '@/components/button';
import { getAlgobot, getOneBot, getPlan } from '@/app/api/algobot';
import RightIcon from '@/components/icons/rightIcon';
import { marked } from "marked";
import { motion } from 'framer-motion';
// import AlgobotSubscription from './AlgobotSubscription';
import Dropdownarrow from '../../../../public/assets/icons/dropdownarrow';
import CommonBanner from '@/components/commonBanner';
import { getCookie } from '../../../../cookie';

const BathIcon = '/assets/icons/bath.svg';
const NoCoursesIcon = '/assets/icons/no-courses.svg';
const LockIcon = '/assets/icons/lock.svg';
const MinusIcon = "/assets/icons/minus.svg";
const PlusIcon = "/assets/icons/plus.svg";
const FlashIcon = '/assets/icons/flash.svg'

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.5 },
    }),
}

const AlgoBotDetailSkeleton = () => (
    <div className={styles.algobotDetailsAlignment}>
        <div className={styles.pageHeaderAlignment}>
            <div className={styles.text}>
                <Skeleton height={40} width="60%" style={{ marginBottom: '20px' }} />
            </div>
        </div>
        
        {/* AlgoBot Banner Section */}
        <div className={styles.algobanner}>
            <div className={styles.grid}>
                <div className={styles.griditems}>
                    <Skeleton height={300} style={{ borderRadius: '16px' }} />
                </div>
                <div className={styles.griditems}>
                    <Skeleton count={5} style={{ marginBottom: '10px' }} />
                </div>
            </div>
        </div>

        {/* Tutorial Section */}
        <div className={styles.tutorial}>
            <Skeleton width={100} height={24} style={{ marginBottom: '15px' }} />
            <div className={styles.textdropdown}>
                <Skeleton width={200} height={20} style={{ marginBottom: '10px' }} />
                <Skeleton width="100%" height={40} style={{ borderRadius: '8px' }} />
            </div>
        </div>

        {/* Video Player */}
        <div className={styles.tutorialVideo}>
            <Skeleton height={400} style={{ borderRadius: '16px' }} />
        </div>

        {/* Plans Section */}
        <div className={styles.plansContainer}>
            <Skeleton width={120} height={28} style={{ marginBottom: '20px' }} />
            <div className={styles.plansGrid}>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className={styles.planCard}>
                        <div className={styles.planType}>
                            <Skeleton width={120} height={24} />
                            <Skeleton width={80} height={24} style={{ marginLeft: 'auto' }} />
                        </div>
                        <div className={styles.plandetails}>
                            <Skeleton width={150} height={20} style={{ marginBottom: '10px' }} />
                            <Skeleton width={120} height={20} />
                        </div>
                        <div className={styles.counterAlignment}>
                            <Skeleton width={30} height={30} circle />
                            <Skeleton width={40} height={30} style={{ margin: '0 10px' }} />
                            <Skeleton width={30} height={30} circle />
                        </div>
                        <Skeleton height={45} style={{ marginTop: '15px', borderRadius: '8px' }} />
                    </div>
                ))}
            </div>
        </div>

        {/* Similar Bots Section */}
        <div className={styles.plansContainer}>
            <Skeleton width={150} height={28} style={{ marginBottom: '20px' }} />
            <div className={styles.grid}>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className={styles.griditems}>
                        <Skeleton height={200} style={{ borderRadius: '16px 16px 0 0' }} />
                        <div style={{ padding: '15px' }}>
                            <Skeleton height={24} width="80%" style={{ marginBottom: '10px' }} />
                            <Skeleton count={2} style={{ marginBottom: '15px' }} />
                            <Skeleton height={40} style={{ borderRadius: '8px' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default function AlgobotInDetails() {
    const [algobotData, setAlgobotData] = useState({});
    const [plans, setPlans] = useState([]);
    const [planQuantities, setPlanQuantities] = useState({});
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [commonDiscount, setCommonDiscount] = useState(0); // 10% common discount
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('algobotId');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        const user = getCookie("user");
        const userName = user && JSON.parse(user)?.name;
        setUser(userName);
    }, []);

    const handleNavigate = () => {
        if (user) {
            router.push('/algobot')
        } else {
            router.push('/login')
        }
    }

    const handleLanguageChange = (index) => {
        setSelectedLanguageIndex(index);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const dropdownRef = useRef(null);
    const fetchAlgobotData = async () => {
        try {
            setIsLoading(true);
            const response = await getOneBot(id);
            setAlgobotData(response.payload);

            const plansResponse = await getPlan(id);

            const initialQuantities = {};
            plansResponse.payload?.forEach((plan) => {
                initialQuantities[plan._id] = 1; // Initialize quantity as 1 for each plan
            });
            setPlanQuantities(initialQuantities);
            setPlans(plansResponse.payload || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlgobotData();
    }, [id]);

    const [similarAlgobotData, setSimilarAlgobotData] = useState([]);

    useEffect(() => {
        const fetchSimilarAlgobotData = async () => {
            try {
                const response = await getAlgobot(algobotData?.categoryId?._id);

                setSimilarAlgobotData(response?.payload?.result); // Get first 3 strategies
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchSimilarAlgobotData();
    }, [algobotData?.categoryId?._id]);

    const handleIncrement = (planId) => {
        setPlanQuantities((prev) => {
            const newQuantity = (prev[planId] || 1) + 1;
            if (selectedPlan?._id === planId) {
                setSelectedPlanQuantity(newQuantity);
            }
            return {
                ...prev,
                [planId]: newQuantity,
            };
        });
    };

    const handleDecrement = (planId) => {
        setPlanQuantities((prev) => {
            const newQuantity = Math.max(1, (prev[planId] || 1) - 1);
            if (selectedPlan?._id === planId) {
                setSelectedPlanQuantity(newQuantity);
            }
            return {
                ...prev,
                [planId]: newQuantity,
            };
        });
    };

    useEffect(() => {
        fetchAlgobotData();
    }, []);

    useEffect(() => {
        if (algobotData?.link?.length > 0) {
            setAvailableLanguages(algobotData.link);
            setSelectedLanguageIndex(0); // Reset to first language when data changes
        }
    }, [algobotData]);

    const getYouTubeEmbedUrl = (url) => {
        try {
            const urlObj = new URL(url);
            const videoId =
                urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
            return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
        } catch (e) {
            console.error("Invalid YouTube URL:", url);
            return "";
        }
    };

    useEffect(() => {
        const isPayment = searchParams.get("isPayment");
        if (isPayment) {
            setPaymentStatus(isPayment === "true" ? "success" : "cancelled");
            setShowPaymentModal(true);
            // Clean up URL without refreshing the page
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete("isPayment");
            window.history.replaceState({}, "", newUrl);
        }
    }, [searchParams]);


    if (isLoading) {
        return (
            <div className='container-lg'>
                <AlgoBotDetailSkeleton />
            </div>
        );
    }

    return (
        <>
            <CommonBanner title='Forex Trading for Beginners' description='A simple guide to understanding and starting currency trading in the global forex market.' />
            <div className='container-lg'>
                <div className={styles.courseDetails}>
                    <div className={styles.algobotDetailsAlignment}>
                        <div className={styles.pageHeaderAlignment}>
                            <div className={styles.text}>
                                <h2>{algobotData?.title}</h2>
                            </div>
                        </div>
                        <div className={styles.algobanner}>
                            <div className={styles.grid}>
                                <div className={styles.griditems}>
                                    <div className={styles.box}>
                                        {algobotData?.imageUrl && (
                                            <img
                                                src={algobotData.imageUrl}
                                                alt={algobotData.title}
                                                className={styles.algobotImage}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/path/to/placeholder-image.jpg";
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={styles.griditems}>
                                    <p
                                        className="prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: marked(algobotData.description || ""),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.tutorial} ref={dropdownRef}>
                            <h3>Tutorial</h3>
                            <div className={styles.textdropdown}>
                                <p>Select your preferred language :</p>
                                <div className={styles.dropdownmain}>
                                    {/* Dropdown Head */}
                                    <div
                                        className={styles.dropdownhead}
                                        onClick={() => setIsOpen((prev) => !prev)}
                                    >
                                        <span>
                                            {availableLanguages.length > 0
                                                ? availableLanguages[selectedLanguageIndex]?.language
                                                : "No languages available"}
                                        </span>
                                        <div className={styles.dropdownarrow}>
                                            <Dropdownarrow />
                                        </div>
                                    </div>

                                    {/* Dropdown List */}
                                    {isOpen && availableLanguages.length > 0 && (
                                        <div className={styles.dropdown}>
                                            <div className={styles.dropdownspacing}>
                                                {availableLanguages.map((lang, index) => (
                                                    <div
                                                        key={lang._id || index}
                                                        className={styles.iconText}
                                                        onClick={() => handleLanguageChange(index)}
                                                    >
                                                        <span>{lang.language}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.tutorialVideo}>
                            <div className={styles.subBox}>
                                {availableLanguages[selectedLanguageIndex]?.url && (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={getYouTubeEmbedUrl(
                                            availableLanguages[selectedLanguageIndex].url
                                        )}
                                        title={`Tutorial Video - ${availableLanguages[selectedLanguageIndex]?.language || ""
                                            }`}
                                        frameBorder="0"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ borderRadius: "16px" }}
                                    ></iframe>
                                )}
                            </div>
                        </div>
                        <div className={styles.plansContainer}>
                            <h3>Bot Plans</h3>
                            <div className={styles.plansGrid}>
                                {plans.map((plan, index) => (
                                    <div key={plan._id || index} className={styles.planCard}>
                                        <div className={styles.planType}>
                                            <div className={styles.planTypeflx}>
                                                <h3>{plan.planType}</h3>
                                                <div className={styles.priceContainer}>
                                                    <span className={styles.originalPrice}>
                                                        ${(plan.price * (planQuantities[plan._id] || 1)).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
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
                                        <div className={styles.counterAlignment}>
                                            <div
                                                className={`${styles.icons} ${(planQuantities[plan._id] || 1) <= 1
                                                    ? styles.disabled
                                                    : ""
                                                    }`}
                                                onClick={() => handleDecrement(plan._id)}
                                            >
                                                <img src={MinusIcon} alt="Decrease quantity" />
                                            </div>
                                            <div className={styles.textDesign}>
                                                <span>{planQuantities[plan._id] || 1}</span>
                                            </div>
                                            <div
                                                className={styles.icons}
                                                onClick={() => handleIncrement(plan._id)}
                                            >
                                                <img src={PlusIcon} alt="Increase quantity" />
                                            </div>
                                        </div>
                                        <Button
                                            text='Buy Now'
                                            fill='fill'
                                            onClick={handleNavigate}
                                            disabled={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className={styles.plansContainer}>
                            {similarAlgobotData.filter(strategy => strategy._id !== id).length > 0 && (
                                <h3>Similar Bots</h3>
                            )}
                            <div className={styles.grid}>
                                {similarAlgobotData
                                    .filter(strategy => strategy._id !== id) // Filter out current bot
                                    .map((strategy, i) => (
                                        <div className={styles.griditems} key={i}>
                                            <div className={styles.image}>
                                                <img src={strategy?.imageUrl} alt={strategy?.title} />
                                            </div>
                                            <div className={styles.details}>
                                                <h3>{strategy?.title}</h3>
                                                <p dangerouslySetInnerHTML={{ __html: strategy?.shortDescription }} />
                                                <div className={styles.pricingSection}>
                                                    {strategy.strategyPlan?.map((plan, planIndex) => (
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
                                                    ))}
                                                </div>
                                                <Button
                                                    text="Buy Now"
                                                    onClick={() => router.push(`/algobot-in-details?algobotId=${strategy?._id}`)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </>
    )
}
