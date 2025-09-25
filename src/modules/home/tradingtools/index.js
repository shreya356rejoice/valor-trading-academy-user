"use client";
import React, { useEffect, useState } from "react";
import styles from "./tradingtools.module.scss";
import { motion } from "framer-motion";
import Sliderarrow from "@/components/icons/sliderarrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBots } from "@/app/api/dashboard";
import { useRouter } from "next/navigation";

const FlashIcon = "/assets/icons/flash.svg";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

function SampleNextArrowmain(props) {
  const { onClick } = props;
  return (
    <div className={styles.nextArrowmain} onClick={onClick}>
      <Sliderarrow />
    </div>
  );
}

function SamplePrevArrowmain(props) {
  const { onClick } = props;
  return (
    <div className={styles.prevArrowmain} onClick={onClick}>
      <Sliderarrow />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <Sliderarrow />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <Sliderarrow />
    </div>
  );
}

export default function Tradingtools() {
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

  const Planscardssettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    arrows: true,
    nextArrow: <SampleNextArrowmain />,
    prevArrow: <SamplePrevArrowmain />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const Planssettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles.tradingtools}>
        <div className={styles.title}>
          <h3>Trading Tools</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
        </div>
        <div className={styles.tradingslider}>
          <Slider {...Planscardssettings}>
            {algobotData.map((algobot, i) => {
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={styles.itemsmain}>
                    <div className={styles.items}>
                      <div className={styles.cardflx}>
                        <div className={styles.cardHeaderAlignment}>
                          <img src={FlashIcon} alt="Cardimage" />
                          <div>
                            <h3>{algobot?.title}</h3>
                            <p>{algobot?.shortDescription}</p>
                          </div>
                        </div>
                        <Slider
                          {...Planssettings}
                          className={styles.planslider}
                        >
                          {algobot?.strategyPlan?.map((plan, i) => (
                            <div key={i} className={styles.planItemmain}>
                              <div className={styles.planItem}>
                                <div className={styles.flex}>
                                  <p className={styles.plantype}>
                                    {plan?.planType}
                                  </p>
                                  <span className={styles.initialprice}>
                                    ${plan?.initialPrice}
                                  </span>
                                </div>
                                <div className={styles.flex}>
                                  <p className={styles.mrp}>{plan?.planType}</p>
                                  <del className={styles.mrpprice}>
                                    ${plan?.initialPrice}
                                  </del>
                                </div>
                                <div className={styles.flex}>
                                  <p className={styles.discount}>
                                    {plan?.planType}
                                  </p>
                                  <span className={styles.discountedprice}>
                                    ${plan?.initialPrice}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {algobotData.map((algobot, i) => {
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={styles.itemsmain}>
                    <div className={styles.items}>
                      <div className={styles.cardflx}>
                        <div className={styles.cardHeaderAlignment}>
                          <img src={FlashIcon} alt="Cardimage" />
                          <div>
                            <h3>{algobot?.title}</h3>
                            <p>{algobot?.shortDescription}</p>
                          </div>
                        </div>
                        <Slider
                          {...Planssettings}
                          className={styles.planslider}
                        >
                          {algobot?.strategyPlan?.map((plan, i) => (
                            <div key={i} className={styles.planItemmain}>
                              <div className={styles.planItem}>
                                <div className={styles.flex}>
                                  <p className={styles.plantype}>
                                    {plan?.planType}
                                  </p>
                                  <span className={styles.initialprice}>
                                    ${plan?.initialPrice}
                                  </span>
                                </div>
                                <div className={styles.flex}>
                                  <p className={styles.mrp}>{plan?.planType}</p>
                                  <del className={styles.mrpprice}>
                                    ${plan?.initialPrice}
                                  </del>
                                </div>
                                <div className={styles.flex}>
                                  <p className={styles.discount}>
                                    {plan?.planType}
                                  </p>
                                  <span className={styles.discountedprice}>
                                    ${plan?.initialPrice}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
