import React from 'react'
import styles from './courseDetails.module.scss';
import RightArrow from '@/components/icons/rightArrow';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import CourseDetailsTab from './courseDetailsTab';
import Recentcourse from '../course/recentcourse';
const BathIcon = '/assets/icons/bath.svg';
export default function CourseDetails() {
  return (
    <div className={styles.courseDetails}>
      <div className={styles.breadcumbAlignment}>
        <a aria-label="Home">Home</a>
        <RightArrow />
        <a aria-label="Course">Course</a>
        <RightArrow />
        <a aria-label="Pre-Recorded">Pre-Recorded</a>
      </div>
      <div className={styles.contentAlignment}>
        <h2>
          Crypto Currency for Beginners
        </h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s.
        </p>
        <div className={styles.allIconTextAlignment}>
          <div className={styles.iconText}>
            <ClockIcon />
            <span>12 hours</span>
          </div>
          <div className={styles.iconText}>
            <img src={BathIcon} alt="BathIcon" />
            <span>John  Doe</span>
          </div>
          <div className={styles.iconText}>
            <StarIcon />
            <span>4.8</span>
          </div>
          <div className={styles.iconText}>
            <ProfileIcon />
            <span>1234</span>
          </div>
          <div className={styles.iconText}>
            <span>Last-Update: 21-6-25  |  English</span>
          </div>
        </div>
      </div>
      <CourseDetailsTab />
      <div className={styles.courseInformation}>
        <div className={styles.video}></div>
        <div>
          <h2>
            Chapter 1 : This line is written for dummy text.
          </h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
            a galley of type and scrambled it to make.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
            a galley of type and scrambled it to make.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
            a galley of type and scrambled it to make.
          </p>
        </div>
      </div>
      <Recentcourse />
    </div>
  )
}

