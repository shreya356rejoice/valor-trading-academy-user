'use client'

import React from 'react'
import styles from './thisJourney.module.scss'
import Button from '@/components/button'
import { motion } from 'framer-motion'

const TypeIcon = '/assets/icons/type.svg'
const TopLayer = '/assets/images/top-layer.svg'
const Linevec = '/assets/images/line-vec.png'

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const cardContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ThisJourney() {
  return (
    <>
      <div className={styles.thisJourney}>
        <div className={styles.lineVec}>
          <img src={Linevec} alt="Linevec" />
        </div>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.griditems}>
              <motion.div
                className={styles.text}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <h2>
                  You're Not Alone On <span>This Journey</span>
                </h2>
                <p>
                  Get support, share trades, and learn together in our vibrant
                  community.
                </p>
              </motion.div>
            </div>

            <motion.div
              className={styles.griditems}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardContainer}
            >
              <div className={styles.cardGrid}>
                {/* {[0, 1].map((i) => ( */}
                  <motion.div
                    // key={i}
                    className={styles.cardGridItems}
                    variants={cardItem}
                  >
                    <div className={styles.image}>
                      <img src={TypeIcon} alt="TypeIcon" />
                    </div>
                    <div className={styles.details}>
                      <h3>
                        Join Telegram Group
                      </h3>
                      <p>
                       
                          Connect with 15,000+ active traders for daily insights and live discussions
                          {/* : 'Access our detailed forum for in-depth trading discussions and analysis'} */}
                      </p>
                      <Button onClick={() => window.open('https://t.me/algomaticbot', '_blank')} text={'Join Community'} />
                    </div>
                  </motion.div>
                {/* ))} */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className={styles.toplayer}>
        <img src={TopLayer} alt="TopLayer" />
      </div>
    </>
  )
}
