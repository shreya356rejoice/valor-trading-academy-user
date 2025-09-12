import React from 'react'
import styles from './termsConditions.module.scss';
import CommonBanner from '@/components/commonBanner';
const Arrow = '/assets/icons/arrow.svg';

export default function TermsConditions() {
    return (
        <div>
            <CommonBanner title='Terms & Conditions' description='These Terms & Conditions govern your use of Valor Trading Academys website, services, and products, including courses, trading bots, and Telegram channels.' />
            <div className={styles.privacyPolicyContent}>
                <div className='container'>
                    <h2>
                        Introduction
                    </h2>
                    <p>
                        Welcome to Valor Trading Academy. By accessing or using our website, purchasing our products, enrolling in our courses, or participating in our Telegram channels, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding. These terms apply to all users, whether you're browsing, buying, subscribing, or using our automated trading tools (algobots).
                    </p>
                    <div className={styles.allContnetAlignment}>
                        <h2>Terms & Conditions Summary</h2>
                        <p>
                            Valor Trading Academy provides forex trading education, automated trading tools, and community-based resources. Your use of our platform and services implies agreement with the terms regarding privacy, usage, intellectual property, and payment policies outlined below.
                        </p>
                        <br />
                        <br />
                        <div className={styles.text}>
                            <h3>
                                1. Personally-Identifiable Information:
                            </h3>
                            <p>
                                We collect personal information (e.g., full name, email, phone number, billing details) only when voluntarily provided during registration or purchase. This data is used strictly for account management, order processing, and secure access to services.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                2. Sensitive Personal Data:
                            </h3>
                            <p>
                                We may collect limited sensitive data such as ID proof for verification purposes when required for specific services (e.g., premium bots or regulatory compliance). All data is stored securely and is never shared with third parties without consent.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                3. Non-Personally-Identifiable Information:
                            </h3>
                            <p>
                                We may automatically collect anonymized user data, such as IP address, browser type, and usage behavior, to help improve our website functionality and content relevance.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                4. Limited Accessibility:
                            </h3>
                            <p>
                                We strive to make our platform accessible on all modern devices. However, some features (e.g., advanced algobot dashboards) may require specific browsers or screen resolutions. If you face accessibility issues, contact our support.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                5. Course & Content Accuracy:
                            </h3>
                            <p>
                                While we work hard to ensure high-quality, up-to-date forex education, Valor Trading Academy does not guarantee financial success or profit. All trading involves risk. Course content may be updated periodically without prior notice.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                6. Algorithmic Trading Tools (Algobots):
                            </h3>
                            <p>
                                Use of our bots requires acceptance of associated risks. We provide bots as tools to support your trading, not as guaranteed profit-making systems. We are not liable for any losses incurred while using bots.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                7. Telegram Channel Usage:
                            </h3>
                            <p>
                                Access to our Telegram groups is restricted to subscribed users. Information shared is educational and should not be considered financial advice. Misuse of community resources may lead to removal from channels without refund.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                8. Payment & Refund Policy:
                            </h3>
                            <p>
                                All course purchases, bot subscriptions, or signal channel payments are processed securely. Refunds are only applicable under specific conditions, such as technical issues or duplicate charges. All refund requests must be made within 7 days of payment.
                            </p>
                        </div>
                        <h2>
                            How We Use Your Information:
                        </h2>
                        <p>
                            Valor uses your data to deliver services, offer personalized content, and communicate updates about courses, promotions, and AlgoBot performance. You can opt out of promotional emails at any time. We do not sell your personal data to third parties.
                        </p>
                        <br />
                        <br />
                        <h2>
                            What is a privacy policy?
                        </h2>
                        <div className={styles.text}>
                            <h3>
                                1. Types of Policy
                            </h3>
                            <br />
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Essential Cookies</h5>
                            </div>
                            <p>
                                These cookies are vital for delivering core platform functionality, such as logging in, securing your sessions, remembering your preferences, and ensuring fast loading of content. Without these cookies, some services on the site will not work properly.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Disabling Policy</h5>
                            </div>
                            <p>
                                If you choose to disable cookies in your browser, some parts of our site (such as member-only content, bot dashboards, or course progress tracking) may not function correctly. Disabling may affect your overall user experience.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Pixel Tags</h5>
                            </div>
                            <p>
                                Pixel tags (also known as web beacons) help us understand how users interact with our emails and website. These allow us to improve user experience, course recommendations, and the effectiveness of our Telegram and ad campaigns.
                            </p>
                        </div>
                        {/* <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Pixel Tags</h5>
                            </div>
                            <p>
                                Essential Cookies: These cookies are vital for providing you with services available through our platform. They enable you to access secure areas, such as logging in, and ensure the speedy loading of requested content. Without these cookies, essential services
                                cannot be provided.
                            </p>
                        </div> */}
                        <div className={styles.text}>
                            <h3>
                                2. Disclosure of Information
                            </h3>
                            <br />
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Payment Processors</h5>
                            </div>
                            <p>
                            We use secure third-party services (e.g., Stripe, Razorpay) to process payments for courses, Telegram access, or algobot subscriptions. Your billing details are encrypted and stored securely by these processors.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Disabling Policy</h5>
                            </div>
                            <p>
                            With your consent, we may share limited information with platforms like Mailchimp, Facebook Ads, or Google Analytics to improve communication, marketing, and audience reach.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Legal Obligations</h5>
                            </div>
                            <p>
                            We may disclose personal information when required by law, regulation, or legal request, including to protect the safety and rights of Valor Trading Academy, its users, or the public.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </div>
    )
}
