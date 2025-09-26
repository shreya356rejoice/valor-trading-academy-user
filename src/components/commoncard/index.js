import React from "react";
import styles from "./commoncard.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sliderarrow from "../icons/sliderarrow";

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

export default function Commoncard({ 
  imageUrl, 
  title, 
  shortDescription, 
  plans = [], 
  children,
  sliderSettings = {} 
}) {
  const defaultSliderSettings = {
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

  const Planssettings = { ...defaultSliderSettings, ...sliderSettings };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardflx}>
          <div className={styles.cardHeaderAlignment}>
            <img src={imageUrl} alt="Cardimage" />
            <div>
              <h3>{title}</h3>
              <p>{shortDescription}</p>
            </div>
          </div>
          <div className={styles.carddetails}>
            {plans && plans.length > 0 && (
              <Slider {...Planssettings} className={styles.planslider}>
                {plans.map((plan, index) => (
                  <div key={index} className={styles.planItemmain}>
                    <div className={styles.planItem}>
                      <div className={styles.flex}>
                        <p className={styles.plantype}>{plan?.planType}</p>
                        <span className={styles.initialprice}>${plan?.price}</span>
                      </div>
                      <div className={styles.flex}>
                        <p className={styles.mrp}>M.R.P.:</p>
                        <del className={styles.mrpprice}>${plan?.initialPrice}</del>
                      </div>
                      <div className={styles.flex}>
                        <p className={styles.discount}>Discount:</p>
                        <span className={styles.discountedprice}>-{plan?.discount}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
            {children && (
              <div className={styles.cardbuttons}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
