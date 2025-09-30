"use client";
import React from "react";
import styles from "./webinarbenefits.module.scss";
import { motion } from "framer-motion";
import Button from "@/components/button";
import Trueicon from "@/components/icons/trueicon";

export default function Webinarbenefits() {
  return (
    <>
      <div className={styles.webinarbenefitsmain}>
        <div className="container">
          <div className={styles.title}>
            <h4>
              Benefits of{" "}
              <p>
                Attending
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                ></motion.span>
              </p>
            </h4>
          </div>
          <div className={styles.grid}>
            <div className={styles.item}>
              <div className={styles.trueicon}>
                <Trueicon />
              </div>
              <p>
                Beginners who want to <span>start trading with confidence</span>
                .
              </p>
            </div>
            <div className={styles.item}>
              <div className={styles.trueicon}>
                <Trueicon />
              </div>
              <p>
                Learn strategies you can <span>apply instantly</span> to your
                trades.
              </p>
            </div>
            <div className={styles.item}>
              <div className={styles.trueicon}>
                <Trueicon />
              </div>
              <p>
                Gain{" "}
                <span>confidence to trade Gold without fear of losses</span>.
              </p>
            </div>
            <div className={styles.item}>
              <div className={styles.trueicon}>
                <Trueicon />
              </div>
              <p>Exclusive access to webinar-only bonuses.</p>
            </div>
            <div className={styles.item}>
              <div className={styles.trueicon}>
                <Trueicon />
              </div>
              <p>
                Opportunity to join our{" "}
                <span>community of professional traders</span>.
              </p>
            </div>
          </div>
          <div className={styles.registerbtn}>
            <Button text="Register Today" light />
          </div>
        </div>
      </div>
    </>
  );
}
