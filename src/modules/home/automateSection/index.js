'use client'
import React, { useEffect, useState } from 'react'
import styles from './automateSection.module.scss'
import Button from '@/components/button'
import TradingAcademy from '../tradingAcademy'
import StudentSay from '../studentSay'
import { motion } from 'framer-motion'
import { getBots } from '@/app/api/dashboard'
import { useRouter } from 'next/navigation'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowIcon from '@/components/icons/arrowIcon'
import Sliderarrow from '@/components/icons/sliderarrow'

const FlashIcon = '/assets/icons/flash.svg'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles.nextArrow}
      onClick={onClick}
    ><Sliderarrow /></div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={styles.prevArrow}
      onClick={onClick}
    ><Sliderarrow /></div>
  );
}


export default function AutomateSection() {
  const [algobotData, setAlgobotData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAlgobotData = async () => {
      try {
        const response = await getBots();
        // Flatten the strategies array from all categories
        const allStrategies = response.payload.data;
        setAlgobotData(allStrategies); // Get first 3 strategies
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAlgobotData();
  }, []);

  const Planssettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
    ]
  };


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
            {algobotData.map((algobot, i) => {
              return (
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
                      <h3>{algobot?.title}</h3>
                      <span className={styles.singleLineText}>{algobot?.shortDescription}</span>
                    </div>

                  </div>

                  {/* <div className={styles.textContent}>
                    {algobot?.strategyPlan?.map((plan, i, array) => (
                      <React.Fragment key={i}>
                        <div className={styles.planItem}>
                          <p>{plan?.planType}</p>
                          <span>${plan?.initialPrice}</span>
                        </div>
                        {i < array.length - 1 && <div className={styles.verticalDivider}></div>}
                      </React.Fragment>
                    ))}
                  </div> */}

                  <Slider {...Planssettings} className={styles.planslider}>
                    {algobot?.strategyPlan?.map((plan, i) => (
                      <div key={i} className={styles.planItemmain}>
                        <div className={styles.planItem}>
                          <p>{plan?.planType}</p>
                          <span>${plan?.initialPrice}</span>
                        </div>
                      </div>
                    ))}
                  </Slider>

                  <div className={styles.freetrial}>
                    <p className={styles.truncateText}>{algobot?.description.replace(/<[^>]*>?/gm, '')}</p>
                  </div>

                  <div className={styles.twoColGrid}>
                    {/* <Button text="Connect & Start" /> */}
                    <Button text="Buy Now" fill onClick={() => router.push(`/algobot-in-details?algobotId=${algobot?._id}`)} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.whiteblur}></div>
      <TradingAcademy />
      <StudentSay />
    </>
  )
}
