import React from "react";
import styles from "./webinarworkshopfor.module.scss";
import Button from "@/components/button";

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
              <img src="" alt="Cards Image" />
              <p>
                Beginners who want to <span>start trading with confidence</span>
                .
              </p>
            </div>
            <div className={styles.items}>
              <img src="" alt="Cards Image" />
              <p>
                Traders struggling with <span>loss-making strategies</span>.
              </p>
            </div>
            <div className={styles.items}>
              <img src="" alt="Cards Image" />
              <p>
                Investors looking for{" "}
                <span>safe opportunities in XAUUSD (Gold)</span>.
              </p>
            </div>
            <div className={styles.items}>
              <img src="" alt="Cards Image" />
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
