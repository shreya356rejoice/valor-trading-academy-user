import React from 'react'
import styles from './refundPolicy.module.scss';
import CommonBanner from '@/components/commonBanner';
const Arrow = '/assets/icons/arrow.svg';

export default function RefundPolicy() {
    return (
        <div>
            <CommonBanner title='Refund Policy' description='Last Updated: August 23, 2025' />
            <div className={styles.privacyPolicyContent}>
                <div className='container'>
                    <div className={styles.allContnetAlignment}>
                        <h2>1. General Policy</h2>
                        <p>
                            At Valor, all sales are final. We do not offer refunds or exchanges for any products, subscriptions, or services once a purchase has been completed.
                        </p>
                        <br />
                        <h2>2. Non-Refundable Items</h2>
                        <ul>
                            <li><p>Subscription fees once processed</p></li>
                            <li><p>Digital products or downloadable content</p></li>
                            <li><p>Services that have already been delivered or accessed</p></li>
                        </ul>
                        <br /> <h2>3. Responsibility of Users</h2>
                        <p>
                        By completing a purchase with Valor, you acknowledge and agree that you are responsible for understanding the services and products you are buying. We encourage you to carefully review all product information before making a payment.
                        </p>
                        <br /> <h2>4. Exceptional Circumstances</h2>
                        <p>
                        While refunds are not provided, Valor reserves the right to review special cases at our sole discretion, such as duplicate transactions or technical errors. Approved cases, if any, will be resolved through account credits or alternative solutions rather than monetary refunds.
                        </p>
                        <br /> <h2>5. Contact Us</h2>
                        <p>
                        If you have any questions or concerns regarding these terms and conditions, please contact us at:
                        </p>
                        <br/>
                        <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Valor Trading Academy</h5>
                        </div>
                        <ul>
                            <li><p>Email: valortradingacademy@gmail.com</p></li>
                            <li><p>Phone: +971548884386</p></li>
                        </ul>
                        
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </div>
    )
}
