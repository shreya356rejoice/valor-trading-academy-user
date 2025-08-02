import React from 'react'
import styles from './contactUs.module.scss';
import MessageIcon from '@/components/icons/messageIcon';
import Input from '@/components/input';
import Textares from '@/components/textarea';
import Textarea from '@/components/textarea';
import Button from '@/components/button';
const SmsIcon = '/assets/icons/sms.svg';
const EmailIcon = '/assets/icons/email-sm.svg';
const PhoneIcon = '/assets/icons/phone.svg';
const LocationIcon = '/assets/icons/location.svg';
export default function ContactUs() {
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
                    <Input label='First Name' placeholder='Enter your first name' />
                    <Input label='Last Name' placeholder='Enter your last name' />
                    <Input label='Email' placeholder='your.email@example.com' />
                    <Input label='Phone Number' placeholder='+91 9999999999' />
                </div>
                <Input label='Subject' placeholder='How can we help you?' />
                <div className={styles.topAlignment}>
                    <Textarea label={'Message'} placeholder='Tell us more about your trading goals or questions...' />
                </div>
                <Button text="Send Message" fill />
            </div>
        </div>
    )
}
