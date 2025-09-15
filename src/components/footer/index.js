'use client'
import React, { useEffect, useState } from 'react'
import styles from './footer.module.scss';
import Button from '../button';
import FacebookIcon from '../icons/facebookIcon';
import TwitterIcon from '../icons/twitterIcon';
import InstagramIcon from '../icons/instagramIcon';
import LinkdinIcon from '../icons/linkdinIcon';
import YoutubeIcon from '../icons/youtubeIcon';
import { createNewsLetter, getUtilityData } from '@/app/api/dashboard';
import Link from 'next/link';
const WhiteLogo = '/assets/logo/whitelogo.svg';

export default function Footer() {
    const [footerData, setFooterData] = useState([]);
    const [email, setEmail] = useState('');
    const [error,setError] = useState('');
    const [succMsg,setSuccMsg] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert email to lowercase before validation
            const normalizedEmail = email.toLowerCase();
            
            if (!validateEmail(normalizedEmail)) {
                setError('Please enter a valid email address');
                return;
            }
            const response = await createNewsLetter({ email: normalizedEmail });
            if (response.success) {
                setSuccMsg('Newsletter Subscribed Successfully.');
                setEmail('');
                setTimeout(() => {
                    setSuccMsg('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error creating newsletter:', error);
            setError('Failed to create newsletter');
        }
    };

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await getUtilityData();
                setFooterData(response.payload);
            } catch (error) {
                console.error('Error fetching footer data:', error);
            }
        };
        fetchFooterData();
    }, []);
    
  return (
    <footer className={styles.footer}>
        <div className='container'>
            <div className={styles.footerGrid}>
                <div className={styles.items}>
                    <div className={styles.logotext}>
                        <img src={WhiteLogo} alt='WhiteLogo'/>
                        <p>
                            Empowering traders with knowledge, community, and proven strategies for lasting 
                            financial success.
                        </p>
                        <div className={styles.socialIcon}>
                            <Link target='_blank' href={footerData?.facebookLink || ''}>
                                    <div>
                                        <FacebookIcon />
                                    </div>
                                </Link>
                                <Link target='_blank' href={footerData?.twitter || ''}>
                                    <div>
                                        <TwitterIcon /> 
                                    </div>
                                </Link>
                                <Link target='_blank' href={footerData?.instagramLink || ''}>
                                    <div>
                                        <InstagramIcon />
                                    </div>
                                </Link>
                                <Link target='_blank' href={footerData?.linkedin || ''}>
                                    <div>
                                        <LinkdinIcon />
                                    </div>
                                </Link>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <h3>
                            Quick Links
                        </h3>
                        <a href="/about-us" aria-label='About'>About</a>
                        <a href="/our-course" aria-label='Courses'>Courses</a>
                        <a href="/blog" aria-label='Blog'>Blog</a>
                        <a href="/faq" aria-label='FAQ'>FAQ</a>
                    </div>
                    <div className={styles.menu}>
                        <h3>
                            Support
                        </h3>
                        <a href="/terms-conditions" aria-label='Terms of Service'>Terms of Service</a>
                        <a href="/privacy-policy" aria-label='Privacy Policy'> Privacy Policy</a>
                        <a href="/refund-policy" aria-label='Refund Policy'>Refund Policy</a>
                    </div>
                </div>
                <div className={styles.items}>
                    <div className={styles.joinText}>
                        <h3>
                            Join Our Newsletter
                        </h3>
                        <p>
                            Join our subscribers list to get the latest news and 
                            special offers.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.inputDesign}>
                        <input 
                            type='email' 
                            placeholder='Your Email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                                setSuccMsg('');
                            }}
                        />
                        <div className={styles.buttonAlignment}>
                            <Button type="submit" text="Subscribe" fill/>
                        </div>
                    </form>
                    <p className={error ? styles.errorMsg : styles.succMsg}>{error ? error : succMsg}</p>
                    {/* <div className={styles.checkboxText}>
                        <input type='checkbox'/>
                        <span>I agree to the Privacy Policy</span>
                    </div> */}
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.copright}>
                <p>
                    © 2025 Valor Trading Academy. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  )
}
