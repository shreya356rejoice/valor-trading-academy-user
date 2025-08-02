'use client'

import React from 'react'
import styles from './studentSay.module.scss'
import StarIcon from '@/components/icons/starIcon'
import { motion } from 'framer-motion'

const QuoteIcon = '/assets/icons/quote.svg'

// Variants for animation
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const cardContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function StudentSay() {
  return (
    <div className={styles.studentSay}>
      <div className={styles.blur}></div>
      <div className="container-lg">
        <div className={styles.box}>
          <motion.div
            className={styles.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={textVariants}
          >
            <h2>
              What Our <span>Students</span> Say
            </h2>
            <p>Real success stories from our trading community</p>
          </motion.div>

          <motion.div
            className={styles.grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardContainer}
          >
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className={styles.griditems}
                variants={cardVariants}
              >
                <div className={styles.ratingAlignment}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <div className={styles.text}>
                  <p>
                    "The strategies taught here transformed my trading
                    completely. I went from losing money to consistent profits
                    in just 3 months."
                  </p>
                </div>
                <div className={styles.contentAlignment}>
                  <p>💰 +₹2.8L in 6 months</p>
                  <img src={QuoteIcon} alt="QuoteIcon" />
                </div>
                <div className={styles.profileAlignment}>
                  <div className={styles.profile}>MK</div>
                  <div>
                    <p>Rajesh Kumar</p>
                    <span>Forex Trading Mastery</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
