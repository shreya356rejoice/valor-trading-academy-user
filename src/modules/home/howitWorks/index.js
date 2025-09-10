'use client'

import React, { useEffect, useState } from 'react'
import styles from './howitWorks.module.scss'
import classNames from 'classnames'
import { motion, useAnimation } from 'framer-motion'

const Images = [
  '/assets/images/how-it-works.png',
  '/assets/images/card3.png',
  '/assets/images/card3.png',
]
const StarIcon = '/assets/icons/star.svg'

export default function HowitWorks() {
  const [step, setStep] = useState(0)

  const activeLine = useAnimation()
  const starMotion = useAnimation()

  useEffect(() => {
    const lineHeights = ['0%', '33%', '66%', '100%']
    const starPositions = ['0%', '25%', '60%', '98%']

    activeLine.start({
      height: lineHeights[step],
      transition: { duration: 0.5 },
    })

    starMotion.start({
      top: starPositions[step],
      transition: { duration: 0.5 },
    })

    const timeout = setTimeout(() => {
      setStep((prev) => (prev + 1) % 4)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [step])

  const stepsList = [
    {
      stepIndex: 1,
      title : "Sign Up & Choose a Course",
      description : "Create your account and select from our comprehensive course catalog tailored to your skill level.",
    },
    {
      stepIndex: 2,
      title : "Attend Live or On-Demand Courses",
      description : "Learn through interactive live sessions or flexible on-demand content at your own pace.",
    },
    {
      stepIndex: 3,
      title : "Join Community & Get Certified",
      description : "Connect with fellow traders, get mentorship, and earn certificates upon course completion.",
    },
  ]

  return (
    <div className={styles.howitWorks}>
      <div className='container'>
        <div className={styles.title}>
          <h2>
            How it <span>Works</span>
          </h2>
          <p>Your Learning Journey in 3 Simple Steps</p>
        </div>

        <div className={styles.grid}>
          {/* Left Side: Text + Stepper */}
          <div className={styles.griditems}>
            <div className={styles.maingrid}>
              {/* Step Line + Star */}
              <div className={styles.line}>
                <motion.div
                  className={styles.active}
                  initial={{ height: '0%' }}
                  animate={activeLine}
                />
                <motion.div
                  className={styles.star}
                  initial={{ top: '0%' }}
                  animate={starMotion}
                >
                  <img src={StarIcon} alt='StarIcon' />
                </motion.div>
              </div>

              {/* Step Texts */}
              <div className={styles.allText}>
                {stepsList.map((step, i) => (
                  <div
                    key={i}
                    className={classNames(styles.text, {
                      [styles.activeText]: step === i,
                    })}
                  >
                    <h3>{`Step ${step.stepIndex} :`}</h3>
                    <p>{step?.title}</p>
                    <span>
                    {step?.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Changing Image */}
          <div className={styles.griditems}>
            <div className={styles.image}>
              {step >= 0 && (
                <motion.img
                  key={step}
                  
                  src={step === 0 ? Images[0] : Images[step - 1]}
                  alt='StepImage'
                  // style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
