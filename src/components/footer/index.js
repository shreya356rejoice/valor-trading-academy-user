import React from 'react'
import styles from './footer.module.scss';
import Button from '../button';
import FacebookIcon from '../icons/facebookIcon';
import TwitterIcon from '../icons/twitterIcon';
import InstagramIcon from '../icons/instagramIcon';
import LinkdinIcon from '../icons/linkdinIcon';
import YoutubeIcon from '../icons/youtubeIcon';
const WhiteLogo = '/assets/logo/whitelogo.svg';
export default function Footer() {
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
                            <FacebookIcon/>
                            <TwitterIcon/>
                            <InstagramIcon/>
                            <LinkdinIcon/>
                            <YoutubeIcon/>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <h3>
                            Quick Links
                        </h3>
                        <a aria-label='About'>About</a>
                        <a aria-label='Courses'>Courses</a>
                        <a aria-label='Blog'>Blog</a>
                        <a aria-label='Contact'>Contact</a>
                        <a aria-label='FAQ'>FAQ</a>
                    </div>
                    <div className={styles.menu}>
                        <h3>
                            Support
                        </h3>
                        <a aria-label='Terms of Service'>Terms of Service</a>
                        <a aria-label='Privacy Policy'>Privacy Policy</a>
                        <a aria-label='Telegram Group'>Telegram Group</a>
                        <a aria-label='Refund Policy'>Refund Policy</a>
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
                    <div className={styles.inputDesign}>
                        <input type='text' placeholder='Your Email'/>
                        <div className={styles.buttonAlignment}>
                            <Button text="Subscribe" fill/>
                        </div>
                    </div>
                    <div className={styles.checkboxText}>
                        <input type='checkbox'/>
                        <span>I agree to the Privacy Policy</span>
                    </div>
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
