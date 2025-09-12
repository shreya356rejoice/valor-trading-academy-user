import React from 'react'
import styles from './privacyPolicy.module.scss';
import CommonBanner from '@/components/commonBanner';
const Arrow = '/assets/icons/arrow.svg';
export default function PrivacyPolicy() {
    return (
        <div>
            <CommonBanner title='Privacy Policy' description='This Privacy Policy explains how Valor Trading Academy collects, uses, and protects your personal information when you interact with our platform, services, and content.' />
            <div className={styles.privacyPolicyContent}>
                <div className='container'>
                    <h2>
                        privacy Policy Introduction
                    </h2>
                    <p>
                        At Valor Trading Academy, your privacy is important to us. This Privacy Policy outlines how we collect, use, share, and protect your personal information when you access our website, enroll in trading courses, use our Telegram signals, interact with our trading bots, or make purchases through our platform.
                    </p>
                    <div className={styles.allContnetAlignment}>
                        <h2>Privacy Summary</h2>
                        <p>
                            This policy provides an overview of the personal data we collect, why we collect it, how it’s used, and how we ensure its security. We are committed to safeguarding your privacy and being transparent about how your data is handled.
                        </p>
                        <br />
                        <br />
                        <div className={styles.text}>
                            <h3>
                                1. Personally-Identifiable Information:
                            </h3>
                            <p>
                                This data is primarily used to create your account, process purchases, send confirmations, and provide access to members-only services such as courses and bots.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                2. Sensitive Personal Data:
                            </h3>
                            <p>
                                In limited cases, we may require additional verification (e.g., ID proof) for access to high-value features like premium bots or affiliate programs. This information is collected securely and used solely for identity verification and compliance purposes.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                3. Non-Personally-Identifiable Information:
                            </h3>
                            <p>
                                This information helps us understand user behavior and improve our site’s performance and content delivery.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                4. Limited Accessibility:
                            </h3>
                            <p>
                                We aim to make our services accessible to all users. However, some tools—like advanced trading dashboards or real-time bot analytics—may have limited compatibility with older browsers or devices.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                5. Inconsistent Quality:
                            </h3>
                            <p>
                                While we strive to provide up-to-date and reliable educational content and trading tools, all users should exercise caution. Trading carries inherent risk, and we do not guarantee financial outcomes from using our content, bots, or signals.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                6. Market Competition:
                            </h3>
                            <p>
                                To remain competitive and innovative, we may occasionally analyze user engagement and feedback to improve our offerings. However, this data is used in aggregate and never shared in a way that identifies individual users.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                7. Customization Limitations:
                            </h3>
                            <p>
                                We personalize your learning path, Telegram access, and bot usage where possible. However, full customization may be limited by the platform, subscription plan, or technical constraints.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <h3>
                                8. Scalability Issues:
                            </h3>
                            <p>
                                Our algobots and learning platforms are designed to scale. However, occasional performance issues may arise during high-demand periods or technical maintenance.
                            </p>
                        </div>
                        <h2>
                            How We Use Your Information:
                        </h2>
                        <p>
                            You can unsubscribe from promotional emails at any time using the link provided in each message. Essential account communications will continue as needed.
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
                                Used for enabling core functionality such as logging in, remembering progress in courses, and loading content quickly and securely.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Disabling Policy</h5>
                            </div>
                            <p>
                                Disabling cookies may affect your experience, especially features like course tracking, auto-login, bot dashboards, and Telegram integration.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Facebook Custom Audiences</h5>
                            </div>
                            <p>
                                We may use this tool to show you relevant ads on Facebook based on your activity on our website. You can opt out through your Facebook settings.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Pixel Tags</h5>
                            </div>
                            <p>
                                Used to measure engagement with our emails and web content. These help us improve course delivery, bot usage reports, and email communication effectiveness.
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
                                Essential Cookies: These cookies are vital for providing you with services available through our platform. They enable you to access secure areas, such as logging in, and ensure the speedy loading of requested content. Without these cookies, essential services
                                cannot be provided.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Payment Gateways</h5>
                            </div>
                            <p>
                                Your payment info is securely handled by third-party providers like Stripe or Razorpay. We do not store full card data on our servers.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Email & SMS Providers</h5>
                            </div>
                            <p>
                                We may share your email with providers like Mailchimp or SendGrid to send communications about your account or learning journey.
                            </p>
                        </div>
                        <div className={styles.text}>
                            <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Legal & Security Compliance</h5>
                            </div>
                            <p>
                                We may disclose data if required by law or to protect the safety and rights of users, partners, or Valor Trading Academy.
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
