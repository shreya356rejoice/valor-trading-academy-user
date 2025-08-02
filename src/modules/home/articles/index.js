'use client'
import React from 'react';
import styles from './articles.module.scss';
import ProfileIcon from '@/components/icons/profileIcon';
import CalanderIcon from '@/components/icons/calanderIcon';
import Button from '@/components/button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ArticlesImage = '/assets/images/articles.png';

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function Articles() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <div className={styles.articles}>
        <div className='container'>
          <motion.div
            className={styles.title}
            ref={ref}
            variants={titleVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2>
              Financial Insights & <span>Articles</span>
            </h2>
            <p>
              Explore our curated writings on markets, strategies, and more
            </p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {
              [...Array(4)].map((_, i) => (
                <motion.div className={styles.griditems} key={i} variants={cardVariants}>
                  <div className={styles.image}>
                    <img src={ArticlesImage} alt='ArticlesImage' />
                  </div>
                  <div>
                    <h3>
                      5 Essential Risk Management Strategies for Day Trading
                    </h3>
                    <p>
                      Learn how to protect your capital while maximizing
                      profits in volatile markets.
                    </p>
                    <div className={styles.allIconText}>
                      <div className={styles.iconText}>
                        <ProfileIcon />
                        <span>Vikash Kumar</span>
                      </div>
                      <div className={styles.iconText}>
                        <CalanderIcon />
                        <span>Dec 15, 2025</span>
                      </div>
                    </div>
                    <Button text="5 min raed" fill />
                  </div>
                </motion.div>
              ))
            }
          </motion.div>
        </div>
      </div>
      <div className={styles.valorText}>
        <h3>Valor Academy</h3>
      </div>
    </>
  );
}
