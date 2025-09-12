import React from 'react'
import styles from './payment.module.scss';
import PaymentBanner from './paymentBanner';
import PaymentDetails from './paymentDetails';
import PaymentTable from './paymentTable';
export default function Payment() {
    return (
        <div className={styles.algobotPage}>
            <PaymentBanner />
            {/* <PaymentDetails /> */}
            <PaymentTable />
        </div>
    )
}
