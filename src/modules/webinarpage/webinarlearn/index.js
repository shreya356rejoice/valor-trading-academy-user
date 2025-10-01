"use client";
import React from "react";
import styles from "./webinarlearn.module.scss";
import { motion } from "framer-motion";
import Button from "@/components/button";
import Listicon2 from "@/components/icons/listicon2";

export default function Webinarlearn() {
  return (
    <>
      <div className={styles.webinarlearnmain}>
        <div className="container">
          <div className={styles.title}>
            <h3>
              What You <span>Will Learn</span>
            </h3>
          </div>
          <div className={styles.grid}>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon2 />
              </div>
              <div>
                <p>
                  How to trade the{" "}
                  <span>XAUUSD pair with near-zero losses</span>.
                </p>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon2 />
              </div>
              <div>
                <p>Identifying high-probability entry and exit points.</p>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon2 />
              </div>
              <div>
                <p>
                  Using <span>risk management techniques</span> that protect
                  your investments.
                </p>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon2 />
              </div>
              <div>
                <p>
                  Understanding market trends and{" "}
                  <span>real examples of successful trades</span>.
                </p>
              </div>
            </div>
            <div className={`${styles.items} ${styles.fullitem}`}>
              <div className={styles.itemicon}>
                <Listicon2 />
              </div>
              <div>
                <p>
                  Step-by-step breakdown of the{" "}
                  <span>exact system we use daily</span>.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.registerbtn}>
            <Button text="Reserve Your Seat" fill />
          </div>
        </div>
      </div>
    </>
  );
}
