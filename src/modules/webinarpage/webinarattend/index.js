"use client";
import React from "react";
import styles from "./webinarattend.module.scss";
import { motion } from "framer-motion";
import Button from "@/components/button";
import Listicon from "@/components/icons/listicon";

export default function Webinarattend() {
  return (
    <>
      <div className={styles.webinarattendmain}>
        <div className="container">
          <div className={styles.title}>
            <h2>
              Why{" "}
              <p>
                You Should
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                ></motion.span>
              </p>{" "}
              Attend
            </h2>
          </div>
          <div className={styles.grid}>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon />
              </div>
              <div>
                <p>
                  Learn a <span>tested and proven strategy</span> trusted by
                  professional traders.
                </p>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon />
              </div>
              <div>
                <p>
                  Gain insights into{" "}
                  <span>market behavior of Gold (XAUUSD)</span> and how to trade
                  it effectively.
                </p>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon />
              </div>
              <div>
                <p>
                  Avoid costly mistakes and <span>protect your capital</span>{" "}
                  with a structured system.
                </p>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.itemicon}>
                <Listicon />
              </div>
              <div>
                <p>
                  Free access to <span>live Q&A</span> with our trading experts.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.registerbtn}>
            <Button text="Reserve Your Spot" light />
          </div>
        </div>
      </div>
    </>
  );
}
