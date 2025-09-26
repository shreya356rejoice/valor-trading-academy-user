"use client";
import React, { useEffect, useState } from "react";
import styles from "./automateSection.module.scss";
import Button from "@/components/button";
import TradingAcademy from "../tradingAcademy";
import StudentSay from "../studentSay";
import { motion } from "framer-motion";
import { getBots } from "@/app/api/dashboard";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowIcon from "@/components/icons/arrowIcon";
import Sliderarrow from "@/components/icons/sliderarrow";
import Image from "next/image";
import Tradingtools from "../tradingtools";

const FlashIcon = "/assets/icons/flash.svg";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

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

export default function AutomateSection() {
  const [algobotData, setAlgobotData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAlgobotData = async () => {
      try {
        const response = await getBots();
        // Flatten the strategies array from all categories
        const allStrategies = response.payload.data;
        console.log(allStrategies, "allStrategies");

        setAlgobotData(allStrategies); // Get first 3 strategies
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAlgobotData();
  }, []);

  const handleNavigate = (algobot) => {
    router.push(`/algobot-in-details?algobotId=${algobot?._id}`);
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
      <div className={styles.automateSectionbg}>
        <div className="container-lg">
          <div className={styles.automateSectionmain}>
            <div className={styles.automateSection}>
              <div className="container">
                {/* Title Animation */}
                <motion.div
                  className={styles.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2>Automate Your Trades with <span>Powerful AlgoBots</span></h2>
                  <p>
                    Execute forex trades automatically with precision driven strategies.
                  </p>
                </motion.div>

                <div className={styles.categorytitle}>
                  <h2>ARBITRAGE ALGO                  </h2>
                </div>
                {/* Grid Animation */}
                <div className={styles.grid}>
                  {algobotData.filter(algobot => algobot?.categoryId?.title !== "Trading Tools")
                    .map((algobot, i) => {
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
                          <div className={styles.cardflx}>
                            {console.log(algobot, "====algobot")
                            }
                            <div className={styles.cardHeaderAlignment}>
                              <img src={algobot?.imageUrl} alt="Cardimage" />
                              <div>
                                <h3>{algobot?.title}</h3>
                                <p>{algobot?.shortDescription}</p>
                              </div>
                              {/* <img src={FlashIcon} alt='FlashIcon' />
                    <div>
                      <h3>{algobot?.title}</h3>
                      <span className={styles.singleLineText}>{algobot?.shortDescription}</span>
                    </div> */}
                            </div>
                            <div>
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
                                          ${plan?.price}
                                        </span>
                                      </div>
                                      <div className={styles.flex}>
                                        <p className={styles.mrp}>
                                          M.R.P.:
                                        </p>
                                        <del className={styles.mrpprice}>
                                          ${plan?.initialPrice}
                                        </del>
                                      </div>
                                      <div className={styles.flex}>
                                        <p className={styles.discount}>
                                          Discount:
                                        </p>
                                        <span className={styles.discountedprice}>
                                          -{plan?.discount}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </Slider>

                              {console.log(algobot,"algobot")
                              }

                              <div className={styles.buttons}>
                                <Button
                                  text="Buy Now"
                                  onClick={() => handleNavigate(algobot)}
                                />
                              </div>
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

                          {/* <Slider {...Planssettings} className={styles.planslider}>
                    {algobot?.strategyPlan?.map((plan, i) => (
                      <div key={i} className={styles.planItemmain}>
                        <div className={styles.planItem}>
                          <p>{plan?.planType}</p>
                          <span>${plan?.initialPrice}</span>
                        </div>
                      </div>
                    ))}
                  </Slider> */}

                          {/* <div className={styles.freetrial}>
                    <p className={styles.truncateText}>{algobot?.description.replace(/<[^>]*>?/gm, '')}</p>
                  </div> */}

                          {/* <div className={styles.twoColGrid}>
                    <Button text="Buy Now" fill onClick={() => router.push(`/algobot-in-details?algobotId=${algobot?._id}`)} />
                  </div> */}
                        </motion.div>
                      );
                    })}
                </div>
                <div className={styles.seeMorebutton}>
                  <Button text="See More" onClick={() => router.push("/algobot")} light />
                </div>

                <Tradingtools />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.whiteblur}></div>
      <TradingAcademy />
      <StudentSay />
    </>
  );
}
