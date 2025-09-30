"use client";
import React from "react";
import styles from "./webinartestimonial.module.scss";
import Button from "@/components/button";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@/components/icons/starIcon";
import Quotesicon from "@/components/icons/quotesicon";
import dummyprofile from "../../../../public/assets/images/dummyprofile.webp"
import Image from "next/image";

export default function Webinartestimonial() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className={styles.webinartestimonialmain}>
        <div className="container">
          <div className={styles.title}>
            <h6>
              <p>
                Testimonials
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                ></motion.span>
              </p>
            </h6>
          </div>
          <Slider {...settings} className={styles.testimonialslider}>
            <div>
              <div className={styles.testimonialitem}>
                <div className={styles.Quotesicon}>
                  <Quotesicon />
                </div>
                <div className={styles.testimonialtitle}>
                  <div className={styles.testimonialimage}>
                    <Image src={dummyprofile} alt="dummyprofile" />
                  </div>
                  <div>
                    <h6>Rajesh K., India</h6>
                    <p>January 12,2025</p>
                  </div>
                </div>
                <div className={styles.rating}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <div className={styles.description}>
                  <p>
                    Before this training, I was struggling to make consistent
                    profits. After applying the zero-loss strategy, I’ve been
                    trading with confidence. This workshop was a game-changer!
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.testimonialitem}>
                <div className={styles.Quotesicon}>
                  <Quotesicon />
                </div>
                <div className={styles.testimonialtitle}>
                  <div className={styles.testimonialimage}>
                    <Image src={dummyprofile} alt="dummyprofile" />
                  </div>
                  <div>
                    <h6>Meena S., Dubai</h6>
                    <p>January 12,2025</p>
                  </div>
                </div>
                <div className={styles.rating}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <div className={styles.description}>
                  <p>
                    Finally, a practical strategy for Gold that actually works.
                    The way they explained the risk management part was
                    brilliant.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.testimonialitem}>
                <div className={styles.Quotesicon}>
                  <Quotesicon />
                </div>
                <div className={styles.testimonialtitle}>
                  <div className={styles.testimonialimage}>
                    <Image src={dummyprofile} alt="dummyprofile" />
                  </div>
                  <div>
                    <h6>Amit P., Singapore</h6>
                    <p>January 12,2025</p>
                  </div>
                </div>
                <div className={styles.rating}>
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <div className={styles.description}>
                  <p>
                    I highly recommend this webinar to anyone serious about
                    trading. It gave me clarity and results I never had before.
                  </p>
                </div>
              </div>
            </div>
          </Slider>
          {/* <div className={styles.registerbtn}>
            <Button text="Register Today" light />
          </div> */}
        </div>
      </div>
    </>
  );
}
