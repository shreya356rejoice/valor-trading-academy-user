import React from "react";
import Webinarbanner from "./webinarbanner";
import Webinarattend from "./webinarattend";
import styles from "./webinarpage.module.scss"
import Webinarlearn from "./webinarlearn";
import Webinarbenefits from "./webinarbenefits";
import Webinarworkshopfor from "./webinarworkshopfor";
import Webinartestimonial from "./webinartestimonial";
import Webinarfaq from "./webinarfaq";

export default function Webinarpage() {
  return (
    <>
      <Webinarbanner />
      <Webinarattend />
      <Webinarlearn />
      <Webinarbenefits />
      <Webinarworkshopfor />
      <Webinartestimonial />
      <Webinarfaq />
      <div className={styles.valorText}>
        <h3>EduFins Academy</h3>
      </div>
    </>
  );
}
