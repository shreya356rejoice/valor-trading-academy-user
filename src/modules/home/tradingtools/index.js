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
import Button from "@/components/button";
import Commoncard from "@/components/commoncard";

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

  const handleNavigate = (algobot) => {
    console.log(algobot, "===========algobot");

    router.push(`/algobot-in-details?algobotId=${algobot?._id}`);
  };

  const Planscardssettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    arrows: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    // nextArrow: <SampleNextArrowmain />,
    // prevArrow: <SamplePrevArrowmain />,
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

  return (
    <>
      <div className={styles.tradingtools}>
        <div className={styles.title}>
          <h3>
            <p>
              Trading Tools
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              ></motion.span>
            </p>
          </h3>
          <p>
            Smart tools designed to analyze markets, optimize strategies, and
            enhance your trading decisions.
          </p>
        </div>
        <div className="container-md">
          <div className={styles.tradingslider}>
            <Slider {...Planscardssettings}>
              {algobotData
                .filter(
                  (algobot) => algobot?.categoryId?.title === "Trading Tools"
                )
                .map((algobot, i) => {
                  return (
                    <>
                      <motion.div
                        key={i}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.itemsmain}
                      >
                        <Commoncard
                          imageUrl={algobot?.imageUrl}
                          title={algobot?.title}
                          shortDescription={algobot?.shortDescription}
                          plans={algobot?.strategyPlan?.map((plan) => ({
                            planType: plan?.planType,
                            price: plan?.initialPrice,
                            initialPrice: plan?.price,
                            discount: plan?.discount,
                          }))}
                        >
                          <Button
                            text="Buy Now"
                            light
                            onClick={() => handleNavigate(algobot)}
                          />
                        </Commoncard>
                      </motion.div>
                    </>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
