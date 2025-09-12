import React from 'react'
import styles from './refundPolicy.module.scss';
import CommonBanner from '@/components/commonBanner';
const Arrow = '/assets/icons/arrow.svg';

export default function RefundPolicy() {
    return (
        <div>
            <CommonBanner title='Refund Policy' description='Our Refund Policy outlines the conditions under which you may request a refund for purchases made through Valor Trading Academy, including courses, subscriptions, and digital tools.' />
            <div className={styles.privacyPolicyContent}>
                <div className='container'>
                    <h2>
                        Refund Policy Introduction
                    </h2>
                    <p>
                    At Valor Trading Academy, we are committed to providing high-quality forex education, trading tools, and services. However, due to the digital nature of our offerings—including online courses, signal channels, and algorithmic trading bots—we maintain a clear and transparent refund policy to protect both our users and our platform.
                    </p>
                    <div className={styles.allContnetAlignment}>
                        <h2>Refund Policy Summary</h2>
                        <p>
                        Refunds are only considered under specific circumstances and are subject to review. Because our services provide immediate digital access or downloadable content, refunds are generally not guaranteed unless a product was purchased in error, found to be defective, or inaccessible due to a platform issue.
All refund requests must be submitted within 7 days of the original purchase. After this period, refunds are not eligible.
                        </p>
                        <br />
                        <br />
                        <div className={styles.text}>
                            <h3>
                                1. Personally-Identifiable Information:
                            </h3>
                            <p>
                            We may request personal information (e.g., your full name, email, transaction ID, or payment method) to verify your identity and process a refund.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                2. Sensitive Personal Data:
                            </h3>
                            <p>
                            We do not store full credit/debit card numbers on our platform. All payments are processed via secure third-party gateways (e.g., Stripe, Razorpay, or UPI). Refunds will be issued using the original payment method.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                3. Non-Personally-Identifiable Information:
                            </h3>
                            <p>
                            We may analyze user data (e.g., course completion, login activity, or usage history) during the refund evaluation process to ensure fair treatment and prevent misuse.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                4. Limited Accessibility:
                            </h3>
                            <p>
                            If our content or services are temporarily unavailable due to scheduled maintenance or downtime, this does not qualify for a refund unless the issue persists for more than 72 hours continuously.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                5. Inconsistent Quality:
                            </h3>
                            <p>
                            Refunds will not be provided based on unsatisfactory trading outcomes, losses from using bots or signals, or course content not meeting personal expectations. Results vary based on user knowledge and market conditions.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                6. Market Competition:
                            </h3>
                            <p>
                            We reserve the right to deny refunds in cases where users attempt to exploit our services, such as copying course content or signals, and then requesting a refund.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                7. Customization Limitations:
                            </h3>
                            <p>
                            If a feature or tool doesn't have certain customization options (e.g., custom indicators in bots), that does not qualify as a refund reason unless advertised differently at the time of purchase.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                8. Scalability Issues:
                            </h3>
                            <p>
                            Performance delays or feature limitations caused by high platform usage or external market conditions are not refundable events.
                            </p>
                        </div>
                        <h2>
                            How We Use Your Information:
                        </h2>
                        <p>
                        At Valor Trading Academy,You may unsubscribe from marketing emails at any time by clicking the “Unsubscribe” link at the bottom of our emails. However, essential communications (such as password resets, payment confirmations, or course access instructions) will still be sent as needed.
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
                            These are required to operate our website. They allow you to log in, resume courses, access Telegram features, and use secure areas of the site. Disabling them may result in a degraded user experience.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Disabling Policy</h5>
                            </div>
                            <p>
                            You may disable non-essential cookies through your browser settings. However, this may prevent full functionality, such as saving your course progress or accessing bot performance dashboards.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Facebook Custom Audiences</h5>
                            </div>
                            <p>
                            We may use your data (e.g., email or browsing behavior) to show personalized ads via Facebook. This helps us reach you with relevant content. You can opt out via Facebook ad settings.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Pixel Tags</h5>
                            </div>
                            <p>
                            Used to monitor open rates, clicks, and engagement with emails and learning material. This allows us to improve your experience and prioritize helpful content.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                2. Disclosure of Information
                            </h3>
                            <br />
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Types of Policy</h5>
                            </div>
                            <p>
                            These cookies are necessary to operate our platform efficiently.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Disabling Policy</h5>
                            </div>
                            <p>
                            If you choose to disable cookies via your browser settings, some features may not function properly.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Facebook Custom Audiences</h5>
                            </div>
                            <p>
                            We may use anonymized data (e.g., email address hashes or site behavior) to create targeted ad campaigns on Facebook or Instagram.
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
