import React from 'react'
import styles from './termsConditions.module.scss';
import CommonBanner from '@/components/commonBanner';
const Arrow = '/assets/icons/arrow.svg';

export default function TermsConditions() {
    return (
        <div>
            <CommonBanner title='Terms & Conditions' description='Last Updated: August 23, 2025' />
            <div className={styles.privacyPolicyContent}>
                <div className='container'>
                    <div className={styles.allContnetAlignment}>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                        By accessing or using the Valor Trading Academy website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
                        </p>
                        <br />
                        <br />
                        <h2>2. Use of Services</h2>
                        <p>
                        You agree to use Valor's services for lawful purposes and in a manner consistent with these terms and conditions and applicable laws and regulations.
                        </p>
                        <br />
                        <br />
                        <h2>3. User Accounts</h2>
                        <p>
                        To access certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                        </p>
                        <br />
                        <br />
                        <h2>4. Intellectual Property</h2>
                        <p>
                        All content and materials on the Valor website, including but not limited to text, graphics, logos, images, and software, are the property of Valor and are protected by copyright and other intellectual property laws.
                        </p>
                        <br />
                        <br />
                        <h2>5. Prohibited Conduct</h2>
                        <ul>
                            <li><p>Violating any applicable laws or regulations</p></li>
                            <li><p>Impersonating any person or entity</p></li>
                            <li><p>Uploading or transmitting malicious code or content</p></li>
                            <li><p>Interfering with the proper functioning of the website</p></li>
                        </ul>
                        <br />
                        <br />
                        <h2>6. Limitation of Liability</h2>
                        <p>
                        Valor and its affiliates, officers, employees, or agents shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with the use of our services.
                        </p>
                        <br />
                        <br />
                        <h2>7. Termination</h2>
                        <p>
                        We reserve the right to terminate or suspend your account and access to our services at our discretion, without prior notice, for any reason, including if we believe that you have violated these Terms and Conditions.
                        </p>
                        <br />
                        <br />
                        <h2>8. Changes to Terms and Conditions</h2>
                        <p>
                        Valor may update these terms and conditions from time to time. The latest version will be posted on this page with the updated date.
                        </p>
                        <br />
                        <br />
                        <h2>9. Governing Law</h2>
                        <p>
                        These legal terms shall be governed by and defined following the laws of India. Valor and you irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute that may arise in connection with these legal terms.
                        </p>
                        <br />
                        <br />
                        <h2>10. Contact Us</h2>
                        <p>
                        If you have any questions or concerns regarding these terms and conditions, please contact us at:
                        </p>
                        <br/>
                        <div className={styles.iconText}>
                                <img src={Arrow} alt='Arrow' />
                                <h5>Valor Trading Academy</h5>
                        </div>
                        <ul>
                            <li><p>Email: valortradingacademy@gmail.com</p></li>
                            <li><p>Phone: +971548884386</p></li>
                        </ul>
                        
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </div>
    )
}
