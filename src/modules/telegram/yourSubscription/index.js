import React from 'react'
import styles from './yourSubscription.module.scss';
import CloseIcon from '@/components/icons/closeIcon';
import Input from '@/components/input';
import Button from '@/components/button';
export default function YourSubscription() {
    return (
        <div className={styles.yourSubscriptionModalWrapper}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>
                        Complete Your Subscription
                    </h2>
                    <CloseIcon />
                </div>
                <div className={styles.modalbody}>
                    <Input label='Telegram ID' placeholder='Enter your Telegram ID' />
                    <div className={styles.subBox}>
                        <div className={styles.boxHeader}>
                            <h3>1Month Plan
                            </h3>
                        </div>
                        <div className={styles.detailsAlignment}>
                            <div className={styles.text}>
                                <p>Original Price:</p>
                                <span>$197.01</span>
                            </div>
                            <div className={styles.text}>
                                <p>Common Discount (1%):
                                </p>
                                <span>$197.01</span>
                            </div>
                        </div>
                        <div className={styles.totalAmount}>
                            <div className={styles.text}>
                                <p>
                                    Total Amount:
                                </p>
                                <span>$195.04
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.couponCode}>
                        <Input label={false} placeholder='Enter coupon code' />
                        <Button text="Apply" />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <Button text="Cancel" />
                    <Button text="Pay $195.04" fill={true} />
                </div>
            </div>
        </div>
    )
}
