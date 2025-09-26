'use client'

import React from 'react'
import styles from './tradingAcademy.module.scss'
import ComputerIcon from '@/components/icons/computerIcon'
import MessageIcon from '@/components/icons/messageIcon'
import ReviewIcon from '@/components/icons/reviewIcon'
import ResourcesIcon from '@/components/icons/resourcesIcon'
import { motion } from 'framer-motion'

const cardData = [
  {
    icon: <ComputerIcon />,
    title: 'Real-world Trading Simulations',
    desc: 'Practice with live market data in a risk-free environment before investing real money.',
  },
  {
    icon: <MessageIcon />,
    title: 'Telegram & Discord Support Channels',
    desc: '24/7 community support with instant access to mentors and fellow traders.',
  },
  {
    icon: <ReviewIcon />,
    title: 'Mentor Feedback & Portfolio Reviews',
    desc: 'Get personalized feedback on your trades and portfolio from experienced professionals.',
  },
  {
    icon: <ResourcesIcon />,
    title: 'Lifetime Access to Resources',
    desc: 'Once enrolled, enjoy unlimited access to all course materials and future updates.',
  },
  {
    icon: <ResourcesIcon />,
    title: 'Certificate of Completion',
    desc: 'Earn recognized certificates that validate your trading knowledge and skills.',
  },
]

// Framer Motion Variants
const containerVariants = {
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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function TradingAcademy() {
  return (
    <div className={styles.tradingAcademy}>
      <div className='container-lg'>
        <div className={styles.box}>
          <motion.div
            className={styles.title}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.4 }}
            variants={textVariants}
          >
            <h2>
              Why EduFins <span>Trading Academy?</span>
            </h2>
            <p>
              Our academy bridges the gap between textbook theory and market
              reality. Whether you're a curious novice or a seasoned trader,
              our curriculum adapts to you.
            </p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.3 }}
          >
            {cardData.map((item, index) => (
              <motion.div
                key={index}
                className={styles.griditems}
                variants={cardVariants}
              >
                <div className={styles.cardBox}>
                  <div className={styles.icons}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
