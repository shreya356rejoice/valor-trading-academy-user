"use client";
import React, { useEffect, useState } from 'react';
import styles from './paymentTable.module.scss';
import { downloadInvoice, getpaymentHistory } from '@/app/api/payment';
import Modal from '@/components/Modal';
import DownloadIcon from '@/components/icons/downloadIcon';

const TABS = {
    ALL: { label: 'All Payments', type: '' },
    COURSES: { label: 'Course Sales', type: 'Course' },
    BOTS: { label: 'Bots Sales', type: 'Bot' },
    TELEGRAM: { label: 'Telegram Sales', type: 'Telegram' },
};

export default function PaymentTable() {
    const [payments, setPayments] = useState([]);
    const [selectedTab, setSelectedTab] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
    });
    const [currentPayment, setCurrentPayment] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const [metaAccounts, setMetaAccounts] = useState(['']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingInvoices, setLoadingInvoices] = useState({});

    const fetchPaymentHistory = async () => {
        try {
            setLoading(true);
            const response = await getpaymentHistory(TABS[selectedTab]?.type || '', {
                page: pagination.page,
                limit: pagination.limit
            });

            setPayments(response.payload?.data || []);
            setPagination(prev => ({
                ...prev,
                total: response.payload?.pagination?.total || 0,
                totalPages: response.payload?.pagination?.totalPages || 1
            }));
        } catch (error) {
            console.error('Failed to fetch payment history:', error);
            // Handle error (e.g., show error message)
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        // Reset to first page when changing tabs
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    useEffect(() => {
        fetchPaymentHistory();
    }, [pagination.page, pagination.limit, selectedTab]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const formatDate = (dateString) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return new Date(dateString).toLocaleString('en-GB', options);
    };

    const handleOpenModal = (payment, viewMode = false) => {
        setCurrentPayment(payment);
        setIsViewMode(viewMode);

        if (viewMode) {
            // If viewing existing accounts
            setMetaAccounts(payment.metaAccountNo || []);
        } else {
            // If adding new accounts, create empty inputs based on noOfBots
            const initialAccounts = Array(payment.noOfBots || 1).fill('');
            setMetaAccounts(initialAccounts);
        }

        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPayment(null);
        setMetaAccounts(['']);
    };

    const calculateExpiryDate = (purchaseDate, planDuration) => {
        if (!planDuration || planDuration === 'N/A') return null;
    
        const purchase = new Date(purchaseDate);
        const duration = parseInt(planDuration);
     
        if (planDuration.includes('Month')) {
            purchase.setMonth(purchase.getMonth() + duration);
        } else if (planDuration.includes('year')) {
            purchase.setFullYear(purchase.getFullYear() + duration);
        }
        return purchase.toLocaleDateString("en-US");
    };

    const handleDownloadInvoice = async (payment) => {
        try {
            setLoadingInvoices(prev => ({ ...prev, [payment._id]: true }));
            const expiryDate = payment.planExpiry || 
                             calculateExpiryDate(payment.createdAt, payment.planType); 
            
            // Handle date safely
            let purchaseDate = 'N/A';
            if (payment.createdAt) {
                const date = new Date(payment.createdAt);
                purchaseDate = !isNaN(date.getTime()) ? date.toLocaleDateString("en-US") : 'Invalid date';
            }

            const invoicePayload = {
                transactionId: payment.orderId,
                purchaseDate: purchaseDate,
                expiryDate: expiryDate,
                items: [
                    {
                        planName:
                            payment.telegramId?.telegramId?.channelName ||
                            payment.botId?.strategyId?.title ||
                            payment.courseId?.CourseName ||
                            "N/A",
                        planDuration: payment.planType || "N/A",
                        metaNo: payment.telegramAccountNo || payment.metaAccountNo?.[0] || "N/A",
                        qty: payment.noOfBots || 1,
                        amount: parseFloat(payment.price) || 0,
                    },
                ],
                couponDiscount: payment.couponDiscount > 0 ? `-${payment.couponDiscount}` : "-",
                planDiscount: payment.discount > 0 ? `-${payment.discount}` : "-",
                totalValue: parseFloat(payment.initialPrice) || 0,
                total: parseFloat(payment.price) || 0,
            };

            const response = await downloadInvoice(invoicePayload);

            if (response.success && response.payload) {

                const pdfRes = await fetch(response.payload);
                const blob = await pdfRes.blob();

                const url = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = `invoice-${payment.orderId || Date.now()}.pdf`;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);

            } else {
                throw new Error("Failed to generate invoice");
            }
        } catch (error) {
            console.error("Error generating invoice:", error);
        } finally {
            setLoadingInvoices(prev => ({ ...prev, [payment._id]: false }));
        }
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className={styles.metaAccountNo}>{isViewMode ? 'Meta Account Numbers' : 'Add Meta Account Numbers'}</h2>
                <div className={styles.modalContent}>
                    {isViewMode ? (
                        <div className={styles.accountsList}>
                            {metaAccounts.map((account, index) => (
                                <div key={index} className={styles.accountItem}>
                                    <span>Account {index + 1} : </span>
                                    <span>{account || 'N/A'}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.accountInputs}>
                            {metaAccounts.map((account, index) => (
                                <div key={index} className={styles.inputGroup}>
                                    <label>Account {index + 1}:</label>
                                    <input
                                        type="text"
                                        value={account}
                                        onChange={(e) => {
                                            const newAccounts = [...metaAccounts];
                                            newAccounts[index] = e.target.value;
                                            setMetaAccounts(newAccounts);
                                        }}
                                        placeholder={`Enter Meta Account ${index + 1}`}
                                    />
                                </div>
                            ))}
                            <div className={styles.modalActions}>
                                <button className={styles.saveButton}>Save</button>
                                <button className={styles.cancelButton} onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>

            <div className={styles.tabCenteralignment}>
                <div className={styles.tab}>
                    {Object.entries(TABS).map(([key, { label }]) => (
                        <button
                            key={key}
                            className={selectedTab === key ? styles.active : ''}
                            onClick={() => handleTabChange(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.paymentTable}>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Purchased Date</th>
                            {selectedTab === 'ALL' && (
                                <>
                                    <th>Course Name</th>
                                    <th>Strategy Name</th>
                                    <th>Telegram Channel</th>
                                    <th>Course Type</th>
                                    <th>Plan</th>
                                </>
                            )}
                            {selectedTab === 'COURSES' && (
                                <>
                                    <th>Course Name</th>
                                    <th>Course Type</th>
                                </>
                            )}
                            {selectedTab === 'BOTS' && (<>
                                <th>Strategy Name</th>
                                <th>Plan</th>
                                </>
                            )}
                            {selectedTab === 'TELEGRAM' && (<>
                                <th>Telegram Channel</th>
                                <th>Plan</th></>
                            )}
                            
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            {(selectedTab === 'BOTS' || selectedTab === 'ALL') && (
                                <th>Meta Account No.</th>
                            )}
                            <th>Status</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className={styles.loadingCell}>
                                    Loading...
                                </td>
                            </tr>
                        ) : payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment._id || index}>
                                    <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                    <td>{formatDate(payment.createdAt)}</td>
                                    
                                    {/* Conditional rendering based on selected tab */}
                                    {selectedTab === 'ALL' && (
                                        <>
                                            <td>{payment.courseId?.CourseName || '-'}</td>
                                            <td>{payment.botId?.strategyId?.title || '-'}</td>
                                            <td>{payment?.telegramId?.telegramId?.channelName || '-'}</td>
                                            <td>{payment.courseId?.courseType || '-'}</td>
                                            <td>{payment.planType || '-'}</td>
                                        </>
                                    )}
                                    {selectedTab === 'COURSES' && (
                                        <>
                                            <td>{payment.courseId?.CourseName || '-'}</td>
                                            <td>{payment.courseId?.courseType || '-'}</td>
                                        </>
                                    )}
                                    {selectedTab === 'BOTS' && (<>
                                        <td>{payment.botId?.strategyId?.title || '-'}</td>
                                        <td>{payment.planType || '-'}</td>
                                        </>
                                    )}
                                    {selectedTab === 'TELEGRAM' && (<>
                                        <td>{payment?.telegramId?.telegramId?.channelName || '-'}</td>
                                        <td>{payment.planType || '-'}</td>
                                        </>
                                    )}
                                    
                                    
                                    <td>${payment.price || '0.00'}</td>
                                    <td>{payment.orderId || '-'}</td>
                                    
                                    {(selectedTab === 'BOTS' || selectedTab === 'ALL') && (
                                        <td>
                                            {payment.metaAccountNo?.length > 0 ? (
                                                <button
                                                    className={styles.viewmore}
                                                    onClick={() => handleOpenModal(payment, true)}
                                                >
                                                    View More
                                                </button>
                                            ) : "-"}
                                        </td>
                                    )}
                                    
                                    <td>
                                        <button className={`${styles.status} ${styles[payment.status?.toLowerCase() || '']}`}>
                                            {payment.status || 'Pending'}
                                        </button>
                                    </td>
                                        <td><span
                                                    onClick={() => !loadingInvoices[payment._id] && handleDownloadInvoice(payment)}
                                                    title={
                                                        loadingInvoices[payment._id]
                                                            ? "Generating invoice..."
                                                            : "Download Invoice"
                                                    }
                                                    style={{
                                                        cursor: loadingInvoices[payment._id] ? 'not-allowed' : 'pointer',
                                                        display: 'inline-flex',
                                                        opacity: loadingInvoices[payment._id] ? 0.6 : 1
                                                    }}
                                                >
                                                    {loadingInvoices[payment._id] ? (
                                                        <span className={styles.downloadAnimation}>
                                                            <DownloadIcon />
                                                        </span>
                                                    ) : (
                                                        <DownloadIcon />
                                                    )}
                                                </span></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className={styles.noData}>
                                    No payment history found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {pagination.totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {pagination.page} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page >= pagination.totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
