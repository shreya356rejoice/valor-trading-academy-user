'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './WebinarRegisterDialog.module.scss';
import Button from '../button';
import { useSearchParams } from 'next/navigation';
import { webinarRegister } from '@/app/api/dashboard';
import { regions } from '@/regions';

const WebinarRegisterDialog = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '',
        brokerName: ''
    });

    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const countryRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const courseId = useSearchParams().get('id');
    const detailCourseId = useSearchParams().get('courseId');

    // Set default country code when component mounts
    useEffect(() => {
        if (regions && regions.length > 0) {
            setFormData(prev => ({
                ...prev,
                countryCode: regions[0].numberCode
            }));
        }
    }, []);

    // Handle body scroll and reset form when dialog is opened/closed
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

            setFormData(prev => ({
                ...prev,
                name: '',
                lastName: '',
                email: '',
                phone: '',
                brokerName: ''
            }));
            setErrors({});
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const nameRegex = /^[a-zA-Z\s'-]+$/;

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Name cannot exceed 50 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        // Country code validation
        if (!formData.countryCode) {
            newErrors.countryCode = 'Country code is required';
        }

        // Broker Name validation
        if (!formData.brokerName.trim()) {
            newErrors.brokerName = 'Broker name is required';
        } else if (formData.brokerName.trim().length < 2) {
            newErrors.brokerName = 'Broker name must be at least 2 characters';
        }

        // Trading Platform validation
        if (!formData.tradingPlatform) {
            newErrors.tradingPlatform = 'Please select a trading platform';
        }

        // Equity validation
        if (!formData.equity) {
            newErrors.equity = 'Please select an equity range';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // For phone input, only allow numbers and limit to 15 digits
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 15) { // Max 15 digits for international numbers
                setFormData(prev => ({
                    ...prev,
                    [name]: digitsOnly
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleCountryCodeSelect = (code) => {
        setFormData(prev => ({
            ...prev,
            countryCode: code
        }));
        setShowCountryDropdown(false);
    };

    const getClientIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip || 'unknown';
        } catch (error) {
            console.error('Error fetching IP:', error);
            return 'unknown';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            console.log(formData, '=======formData');
            
            const ipAddress = await getClientIP();
            
            const inquiryData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                countryCode: `+${formData.countryCode}`,
                brokerName: formData.brokerName,
                tradingPlatform: formData.tradingPlatform,
                equity: formData.equity,
                ipAddress: ipAddress
            };

            console.log(inquiryData, 'inquiryData');
            

            const response = await webinarRegister(inquiryData);

            if (response.success) {
                // Show thank you dialog on success
                setShowThankYou(true);

                // Call the original onSubmit if provided
                if (onSubmit) {
                    await onSubmit(formData);
                }
            } else {
                throw new Error(response.message || 'Failed to submit inquiry');
            }
        } catch (error) {
            console.error('Submission failed:', error);
            setErrors(prev => ({
                ...prev,
                form: error.message || 'Failed to submit the form. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleThankYouClose = () => {
        setShowThankYou(false);
        onClose();
    };

    if (!isOpen) return null;

    if (showThankYou) {
        return (
            <div className={styles.overlay} onClick={handleThankYouClose}>
                <div className={`${styles.dialog} ${styles.thankYouDialog}`} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <h3>Thank You!</h3>
                        <button className={styles.closeButton} onClick={handleThankYouClose}>&times;</button>
                    </div>
                    <div className={styles.thankYouContent}>
                        <div className={styles.checkmark}>✓</div>
                        <h4>Registration Successful</h4>
                        <p>Thank you for registering with us! We've received your information and our team will get in touch with you shortly.</p>
                        <Button
                            type="button"
                            text="Close"
                            onClick={handleThankYouClose}
                            fill
                            className={styles.thankYouButton}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>Let's Connect with us</h3>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter Your Name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={errors.name ? styles.errorInput : ''}
                        />
                        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter Your Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={errors.email ? styles.errorInput : ''}
                        />
                        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <div className={styles.phoneInputContainer}>
                            <div className={styles.countryCodeSelectormain} ref={countryRef}>
                                <div className={styles.countryCodeSelector} ref={countryRef}>
                                    <div
                                        className={styles.countryCodeDisplay}
                                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                    >
                                        <span>{formData.countryCode}</span>
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    {showCountryDropdown && (
                                        <div className={styles.countryDropdown}>
                                            {regions.map((region) => (
                                                <div
                                                    key={`${region.code}-${region.numberCode}`}
                                                    className={styles.countryOption}
                                                    onClick={() => handleCountryCodeSelect(region.numberCode)}
                                                >
                                                    <span>{region.numberCode}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                                className={`${styles.phoneInput} ${errors.phone ? styles.errorInput : ''}`}
                                maxLength={15}
                            />
                        </div>
                        {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Broker Name</label>
                        <input
                            type="text"
                            name="brokerName"
                            placeholder='Enter Your Broker Name'
                            value={formData.brokerName}
                            onChange={handleChange}
                            required
                            className={errors.brokerName ? styles.errorInput : ''}
                        />
                        {errors.brokerName && <span className={styles.errorMessage}>{errors.brokerName}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.radioGroupLabel}>Trading Platform</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="tradingPlatform"
                                    value="MT5"
                                    checked={formData.tradingPlatform === 'MT5'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioCustom}></span>
                                <span>MT5</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="tradingPlatform"
                                    value="CTrader"
                                    checked={formData.tradingPlatform === 'CTrader'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioCustom}></span>
                                <span>CTrader</span>
                            </label>
                        </div>
                        {errors.tradingPlatform && <span className={styles.errorMessage}>{errors.tradingPlatform}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.radioGroupLabel}>Equity</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="equity"
                                    value="Above 5K USD"
                                    checked={formData.equity === 'Above 5K USD'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioCustom}></span>
                                <span>Above 5K USD</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="equity"
                                    value="2K to 5K USD"
                                    checked={formData.equity === '2K to 5K USD'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioCustom}></span>
                                <span>2K to 5K USD</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="equity"
                                    value="1K to 2K USD"
                                    checked={formData.equity === '1K to 2K USD'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioCustom}></span>
                                <span>1K to 2K USD</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="equity"
                                    value="Below 1K USD"
                                    checked={formData.equity === 'Below 1K USD'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                <span className={styles.radioCustom}></span>
                                <span>Below 1K USD</span>
                            </label>
                        </div>
                        {errors.equity && <span className={styles.errorMessage}>{errors.equity}</span>}
                    </div>
                    {errors.form && <div className={styles.formError}>{errors.form}</div>}
                    <div className={styles.buttonContainer}>
                        <Button
                            type="button"
                            text="Cancel"
                            onClick={onClose}
                            disabled={isSubmitting}
                        />
                        <Button
                            type="submit"
                            text={isSubmitting ? 'Submitting...' : 'Submit'}
                            onClick={handleSubmit}
                            fill
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WebinarRegisterDialog;
