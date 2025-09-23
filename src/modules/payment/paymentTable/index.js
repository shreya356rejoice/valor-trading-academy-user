"use client";
import React, { useEffect, useState } from 'react';
import styles from './paymentTable.module.scss';
import { addmetaAccountNo, downloadInvoice, getpaymentHistory } from '@/app/api/payment';
import DownloadIcon from '@/components/icons/downloadIcon';
import Input from '@/components/input';
import Button from '@/components/button';
import Modal from '@/components/Modal';
import { toast } from 'react-toastify';

const calculateEndDate = (startDate, planType) => {
    if (!startDate || !planType) return '-';
    
    const date = new Date(startDate);
    const planTypeStr = String(planType).toLowerCase();
    
    const monthsMatch = planTypeStr.match(/(\d+)/);
    if (!monthsMatch) return '-';
    
    const months = parseInt(monthsMatch[1], 10);
    if (isNaN(months)) return '-';
    
    date.setMonth(date.getMonth() + months);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

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
    const [submittedAccounts, setSubmittedAccounts] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingInvoices, setLoadingInvoices] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState({});

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
        if (!dateString) return '-';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleOpenModal = (payment, viewMode = false) => {
        setCurrentPayment(payment);
        setIsViewMode(viewMode);
    
        const savedAccounts = payment.metaAccountNo || [];
        const totalAccounts = payment.noOfBots || 1;
    
        if (viewMode) {
            // In view mode, show saved accounts + empty fields for remaining
            const initialAccounts = [
                ...savedAccounts,
                ...Array(Math.max(0, totalAccounts - savedAccounts.length)).fill('')
            ];
            setMetaAccounts(initialAccounts);
            console.log(initialAccounts,"initialAccounts");
            
            // Mark saved accounts as submitted
            const initialSubmitted = {};
            initialAccounts.forEach((account, index) => {
                initialSubmitted[index] = account !== '';
            });
            setSubmittedAccounts(initialSubmitted);
        } else {
            // In edit mode, show all fields (saved + empty)
            const initialAccounts = [
                ...savedAccounts,
                ...Array(Math.max(0, totalAccounts - savedAccounts.length)).fill('')
            ];
            
            setMetaAccounts(initialAccounts);
            
            // Mark saved accounts as submitted
            const initialSubmitted = {};
            initialAccounts.forEach((account, index) => {
                initialSubmitted[index] = account !== '';
            });
            setSubmittedAccounts(initialSubmitted);
        }
    
        setIsModalOpen(true);
    };

    const handleSaveAccount = async (index) => {
        if (isSaving) return;
    
        try {
            setIsSaving(true);
            const accountNumber = metaAccounts[index]?.trim();
            
            if (!accountNumber) {
                toast.error('Please enter an account number');
                return;
            }
    
            if (accountNumber.length !== 6) {
                toast.error('Meta Account number must be exactly 6 digits');
                return;
            }
    
            // Get all account numbers (both existing and new)
            const allAccountNumbers = [...metaAccounts];
            allAccountNumbers[index] = accountNumber; // Update with the current account number
            
            // Filter out empty strings and ensure uniqueness
            const uniqueAccountNumbers = [...new Set(allAccountNumbers.filter(acc => acc.trim() !== ''))];
    
            const response = await addmetaAccountNo(currentPayment._id, uniqueAccountNumbers);
    
            if (response?.success) {
                // Mark all non-empty accounts as submitted
                const newSubmitted = {};
                allAccountNumbers.forEach((acc, idx) => {
                    if (acc.trim() !== '') {
                        newSubmitted[idx] = true;
                    }
                });
                
                setSubmittedAccounts(newSubmitted);
                setMetaAccounts(allAccountNumbers); // Update metaAccounts with the latest values
                await fetchPaymentHistory();
                toast.success('Accounts saved successfully');
            } else {
                console.log("Error while saving meta accounts.");
                toast.error('Failed to save accounts. Please try again.');
            }
        } catch (error) {
            console.error('Error saving meta account:', error);
            toast.error('Failed to save account. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const areAllAccountsSaved = () => {
        // Check if all accounts are either empty or marked as submitted
        return metaAccounts.every((account, index) => {
            const isEmpty = account.trim() === '';
            const isSubmitted = submittedAccounts[index] === true;
            return isEmpty || isSubmitted;
        });
    };

    const handleSaveAllAccounts = async () => {
        if (isSaving) return;

        try {
            setIsSaving(true);
            const validAccounts = metaAccounts
                .map((account, index) => ({
                    account: account.trim(),
                    index
                }))
                .filter(({ account }) => account.length === 6);

            if (validAccounts.length === 0) {
                toast.error('Please enter at least one valid account number');
                return;
            }

            const accountNumbers = validAccounts.map(({ account }) => account);
            const response = await addmetaAccountNo(currentPayment._id, accountNumbers);

            if (response?.success) {
                // Mark all valid accounts as submitted
                const newSubmitted = {};
                metaAccounts.forEach((account, index) => {
                    if (account.trim().length === 6) {
                        newSubmitted[index] = true;
                    }
                });
                setSubmittedAccounts(newSubmitted);
                await fetchPaymentHistory();
                toast.success('All accounts saved successfully');
            } else {
                console.log("Error while saving meta accounts.");
                toast.error('Failed to save accounts. Please try again.');
            }
        } catch (error) {
            console.error('Error saving meta accounts:', error);
            toast.error('Failed to save accounts. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPayment(null);
        setMetaAccounts(['']);
        setSubmittedAccounts({});
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
    <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
            <h2>{isViewMode ? 'Meta Account Numbers' : 'Add Meta Account Numbers'}</h2>
        </div>

            <div className={styles.modalBody}>
                {console.log(metaAccounts,"metaAccounts")
                }
                {/* {isViewMode ? (
                    <div className={styles.accountsList}>
                        {metaAccounts.map((account, index) => (
                            <div key={index} className={`${styles.accountItem} ${styles.accountCard}`}>
                                <div className={styles.accountHeader}>
                                    <span className={styles.accountLabel}>Account {index + 1} : {account || 'N/A'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : ( */}
                    <div className={styles.accountInputs}>
                        {metaAccounts.map((account, index) => (
                            <div 
                                key={index} 
                                className={`${styles.inputCard} ${submittedAccounts[index] ? styles.submitted : ''}`}
                            >
                                <div className={styles.inputHeader}>
                                    <label>Account {index + 1}</label>
                                    {submittedAccounts[index] && (
                                        <span className={`${styles.statusBadge} ${styles.success}`}>
                                            Saved
                                        </span>
                                    )}
                                </div>
                                <div className={styles.inputRow}>
                                    <input
                                        type="text"
                                        value={account}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Allow any number of digits, but validate on save
                                            if (value === '' || /^\d*$/.test(value)) {
                                                const newAccounts = [...metaAccounts];
                                                newAccounts[index] = value;
                                                setMetaAccounts(newAccounts);

                                                if (submittedAccounts[index]) {
                                                    setSubmittedAccounts(prev => ({
                                                        ...prev,
                                                        [index]: false
                                                    }));
                                                }
                                            }
                                        }}
                                        minLength={6}
                                        maxLength={12}  // Optional: Set a reasonable max length
                                        placeholder="Enter at least 6 digits"
                                        className={`${styles.accountInput} ${account.length > 0 && account.length < 6 ? styles.errorInput : ''
                                            } ${submittedAccounts[index] ? styles.submittedInput : ''}`}
                                        disabled={submittedAccounts[index]}
                                    />
                                    <button
                                        className={`${styles.saveButton} ${
                                            !account || account.length !== 6 || submittedAccounts[index] ? styles.disabled : ''
                                        }`}
                                        onClick={() => handleSaveAccount(index)}
                                        disabled={
                                            isSaving || 
                                            !account || 
                                            account.length < 6 || 
                                            submittedAccounts[index] 
                                        }
                                    >
                                        {isSaving ? 'Saving...' : submittedAccounts[index] ? 'Saved' : 'Save'}
                                    </button>
                                </div>
                                {account.length > 0 && account.length < 6 && (
                                    <span className={styles.errorText}>Must be at least 6 digits</span>
                                )}
                            </div>
                        ))}
                    </div>
                {/* )} */}
            </div>

        {/* {!isViewMode && ( */}
            <div className={styles.modalActions}>
                <button 
                    className={`${styles.cancelButton} ${styles.secondaryButton}`} 
                    onClick={handleCloseModal}
                >
                    Close
                </button>
                <button 
                    className={`${styles.saveButton} ${
                        !metaAccounts.every(acc => 
                            acc.trim().length > 5
                        ) || areAllAccountsSaved() ? 
                        styles.disabled : ''
                    }`}
                    onClick={handleSaveAllAccounts}
                    disabled={
                        isSaving || 
                        !metaAccounts.every(acc => 
                            acc.trim().length > 5
                        ) ||
                        areAllAccountsSaved()
                    }
                >
                    {isSaving ? 'Saving...' : areAllAccountsSaved() ? 'Saved' : 'Save All'}
                </button>
            </div>
        {/* )} */}
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
                                    <th>Start Date</th>
                                    <th>End Date</th>
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
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Strategy Name</th>
                                <th>Plan</th>
                                </>
                            )}
                            {selectedTab === 'TELEGRAM' && (<>
                                <th>Start Date</th>
                                <th>End Date</th>
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
                                            <td>
                                                {payment.botId && payment.startDate
                                                    ? formatDate(payment.startDate)
                                                    : payment.telegramId
                                                        ? formatDate(payment.createdAt)
                                                        : '-'}
                                            </td>
                                            <td>
                                                {payment.botId && payment.startDate && payment.planType
                                                    ? calculateEndDate(payment.startDate, payment.planType)
                                                    : payment.telegramId && payment.createdAt && payment.planType
                                                        ? calculateEndDate(payment.createdAt, payment.planType)
                                                        : '-'}
                                            </td>
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
                                        <td>
                                            {payment.botId && payment.startDate
                                                ? formatDate(payment.startDate)
                                                : payment.telegramId
                                                    ? formatDate(payment.createdAt)
                                                    : '-'}
                                        </td>
                                        <td>
                                            {payment.botId && payment.startDate && payment.planType
                                                ? calculateEndDate(payment.startDate, payment.planType)
                                                : payment.telegramId && payment.createdAt && payment.planType
                                                    ? calculateEndDate(payment.createdAt, payment.planType)
                                                    : '-'}
                                        </td>
                                        <td>{payment.botId?.strategyId?.title || '-'}</td>
                                        <td>{payment.planType || '-'}</td>
                                    </>
                                    )}
                                    {selectedTab === 'TELEGRAM' && (<>
                                        <td>
                                            {payment.botId && payment.startDate
                                                ? formatDate(payment.startDate)
                                                : payment.telegramId
                                                    ? formatDate(payment.createdAt)
                                                    : '-'}
                                        </td>
                                        <td>
                                            {payment.botId && payment.startDate && payment.planType
                                                ? calculateEndDate(payment.startDate, payment.planType)
                                                : payment.telegramId && payment.createdAt && payment.planType
                                                    ? calculateEndDate(payment.createdAt, payment.planType)
                                                    : '-'}
                                        </td>
                                        <td>{payment?.telegramId?.telegramId?.channelName || '-'}</td>
                                        <td>{payment.planType || '-'}</td>
                                    </>
                                    )}


                                    <td>${payment.price || '0.00'}</td>
                                    <td>{payment.orderId || '-'}</td>

                                    {(selectedTab === 'BOTS' || selectedTab === 'ALL') && (
                                        <td>
                                            {payment.botId ? (
                                                payment.metaAccountNo?.length > 0 ? (
                                                    <button
                                                        className={styles.viewmore}
                                                        onClick={() => handleOpenModal(payment, true)}
                                                    >
                                                        View More
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={styles.viewmore}
                                                        onClick={() => handleOpenModal(payment, false)}
                                                    >
                                                        Add
                                                    </button>
                                                )
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
