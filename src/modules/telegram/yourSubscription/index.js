import React, { useState } from 'react';
import styles from './yourSubscription.module.scss';
import CloseIcon from '@/components/icons/closeIcon';
import Input from '@/components/input';
import Button from '@/components/button';
import { getCoupon } from '@/app/api/algobot';
import { toast } from 'react-toastify';
import { getPaymentUrl } from '@/app/api/dashboard';
import { useRouter } from 'next/navigation';
export default function YourSubscription({ onClose, plan, channel }) {
    const [couponCode, setCouponCode] = useState('');
    const [telegramId, setTelegramId] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [discountedPrice, setDiscountedPrice] = useState(plan?.price || 0);
    const [originalPrice] = useState(plan?.price || 0);
    const [errors, setErrors] = useState({
        telegramId: '',
        couponCode: ''
    });
    const router = useRouter();


    async function handleApplyCoupon() {
        if (!couponCode.trim()) {
            setErrors(prev => ({ ...prev, couponCode: 'Please enter a coupon code' }));
            return;
        }

        setIsApplying(true);
        try {
            const response = await getCoupon(couponCode);
            if (response.success && response.payload) {
                const coupon = response.payload;

                // Check if coupon is valid for this plan
                if (coupon.planType && coupon.planType !== plan.planType) {
                    setErrors(prev => ({ ...prev, couponCode: 'This coupon is not valid for the selected plan' }));
                    return;
                }

                const discountAmount = (originalPrice * coupon.discount) / 100;
                const newPrice = Math.max(0, originalPrice - discountAmount);

                setDiscountedPrice(newPrice);
                setAppliedCoupon(coupon);
                setErrors(prev => ({ ...prev, couponCode: '' }));
                toast.success('Coupon applied successfully!');
            } else {
                setErrors(prev => ({ ...prev, couponCode: response.message || 'Invalid or expired coupon' }));
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            toast.error('Failed to apply coupon');
        } finally {
            setIsApplying(false);
        }
    }

    async function handlePayment() {
        // Clear previous errors
        setErrors({ telegramId: '', couponCode: '' });
        setIsProcessingPayment(true);

        // Validate Telegram ID
        if (!telegramId.trim()) {
            setErrors(prev => ({ ...prev, telegramId: 'Please enter your Telegram ID' }));
            setIsProcessingPayment(false);
            return;
        } 

        try {
            setErrors('');
            const paymentData = {
                telegramPlanId: plan._id,
                telegramAccountNo: telegramId.trim(),
                couponId: appliedCoupon ? appliedCoupon._id : null,
                success_url: window.location.href,
                cancel_url: window.location.href
            };

            const response = await getPaymentUrl(paymentData);
            
            if (response.success) {
                router.replace(response?.payload?.data?.checkout_url);
            } else {
                setErrors(response.message || 'Failed to process payment');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setErrors(prev => ({ ...prev, payment: 'Failed to process payment. Please try again.' }));
            toast.error('Failed to process payment. Please try again.');
        } finally {
            setIsProcessingPayment(false);
        }
    }

    return (
        <div className={styles.yourSubscriptionModalWrapper}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>
                        Complete Your Subscription
                    </h2>
                    <button onClick={onClose} className={styles.closeButton}>
                        <CloseIcon />
                    </button>
                </div>
                <div className={styles.modalbody}>
                    <div className={styles.inputGroup}>
                        <Input
                            label='Telegram ID'
                            placeholder='Enter your Telegram ID'
                            value={telegramId}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Only update if the value matches the allowed pattern or is empty
                                if (value === '' || /^[a-zA-Z0-9_]*$/.test(value)) {
                                    setTelegramId(value);
                                    if (errors.telegramId) {
                                        setErrors(prev => ({ ...prev, telegramId: '' }));
                                    }
                                }
                            }}
                            error={errors.telegramId || (telegramId && !/^[a-zA-Z0-9_]+$/.test(telegramId) ? 'Only letters, numbers, and underscores are allowed' : '')}
                        />
                        <p className={styles.errorMessage}>{errors?.telegramId}</p>
                    </div>
                    <div className={styles.subBox}>
                        <div className={styles.boxHeader}>
                            <h3>{plan?.planType} Plan
                            </h3>
                        </div>
                        <div className={styles.detailsAlignment}>
                            <div className={styles.text}>
                                <p>Original Price:</p>
                                <span>${plan?.initialPrice}</span>
                            </div>
                            <div className={styles.text}>
                                <p>Common Discount ({plan?.discount}%):
                                </p>
                                <span>-${((plan?.initialPrice * plan?.discount) / 100).toFixed(2)}</span>
                            </div>
                            {appliedCoupon?.discount && (
                                <div className={styles.text}>
                                    <p>Coupon Discount ({appliedCoupon?.discount}%):
                                    </p>
                                    <span>-${((plan?.initialPrice * appliedCoupon?.discount) / 100).toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                        <div className={styles.totalAmount}>
                            <div className={styles.text}>
                                <p>
                                    Total Amount:
                                </p>
                                <span>
                                    ${(plan?.initialPrice -
                                        (plan?.initialPrice * (plan?.discount || 0) / 100) -
                                        (appliedCoupon?.discount ? (plan?.initialPrice * appliedCoupon.discount / 100) : 0)
                                    ).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.couponCode}>
                        <div className={styles.inputWithError}>
                            <Input
                                label={false}
                                placeholder='Enter coupon code'
                                value={couponCode}
                                onChange={(e) => {
                                    setCouponCode(e.target.value);
                                    if (errors.couponCode) {
                                        setErrors(prev => ({ ...prev, couponCode: '' }));
                                    }
                                }}
                                disabled={isApplying || !!appliedCoupon}
                                error={errors.couponCode}
                            />
                        </div>
                        <Button
                            text={appliedCoupon ? 'Applied' : 'Apply'}
                            onClick={handleApplyCoupon}
                            disabled={isApplying || !couponCode.trim() || !!appliedCoupon}
                            loading={isApplying}
                        />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <Button
                        text='Cancel'
                        onClick={onClose}
                        style={{ marginRight: '10px', background: '#f5f5f5', color: '#333' }}
                    />
                    <Button
                        text={`Pay $${discountedPrice.toFixed(2)}`}
                        fill={true}
                        onClick={handlePayment}
                        disabled={isApplying || isProcessingPayment}
                        loading={isProcessingPayment}
                    />
                </div>
            </div>
        </div>
    );
}
