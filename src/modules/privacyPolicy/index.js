import React from 'react'
import styles from './privacyPolicy.module.scss';
import CommonBanner from '@/components/commonBanner';
const Arrow = '/assets/icons/arrow.svg';
export default function PrivacyPolicy() {
    return (
        <div>
            <CommonBanner title='Privacy Policy' description='Last Updated: August 23, 2025' />
            <div className={styles.privacyPolicyContent}>
                <div className='container'>

                    <p>
                        This privacy policy describes our policies and procedures for the collection, use, and disclosure of your information when you use the service and tells you about your privacy rights and how the law protects you. We use your personal data to provide and improve the service. By using the service, you agree to the collection and use of information per this privacy policy.
                        Welcome to EduFins ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit our website or use our services.
                    </p>
                    <div className={styles.allContnetAlignment}>
                        <h2>Information We Collect</h2>
                        <br />
                        <br />
                        <div className={styles.text}>
                            <h3>
                                1. Personally-Identifiable Information
                            </h3>
                            <p>
                                We may collect personal information such as your name, email address, phone number, and billing details when you voluntarily provide it to us.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                2. Sensitive Personal Data
                            </h3>
                            <p>
                                Certain information, such as payment data or identity documents, may be collected only when required for services and is handled with strict confidentiality.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                3. Non-Personally-Identifiable Information
                            </h3>
                            <p>
                                This includes browser type, device information, and general usage patterns to help us improve our website.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                4. Cookies & Tracking Technologies
                            </h3>
                            <p>
                                We use cookies, pixel tags, and other technologies to improve your experience, remember preferences, and analyze site performance.
                            </p>
                        </div>
                        <h2>
                            How We Use Your Information:
                        </h2>
                            <ul>
                                <li><p>To provide, operate, and maintain our services</p></li>
                                <li><p>To personalize your experience on our website</p></li>
                                <li><p>To process payments securely</p></li>
                                <li><p>To send you updates, promotions, and service information</p></li>
                                <li><p>To comply with legal obligations</p></li>
                            </ul>
                        <br />
                        <br />
                        <h2>
                            Disclosure of Information
                        </h2>
                        <div className={styles.text}>
                            <br />
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Service Providers</h5>
                            </div>
                            <p>
                                We may share information with trusted third-party providers who help us deliver our services.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Legal Requirements</h5>
                            </div>
                            <p>
                                We may disclose personal information when required to comply with legal obligations or protect our rights.
                            </p>
                        </div>
                        <h2>
                            Data Security
                        </h2>
                        <p>We use appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                        </p>
                        <br />
                        <h2>Your Rights</h2>
                        <ul>
                            <li>
                                <p>Access, correct, or delete your personal information</p>
                            </li>
                            <li><p>Opt out of marketing emails at any time</p></li>
                            <li><p>Request details about how we process your data</p></li>
                        </ul>
                        <h2>Contact Us</h2>
                        <p>
                        If you have any questions or concerns regarding these terms and conditions, please contact us at:
                        </p>
                        <br/>
                        <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>EduFins Trading Academy</h5>
                        </div>
                        <ul>
                            <li><p>Email: valortradingacademy@gmail.com</p></li>
                            <li><p>Phone: +971548884386</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>EduFins Academy</h3>
            </div>
        </div>
    )
}
