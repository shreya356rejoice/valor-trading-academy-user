'use client'

import React from 'react'
import styles from './getCertified.module.scss'
import CheckIcon from '@/components/icons/checkIcon'
import { motion } from 'framer-motion'

const WinnerIcon = '/assets/icons/winner.svg'
const CertificateIcon = '/assets/icons/Certificate.svg'

// Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function GetCertified() {
  return (
    <div className={styles.getCertified}>
      <div className="container">
        <motion.div
          className={styles.title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2>Get Certified by Valor Trading Academy</h2>
          <p>
            Showcase formal credibility with industry-recognized certifications
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.div className={styles.griditems} variants={item}>
            <div className={styles.iconText}>
              <img src={WinnerIcon} alt="WinnerIcon" />
              <h3>Professional Trading Certification</h3>
            </div>
            <div className={styles.text}>
              <p>
                Upon successful completion of our courses, receive certificates
                that validate your trading knowledge and skills. Our
                certifications are recognized in the financial industry.
              </p>
            </div>
            <div className={styles.allIconText}>
              <div className={styles.iconText}>
                <CheckIcon />
                <span>Professional trading certification with lifetime validity</span>
              </div>
              <div className={styles.iconText}>
                <CheckIcon />
                <span>Secure and easily shareable digital certificate</span>
              </div>
              <div className={styles.iconText}>
                <CheckIcon />
                <span>Endorsed by trusted industry partners</span>
              </div>
              <div className={styles.iconText}>
                <CheckIcon />
                <span>Enhances career opportunities in global financial markets</span>
              </div>
            </div>
          </motion.div>

          {/* <motion.div className={styles.griditems} variants={item}>
            <div className={styles.certificate}>
              <div className={styles.iconCenter}>
                <img src={CertificateIcon} alt="CertificateIcon" />
              </div>
              <h4>Sample Certificate</h4>
              <p>Digital certificate with unique verification ID</p>
              <div className={styles.centerButton}>
                <button 
                  aria-label="View Sample Certificate"
                  onClick={() => window.open('https://in.linkedin.com/', '_blank')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M13.332 7.16406C14.6581 7.16406 15.9299 7.69085 16.8676 8.62853C17.8052 9.56621 18.332 10.838 18.332 12.1641V17.9974H14.9987V12.1641C14.9987 11.722 14.8231 11.2981 14.5105 10.9856C14.198 10.673 13.7741 10.4974 13.332 10.4974C12.89 10.4974 12.4661 10.673 12.1535 10.9856C11.841 11.2981 11.6654 11.722 11.6654 12.1641V17.9974H8.33203V12.1641C8.33203 10.838 8.85882 9.56621 9.7965 8.62853C10.7342 7.69085 12.0059 7.16406 13.332 7.16406Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.0013 8H1.66797V18H5.0013V8Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.33464 5.4974C4.25511 5.4974 5.0013 4.7512 5.0013 3.83073C5.0013 2.91025 4.25511 2.16406 3.33464 2.16406C2.41416 2.16406 1.66797 2.91025 1.66797 3.83073C1.66797 4.7512 2.41416 5.4974 3.33464 5.4974Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  LinkedIn Verified
                </button>
              </div>
            </div>
          </motion.div> */}
        </motion.div>

        <motion.div
          className={styles.bottomText}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p>
            All certificates can be verified through our LMS dashboard and are
            endorsed by industry partners.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
