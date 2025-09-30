"use client";
import React, { useState } from "react";
import styles from "./webinarfaq.module.scss";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plusIcon";
import classNames from "classnames";

const faqData = [
  {
    question: "Do I need prior trading experience?",
    answer:
      "No. The strategy is explained step-by-step and can be followed even by beginners.",
  },
  {
    question: "Is the webinar free?",
    answer:
      "Yes, the webinar is completely free, but spots are limited—register now.",
  },
  {
    question: "Will I get a recording of the webinar?",
    answer:
      "Yes. Registered participants will receive the recording after the session.",
  },
  {
    question: "How long is the webinar?",
    answer: "The session will last about 60–90 minutes including live Q&A.",
  },
  {
    question: "What do I need to attend?",
    answer: "Just a stable internet connection, a notebook, and your focus.",
  },
];

export default function Webinarfaq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <div className={styles.webinarfaqmain}>
        <div className="container">
          <div className={styles.title}>
            <h1>
              Frequently <span>Asked</span> Questions
            </h1>
          </div>
          <div className={styles.faqListAlignment}>
            {faqData.map((faq, index) => (
              <div key={index} className={styles.mainFaq}>
                <div className={styles.faqHeader}>
                  <h3>{faq.question}</h3>
                  <div
                    className={classNames(
                      styles.icon,
                      activeIndex === index ? styles.rotate : ""
                    )}
                    onClick={() => toggleFaq(index)}
                  >
                    <PlusIcon />
                  </div>
                </div>
                <div
                  className={classNames(
                    styles.faqBody,
                    activeIndex === index ? styles.show : styles.hide
                  )}
                >
                  <div className={styles.spacing}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.registerbtn}>
            <Button text="Secure Your Seat Now" fill />
          </div>
        </div>
      </div>
    </>
  );
}
