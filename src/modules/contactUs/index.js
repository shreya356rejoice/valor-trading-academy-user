'use client'
import React, { useState } from 'react'
import styles from './contactUs.module.scss';
import MessageIcon from '@/components/icons/messageIcon';
import Input from '@/components/input';
import Textares from '@/components/textarea';
import Textarea from '@/components/textarea';
import Button from '@/components/button';
import { toast } from 'react-toastify';
import { sendMessage } from '@/app/api/contactus';
const SmsIcon = '/assets/icons/sms.svg';
const EmailIcon = '/assets/icons/email-sm.svg';
const PhoneIcon = '/assets/icons/phone.svg';
const LocationIcon = '/assets/icons/location.svg';
export default function ContactUs() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = 'Invalid email';
        }
        if (!form.phone.trim()) newErrors.phone = 'Phone is required';
        if (!form.subject.trim()) newErrors.subject = 'Subject is required';
        if (!form.description.trim()) newErrors.description = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        console.log(form);
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
                        <Input label='Phone Number' placeholder='+91 9999999999' value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                        {errors.phone && <p className="error">{errors.phone}</p>}
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
