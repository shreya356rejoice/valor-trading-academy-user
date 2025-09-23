'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './myAlgobotDetails.module.scss';
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
import AlgobotSubscription from '../algobotDetails/AlgobotSubscription';

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

const BotPlansSkeleton = () => (
    <div className={styles.plansContainer}>
        <Skeleton height={30} width="20%" style={{ marginBottom: 20,marginLeft: 25 }} />
        <div className={styles.plansGrid} style={{ marginLeft: 25 }}>
            {[1, 2, 3].map((_, i) => (
                <div key={i} className={styles.planCard}>
                    <Skeleton height={30} width="70%" style={{ marginBottom: 15 }} />
                    <Skeleton height={20} width="100%" style={{ marginBottom: 10 }} />
                    <Skeleton height={20} width="80%" style={{ marginBottom: 15 }} />
                    <div className={styles.counterAlignment} style={{ margin: '15px 0' }}>
                        <Skeleton height={40} width={40} style={{ marginRight: 10 }} />
                        <Skeleton height={40} width={40} style={{ margin: '0 10px' }} />
                        <Skeleton height={40} width={40} style={{ marginLeft: 10 }} />
                    </div>
                    <Skeleton height={45} width="100%" />
                </div>
            ))}
        </div>
    </div>
);

const SimilarBotsSkeleton = () => (
    <div className={styles.plansContainer}>
        <Skeleton height={30} width="20%" style={{ marginBottom: 20,marginLeft: 25 }} />
        <div className={styles.grid} style={{ marginLeft: 25 }}>
            {[1, 2, 3].map((_, i) => (
                <div className={styles.griditems} key={i}>
                    <Skeleton height={200} className={styles.image} />
                    <div className={styles.details}>
                        <Skeleton height={25} width="80%" style={{ marginBottom: 10 }} />
                        <Skeleton height={60} style={{ marginBottom: 15 }} />
                        <Skeleton height={100} style={{ marginBottom: 15 }} />
                        <Skeleton height={45} width="100%" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const AlgoBotDetailsSkeleton = () => (
    <div className={styles.algobotDetailsAlignment}>
        <div className={styles.pageHeaderAlignment}>
            <div className={styles.text}>
                <Skeleton height={40} width="60%" style={{ marginBottom: 20 ,marginLeft: 25 }} />
            </div>
        </div>
        <div className={styles.algobanner}>
            <div className={styles.grid}>
                <div className={styles.griditems}>
                    <Skeleton height={400} className={styles.algobotImage} style={{ marginLeft: 25 }} />
                </div>
                <div className={styles.griditems}>
                    <Skeleton count={8} style={{ marginBottom: 10 , marginRight: 25 }} />
                    <Skeleton width="70%" />
                </div>
            </div>
        </div>
        <div className={styles.tutorial}>
            <Skeleton height={30} width="20%" style={{ marginBottom: 20 , marginLeft: 25 }} />
            <div className={styles.textdropdown}>
                <Skeleton width={200} height={20} style={{ marginBottom: 10 , marginLeft: 25 }} />
                <Skeleton width={200} height={40} />
            </div>
        </div>
        <div className={styles.tutorialVideo}>
            <Skeleton height={400} style={{ marginBottom: 20 }} />
        </div>
        <BotPlansSkeleton />
        <SimilarBotsSkeleton />
    </div>
);

export default function MyAlgoBotDetails() {
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


    if (isLoading) {
        return <AlgoBotDetailsSkeleton />;
    }

    if (error) {
        return <div className={styles.errorMessage}>Error loading AlgoBot details. Please try again later.</div>;
    }

    return (
        <>
            <div className={styles.courseDetails}>
                <div className={styles.breadcumbAlignment}>
                    <a aria-label="Home" href="/dashboard">Home</a>
                    <RightArrow />
                    <a aria-label="My Courses" href="/my-courses">My Courses</a>
                </div>
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
                    {isLoading ? (
                        <BotPlansSkeleton />
                    ) : (
                        <div className={styles.plansContainer}>
                            <h3>Bot Plans</h3>
                            <div className={styles.plansGrid}>
                                {plans
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
                                .map((plan, index) => (
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
                                        {plan?.isPayment ? (<Button
                                            text='Purchased'
                                            fill='fill'
                                            onClick={() => {
                                                setSelectedPlan(plan);
                                                setShowSubscriptionModal(true);
                                            }}
                                            disabled={false}
                                        />) : (<Button
                                            text='Buy Now'
                                            onClick={() => {
                                                setSelectedPlan(plan);
                                                setShowSubscriptionModal(true);
                                            }}
                                            disabled={false}
                                        />)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.plansContainer}>
                        <h3>Purchased Plans</h3>
                        <div className={styles.paymentTable}>
                            {plans?.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Plan Type</th>
                                            <th>Purchase Date</th>
                                            <th>Meta Account No.</th>
                                            <th>Quantity</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plans.map((plan) => {
                                            const payment = plan.payment?.[0];
                                            const purchaseDate = payment?.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A';
                                            const quantity = payment?.noOfBots || 1;
                                            const startDate = payment?.startDate ? new Date(payment.startDate).toLocaleDateString() : 'Not added';
                                            const endDate = payment?.endDate ? new Date(payment.endDate).toLocaleDateString() : 'Not added';
                                            const metaAccounts = payment?.metaAccountNo?.join(', ') || 'N/A';

                                            return (
                                                <tr key={plan._id}>
                                                    <td>{plan.planType}</td>
                                                    <td>{purchaseDate}</td>
                                                    <td>{metaAccounts}</td>
                                                    <td>{quantity}</td>
                                                    <td>{startDate}</td>
                                                    <td>{endDate}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No purchased plans found.</p>
                            )}
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
