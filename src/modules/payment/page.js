import React from 'react'
import styles from './payment.module.scss';
import PaymentBanner from './paymentBanner/page';
import PaymentDetails from './paymentDetails/page';
export default function Payment() {
    return (
        <div className={styles.algobotPage}>
            <PaymentBanner />
            <PaymentDetails />
        </div>
    )
}
