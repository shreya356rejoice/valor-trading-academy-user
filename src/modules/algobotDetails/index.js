'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './algobotDetails.module.scss';
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
import { getCookie } from '../../../cookie';
import { getAlgobot, getOneBot, getPlan } from '@/app/api/algobot';
import RightIcon from '@/components/icons/rightIcon';
import { marked } from "marked";
import Dropdownarrow from '../../../public/assets/icons/dropdownarrow';
import { motion } from 'framer-motion';
import AlgobotSubscription from './AlgobotSubscription';

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

const CourseDetailsSkeleton = () => (
    <div className={styles.courseDetails}>
        <div className={styles.breadcumbAlignment}>
            <Skeleton width={50} />
            <Skeleton width={100} style={{ marginLeft: 10 }} />
        </div>
        <div className={styles.contentAlignment}>
            <Skeleton height={40} width="70%" style={{ marginBottom: 16 }} />
            <Skeleton count={3} style={{ marginBottom: 8 }} />
            <Skeleton width="60%" style={{ marginBottom: 24 }} />

            <div className={styles.allIconTextAlignment}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={styles.iconText}>
                        <Skeleton circle width={20} height={20} style={{ marginRight: 8 }} />
                        <Skeleton width={80} />
                    </div>
                ))}
            </div>
        </div>

        <div className={styles.courseInformation}>
            <Skeleton height={400} style={{ marginBottom: 20 }} />
            <Skeleton height={30} width="50%" style={{ marginBottom: 16 }} />
            <Skeleton count={4} />
        </div>
    </div>
);

export default function AlgoBotDetails() {
    const [algobotData, setAlgobotData] = useState({});
    const [plans, setPlans] = useState([]);
    const [planQuantities, setPlanQuantities] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedPlanQuantity, setSelectedPlanQuantity] = useState(1);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [isValidating, setIsValidating] = useState(false);
    const [couponId, setCouponId] = useState("");
    const [error, setError] = useState("");
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

    const handleBuyNow = (plan) => {
        const quantity = planQuantities[plan._id] || 1;
        setSelectedPlanQuantity(quantity);
        const originalPrice = plan.initialPrice * quantity;
        const commonDiscountAmount = (originalPrice * (plan.discount || 0)) / 100;
        const priceAfterCommonDiscount = originalPrice - commonDiscountAmount;

        setSelectedPlan({
            ...plan,
            originalPrice: originalPrice,
            totalPrice: priceAfterCommonDiscount,
            quantity: quantity,
            commonDiscount: plan.commonDiscount || 0,
            discountType: "common",
            priceAfterCommonDiscount: priceAfterCommonDiscount,
        });

        setCoupon("");
        setDiscount(commonDiscountAmount);
        setError("");
        setAppliedCoupon(null);
        setShowSubscriptionModal(true);
    };

    const handleApplyCoupon = async () => {
        if (!coupon.trim()) {
            setError("Please enter a coupon code");
            return;
        }

        try {
            setIsValidating(true);
            setError("");
            const response = await getCoupon(coupon);

            if (response.success && response.payload) {
                const couponDiscountPercentage = response.payload.discount || 0;
                const originalPrice = selectedPlan.originalPrice;

                const totaldiscount = selectedPlan.discount + couponDiscountPercentage;
                const discountAmount = (originalPrice * totaldiscount) / 100;
                const finalPrice = originalPrice - discountAmount;

                setCouponId(response.payload._id);
                setAppliedCoupon({
                    code: coupon,
                    discount: couponDiscountPercentage,
                });

                setSelectedPlan((prev) => ({
                    ...prev,
                    totalPrice: finalPrice,
                    discountType: "combined",
                    couponDiscount: couponDiscountPercentage,
                    commonDiscount: selectedPlan.discount,
                    couponDiscountPercentage: couponDiscountPercentage,
                }));

                toast.success("Coupon applied successfully!");
            } else {
                setError(response.messages || "Invalid coupon code");
            }
        } catch (error) {
            console.error("Error validating coupon:", error);
            setError("Failed to validate coupon. Please try again.");
        } finally {
            setIsValidating(false);
        }
    };

    const handlePurchase = async () => {
        if (!selectedPlan) return;

        try {
            setIsProcessingPayment(true);
            setError("");

            const orderData = {
                strategyPlanId: selectedPlan._id,
                botId: algobotData?._id,
                couponId: couponId || undefined,
                noOfBots: planQuantities[selectedPlan._id] || 1,
                success_url: window.location.href,
                cancel_url: window.location.href,
            };

            const response = await getPaymentUrl(orderData);
            if (response.success) {
                router.replace(response?.payload?.data?.checkout_url);
                setIsModalOpen(false);
            } else {
                setError(response.message || "Failed to process payment");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            setError("Failed to process payment. Please try again.");
        } finally {
            setIsProcessingPayment(false);
        }
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


    return (
        <>
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
                                {/* <p>{algobotData.description}</p> */}
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
                                        onClick={() => {
                                            setSelectedPlan(plan);
                                            setShowSubscriptionModal(true);
                                        }} 
                                        disabled={false} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className={styles.plansContainer}>
                        <h3>Similar Bots</h3>
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
                                            onClick={() => router.push(`/algobot-details?algobotId=${strategy?._id}`)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showSubscriptionModal && selectedPlan && (
            <AlgobotSubscription
                plan={{
                    ...selectedPlan,
                    quantity: planQuantities[selectedPlan._id] || 1,
                    totalPrice: selectedPlan.price * (planQuantities[selectedPlan._id] || 1)
                }}
                botId={id}
                onClose={() => {
                    setShowSubscriptionModal(false);
                    setSelectedPlan(null);
                    setSelectedPlanQuantity(1);
                }}
            />
        )}
        </>
    )
}
