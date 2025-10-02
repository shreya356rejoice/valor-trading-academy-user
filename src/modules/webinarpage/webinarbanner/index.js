import React from "react";
import styles from "./webinarbanner.module.scss";
import Calenderfillicon from "@/components/icons/calenderfillicon";
import Timeicon from "@/components/icons/timeicon";
import Videoiconfill from "@/components/icons/videoiconfill";
import Globeicon from "@/components/icons/globeicon";
import Trueicon from "@/components/icons/trueicon";
import Button from "@/components/button";
import Image from "next/image";
import webinarbanner from "../../../../public/assets/images/webinarbanner.jpg"

export default function Webinarbanner() {
  return (
    <>
      <div className={styles.webinarbannermain}>
        <div className="container">
          <div className={styles.webinartitle}>
            <h1>
              Zero Risk Trading Strategy at <span>Zero Cost</span>
            </h1>
            <p>
              Discover a powerful trading strategy designed specifically for
              XAUUSD (Gold) that helps you minimize risks and maximize profits.
              Learn the proven system we use to trade with confidence—even in
              volatile markets.
            </p>
          </div>
          <div className={styles.grid}>
            <div>
              <div className={styles.itemsleft}>
                <div className={styles.webinarbannerimg}>
                    <Image src={webinarbanner} alt="webinarbanner" />
                </div>
              </div>
            </div>
            <div>
              <div className={styles.itemsright}>
                <div className={styles.gridcards}>
                  <div className={styles.cards}>
                    <div className={styles.cardsicon}>
                      <Calenderfillicon />
                    </div>
                    <div className={styles.cardscontent}>
                      <span>Date</span>
                      <p>Tuesday / Friday</p>
                    </div>
                  </div>
                  <div className={styles.cards}>
                    <div className={styles.cardsicon}>
                      <Timeicon />
                    </div>
                    <div className={styles.cardscontent}>
                      <span>Time</span>
                      <p>Will Inform</p>
                    </div>
                  </div>
                  <div className={styles.cards}>
                    <div className={styles.cardsicon}>
                      <Videoiconfill />
                    </div>
                    <div className={styles.cardscontent}>
                      <span>Venue</span>
                      <p>Zoom</p>
                    </div>
                  </div>
                  <div className={styles.cards}>
                    <div className={styles.cardsicon}>
                      <Globeicon />
                    </div>
                    <div className={styles.cardscontent}>
                      <span>Language</span>
                      <p>English / Hindi</p>
                    </div>
                  </div>
                </div>
                <div className={styles.rowlist}>
                  <div className={styles.list}>
                    <div className={styles.checked}>
                      <Trueicon />
                    </div>
                    <p>XAUUSD Arbitrage Bot</p>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.checked}>
                      <Trueicon />
                    </div>
                    <p>Gold (XAUUSD) Future</p>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.checked}>
                      <Trueicon />
                    </div>
                    <p>Gold (XAUUSD) Spot</p>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.checked}>
                      <Trueicon />
                    </div>
                    <p>World Most Reliable Bot</p>
                  </div>
                </div>
                <div className={styles.registerbtn}>
                  <Button text="Register Now" fill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
