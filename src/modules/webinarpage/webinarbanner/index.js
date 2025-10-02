"use client"
import React, { useState } from "react";
import styles from "./webinarbanner.module.scss";
import Calenderfillicon from "@/components/icons/calenderfillicon";
import Timeicon from "@/components/icons/timeicon";
import Videoiconfill from "@/components/icons/videoiconfill";
import Globeicon from "@/components/icons/globeicon";
import Trueicon from "@/components/icons/trueicon";
import Button from "@/components/button";
import Image from "next/image";
import webinarbanner from "../../../../public/assets/images/webinarbanner.jpg";
import RegistrationDialog from "@/components/RegistrationDialog";
import WebinarRegisterDialog from "@/components/WebinarRegisterDialog";

export default function Webinarbanner() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      // Here you can add your form submission logic
      console.log('Form submitted:', formData);
      // If you have an API endpoint to submit the form data, you can call it here
      // await api.submitWebinarRegistration(formData);
      return true; // Return true if submission is successful
    } catch (error) {
      console.error('Error submitting form:', error);
      throw new Error('Failed to submit the form. Please try again.');
    }
  };
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
                  <Button 
                    text="Register Now" 
                    fill 
                    onClick={handleRegisterClick}
                  />
                </div>
                
                <WebinarRegisterDialog
                  isOpen={isDialogOpen}
                  onClose={handleCloseDialog}
                  onSubmit={handleSubmit}
                  title="Let's Connect with us"
                  buttonText="Register Now"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
