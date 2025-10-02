import React from "react";
import styles from "./webinarworkshopfor.module.scss";
import Button from "@/components/button";
import Beginners from "../../../../public/assets/images/Beginners.png";
import Traders from "../../../../public/assets/images/Traders.png";
import Investors from "../../../../public/assets/images/Investors.png";
import Entrepreneurs from "../../../../public/assets/images/Entrepreneurs.png";
import Image from "next/image";

export default function Webinarworkshopfor() {
  return (
    <>
      <div className={styles.webinarworkshopformain}>
        <div className="container">
          <div className={styles.title}>
            <h5>
              Who Is <span>This Workshop For ?</span>
            </h5>
            <p>This webinar is perfect for</p>
          </div>
          <div className={styles.grid}>
            <div className={styles.items}>
              <Image src={Beginners} alt="Cards Image" />
              <p>
                Beginners who want to <span>start trading with confidence</span>
                .
              </p>
            </div>
            <div className={styles.items}>
              <Image src={Traders} alt="Cards Image" />
              <p>
                Traders struggling with <span>loss-making strategies</span>.
              </p>
            </div>
            <div className={styles.items}>
              <Image src={Investors} alt="Cards Image" />
              <p>
                Investors looking for{" "}
                <span>safe opportunities in XAUUSD (Gold)</span>.
              </p>
            </div>
            <div className={styles.items}>
              <Image src={Entrepreneurs} alt="Cards Image" />
              <p>
                Experienced traders who want to{" "}
                <span>refine their techniques</span>.
              </p>
            </div>
          </div>
          <div className={styles.registerbtn}>
            <Button text="Register Today" fill />
          </div>
        </div>
      </div>
    </>
  );
}
