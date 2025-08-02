'use client'
import React from 'react'
import styles from './automateSection.module.scss'
import Button from '@/components/button'
import TradingAcademy from '../tradingAcademy'
import StudentSay from '../studentSay'
import { motion } from 'framer-motion'

const FlashIcon = '/assets/icons/flash.svg'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
}

export default function AutomateSection() {
  return (
    <>
      <div className={styles.automateSection}>
        <div className='container'>
          {/* Title Animation */}
          <motion.div
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Automate Your Trades with Powerful Bots</h2>
            <p>
              Leverage tested strategies for intraday, swing, and crypto trading.
            </p>
          </motion.div>

          {/* Grid Animation */}
          <div className={styles.grid}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.griditems}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.cardHeaderAlignment}>
                  <img src={FlashIcon} alt='FlashIcon' />
                  <div>
                    <h3>Bank Nifty Scalper</h3>
                    <span>Intraday Scalping</span>
                  </div>
                </div>

                <div className={styles.textContent}>
                  <div>
                    <p>Accuracy</p>
                    <span>89%</span>
                  </div>
                  <div>
                    <p>Risk Level</p>
                    <span>Medium</span>
                  </div>
                  <div>
                    <p>Platform Used</p>
                    <span>Zerodha</span>
                  </div>
                </div>

                <div className={styles.freetrial}>
                  <button>
                    <span>Free Trial</span>
                  </button>
                  <p>Then ₹1499/month</p>
                </div>

                <div className={styles.twoColGrid}>
                  <Button text="Connect & Start" />
                  <Button text="Subscribe Now" fill />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.whiteblur}></div>
      <TradingAcademy />
      <StudentSay />
    </>
  )
}
