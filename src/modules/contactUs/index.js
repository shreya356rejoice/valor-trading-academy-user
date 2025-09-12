'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './contactUs.module.scss';
import MessageIcon from '@/components/icons/messageIcon';
import Input from '@/components/input';
import Textares from '@/components/textarea';
import Textarea from '@/components/textarea';
import Button from '@/components/button';
import { toast } from 'react-toastify';
import { sendMessage } from '@/app/api/contactus';
import { getUtilityData } from '@/app/api/dashboard';
import DownArrow from '@/components/icons/downArrow';
import { regions } from '@/regions';
const SmsIcon = '/assets/icons/sms.svg';
const EmailIcon = '/assets/icons/email-sm.svg';
const PhoneIcon = '/assets/icons/phone.svg';
const LocationIcon = '/assets/icons/location.svg';
export default function ContactUs() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phone: '',
        subject: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [utility, setUtility] = useState({})
    const [selectedCountryCode, setSelectedCountryCode] = useState('91');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const countryRef = useRef(null);

    useEffect(() => {
        const fetchUtility = async () => {
            try {
                const response = await getUtilityData();
                setUtility(response.payload || {});
            } catch (error) {
                console.error('Error fetching utility:', error);
                toast.error('Failed to load utility');
            }
        };
        fetchUtility();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
        
        // Normalize email by trimming and converting to lowercase
        const normalizedEmail = form.email.trim().toLowerCase();
        if (!normalizedEmail) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            newErrors.email = 'Invalid email';
        }
        
        // Phone number validation (numbers only, 8-15 digits)
        if (!form.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{8,15}$/.test(form.phone)) {
            newErrors.phone = 'Please enter a valid phone number (8-15 digits)';
        }
        
        if (!form.subject.trim()) newErrors.subject = 'Subject is required';
        if (!form.description.trim()) newErrors.description = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        // Prevent leading/trailing spaces for all fields
        if (typeof value === 'string') {
            value = field === 'phone' 
                ? value.replace(/\D/g, '') // Remove non-digits for phone
                : value.trimStart(); // Only trim start for other fields to allow spaces in between
        }
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        // Trim all string fields before validation
        const trimmedForm = {
            ...form,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim().toLowerCase(),
            subject: form.subject.trim(),
            description: form.description.trim()
        };
        
        setForm(trimmedForm);
        const isValid = validate();
        if (!isValid) {
            toast.error('Please fill in all required fields correctly');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await sendMessage(form);
            if (response.success) {
                toast.success('Your message has been sent successfully!');
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    countryCode: '',
                    subject: '',
                    description: ''
                });
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className={styles.contactUs}>
            <div className={styles.pageTitle}>
                <h2>
                    Have Questions? <span>Let's Talk.</span>
                </h2>
                <p>
                    Your monetisation journey on TagMango starts here!
                </p>
            </div>
            <div className={styles.grid}>
                <div className={styles.griditems}>
                    <div className={styles.icons}>
                        <img src={SmsIcon} alt="SmsIcon" />
                    </div>
                    <div>
                        <h3>
                            Live Chat / WhatsApp
                        </h3>
                        <p>
                            Available 24/7 for instant support
                        </p>
                        <a href="callto:+91 98765 43210" aria-label="+91 98765 43210">+91 98765 43210</a>
                    </div>
                </div>
                <div className={styles.griditems}>
                    <div className={styles.icons}>
                        <img src={EmailIcon} alt="EmailIcon" />
                    </div>
                    <div>
                        <h3>
                            Email
                        </h3>
                        <p>
                            For detailed inquiries
                        </p>
                        <a href="mailto:support@PipsVedatrading.com" aria-label="support@PipsVedatrading.com">support@PipsVedatrading.com</a>
                    </div>
                </div>
                <div className={styles.griditems}>
                    <div className={styles.icons}>
                        <img src={PhoneIcon} alt="PhoneIcon" />
                    </div>
                    <div>
                        <h3>
                            Phone
                        </h3>
                        <p>
                            Call us during business hours
                        </p>
                        <a href="callto:+91 98765 43210" aria-label="+91 98765 43210">+91 98765 43210</a>
                    </div>
                </div>
                <div className={styles.griditems}>
                    <div className={styles.icons}>
                        <img src={LocationIcon} alt="LocationIcon" />
                    </div>
                    <div>
                        <h3>
                            Location
                        </h3>
                        <p>
                            For offline programs
                        </p>
                        <a>Mumbai, Maharashtra</a>
                    </div>
                </div>
            </div>
            <div className={styles.form}>
                <div className={styles.twocol}>
                    <div>
                        <Input label='First Name' placeholder='Enter your first name' value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div>
                        <Input label='Last Name' placeholder='Enter your last name' value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <div>
                        <Input label='Email' placeholder='your.email@example.com' value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                    <div className={styles.telephoninputmain}>
                                <div className={styles.dropdownrelative} ref={countryRef}>
                                    <label>Phone</label>
                                    <div className={styles.telephoninput}>
                                        <div className={styles.countrycodeselectormain}>
                                            <div className={styles.countrycodeselectorrelative}>
                                                <div
                                                    className={styles.countrycodeselector}
                                                    onClick={() => setShowCountryDropdown(prev => !prev)}
                                                    onChange={(e) => handleChange('countryCode', e.target.value)}
                                                >
                                                    <span>{selectedCountryCode}</span>
                                                    <div className={styles.dropdownarrow}><DownArrow /></div>
                                                </div>

                                                {showCountryDropdown && (
                                                    <div className={styles.dropdown}>
                                                        <div className={styles.dropdownSpacing}>
                                                            {regions.map((region) => (
                                                                <div
                                                                    className={styles.iconText}
                                                                    key={`${region.code}-${region.numberCode}-${region.name}`}
                                                                    onClick={() => {
                                                                        setSelectedCountryCode(region.numberCode);
                                                                        handleChange("countryCode", region.numberCode);
                                                                        setShowCountryDropdown(false);
                                                                      }}
                                                                    
                                                                      
                                                                >
                                                                    <span>{region.numberCode}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder='Enter your number'
                                            value={form.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                        />

                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <Input label='Subject' placeholder='How can we help you?' value={form.subject} onChange={(e) => handleChange('subject', e.target.value)} />
                {errors.subject && <p className="error">{errors.subject}</p>}
                <div className={styles.topAlignment}>
                    <Textarea label={'Message'} placeholder='Tell us more about your trading goals or questions...' value={form.description} onChange={(e) => handleChange('description', e.target.value)} disabled={isSubmitting} />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <Button text="Send Message" fill onClick={handleSubmit} />
            </div>
        </div>
    )
}
