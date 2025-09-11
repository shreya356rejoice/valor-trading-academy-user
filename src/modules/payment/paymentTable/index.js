import React from 'react'
import styles from './paymentTable.module.scss';
export default function PaymentTable() {
    return (
        <div className={styles.paymentTable}>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Purchased Date</th>
                        <th>Strategy Name</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Meta Account No.</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [...Array(14)].map((_, i) => {
                            return (
                                <tr key={i}>
                                    <td>1</td>
                                    <td>13/08/2025, 17:15:10</td>
                                    <td>Core (Manual Arbi...)</td>
                                    <td>1 Month</td>
                                    <td>$46</td>
                                    <td>po2309846987787898</td>
                                    <td>
                                        <button className={styles.viewmore}>View More</button>
                                    </td>
                                    <td>
                                        <button className={styles.status}>Paid</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}


