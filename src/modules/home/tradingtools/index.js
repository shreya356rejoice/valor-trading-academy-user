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
import { getCookie } from "../../../../cookie";
import { getAlgobot } from "@/app/api/algobot";

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
  const [isUserFetching, setIsUserFetching] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userCookie = getCookie("user");
        if (userCookie) {
          const userData = JSON.parse(userCookie);
          setUser(userData); // Store the full user object
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      } finally {
        setIsUserFetching(false);
      }
    };
  
    fetchUser();
  }, []);
  
  useEffect(() => {
    const fetchAlgobotData = async () => {
      if (isUserFetching) return;
  
      try {
        if (user) {
          const data = await getAlgobot("689dc8759f3ddc14754c7498", "", 1, 3);
          setAlgobotData(data?.payload?.result || []);
        } else {
          const response = await getBots();
          const allStrategies = response?.payload?.data || [];
          setAlgobotData(allStrategies);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlgobotData([]); // Reset or handle error state
      }
    };
  
    fetchAlgobotData();
  }, [user, isUserFetching]); // Add isUserFetching to dependencies

  const handleNavigate = (algobot) => {
    const isPurchased = user && algobot?.strategyPlan?.some((plan) => plan.isPayment);

    if (isPurchased) {
      router.push(`/my-algobot-details?algobotId=${algobot?._id}`);
    } else if (user) {
      router.push(`/algobot-details?algobotId=${algobot?._id}&category=trading-tools`);
    } else {
      router.push(`/algobot-in-details?algobotId=${algobot?._id}`);
    }
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
              <motion.span initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.5 }}></motion.span>
            </p>
          </h3>
          <p>Smart tools designed to analyze markets, optimize strategies, and enhance your trading decisions.</p>
        </div>
        <div className="container-md">
          <div className={styles.tradingslider}>
            <Slider {...Planscardssettings}>
              {algobotData
                .filter((algobot) => algobot?.categoryInfo?.title === "Trading Tools" || algobot?.categoryId?.title === "Trading Tools")
                .map((algobot, i) => {                  
                  return (
                    <>
                      <motion.div key={i} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={styles.itemsmain}>
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
                          {user ? <Button text={user && algobot?.strategyPlan?.some((plan) => plan.isPayment) ? "Purchased" : "Buy Now"} fill={user && algobot?.strategyPlan?.some((plan) => plan.isPayment)} light={!(user && algobot?.strategyPlan?.some((plan) => plan.isPayment))} onClick={() => handleNavigate(algobot)} /> : 
                            <Button text="Buy Now" light onClick={() => handleNavigate(algobot)} />}
                        </Commoncard>
                      </motion.div>
                    </>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
