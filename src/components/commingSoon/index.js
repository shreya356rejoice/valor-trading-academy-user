"use client"
import React, { useEffect, useState } from 'react'
import styles from './commingSoon.module.scss';
import { getCookie } from '../../../cookie';
// import UserIcon from '@/icons/userIcon'
// import CourseIcon from '@/icons/courseIcon';
// import Algobot from '@/icons/algobot';
import { getDashboardData } from '@/app/api/dashboard';
import CourseIcon from '../../../public/assets/icons/courseIcon';
import Algobot from '../../../public/assets/icons/algobot';
import UserIcon from '../../../public/assets/icons/userIcon';
// const CommingSoonImage = '/assets/images/coming-soon.png';

export default function CommingSoon() {

  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      const userName = user && JSON.parse(user)?.name;
      setUser(userName);
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setData(response.payload);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.commingSoon}>
      {/* <div className={styles.centerImage}>
        <img src={CommingSoonImage} alt="CommingSoonImage"/>
      </div> */}
      <div className={styles.coursePageAlignment}>
        <div className={styles.pageTitle}>
          <h2>
            <span>Hello {user},</span> welcome!
          </h2>
          <p>
            Begin your monetization journey with expert-led courses in Forex, AlgoBots, and more.
          </p>
        </div>
      </div>

      <div className={styles.dashboardCardgrd}>
        <div className={styles.dashboardcard}>
          <div className={styles.dashboardcardtitle}>
            <h1>Courses</h1>
            <span><CourseIcon />{data.courseCount || 0}</span>
          </div>
          <div className={styles.cardDetails}>

            <p>${(data.courseTotalPrice || 0).toFixed(2)}</p>
          </div>
        </div>
        <div className={styles.dashboardcard}>
          <div className={styles.dashboardcardtitle}>
            <h1>AlgoBots</h1>
            <span><Algobot />{data.botCount || 0}</span>
          </div>
          <div className={styles.cardDetails}>

            <p>${(data.botTotalPrice || 0).toFixed(2)}</p>
          </div>
        </div>
        <div className={styles.dashboardcard}>
          <div className={styles.dashboardcardtitle}>
            <h1>Telegram Channels</h1>
            <span><UserIcon />{data.telegramCount || 0}</span>
          </div>
          <div className={styles.cardDetails}>

            <p>${(data.telegramTotalPrice || 0).toFixed(2)}</p>
          </div>
        </div>
        {/* <div className={styles.dashboardcard}>
                    <div className={styles.dashboardcardtitle}>
                        <h1>Total Revenue</h1>
                        <span>${data.overallTotalPrice || 0}</span>
                    </div>
                    <div className={styles.cardDetails}>
                        <p>{data.overallTotalPrice || 0}</p>
                    </div>
                </div> */}

      </div>
    </div>
  )
}

