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

const testimonials = [
  {
    review : "I used to jump into forex trades without really knowing what I was doing, and it cost me a lot. These courses gave me a proper structure, from understanding currency pairs to learning how to manage risks. Now when I look at charts, I actually know what I’m seeing, and that has completely changed how I trade.",
    profit : "$1,200 profit in 3 months",
    name : "Seema Agrawal",
    starCount : 4
  },
  {
    review : "Honestly, I never trusted automated systems before, but this bot changed my mind. It doesn’t overtrade, it just follows the strategy I set and keeps things consistent. I can go about my day while it handles entries and exits, and that peace of mind is priceless, Feels like having a smart trader.",
    profit : "$950 profit in 2 months",
    name : "Jaimil Akbari",
    starCount : 5
  },
  {
    review : "What I love about the trading tool is how simple it makes everything. Real-time charts, indicators, and risk controls are all there, so I don’t have to juggle between five different platforms anymore. It feels like having a professional setup without the crazy learning curve.",
    profit : "$1700 profit in 4 months",
    name : "Hussain Sajwani",
    starCount : 5
  }
]

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
            {testimonials.map((item, index) => (
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
                   {item?.review}
                  </p>
                </div>
                <div className={styles.contentAlignment}>
                  <p>💰 {item?.profit}</p>
                  <img src={QuoteIcon} alt="QuoteIcon" />
                </div>
                <div className={styles.profileAlignment}>
                  <div className={styles.profile}>{item?.name[0]}</div>
                  <div>
                    <p>{item?.name}</p>
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
