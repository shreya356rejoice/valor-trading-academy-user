"use client";
import React, { useEffect, useState } from "react";
import styles from "./commingSoon.module.scss";
import { getCookie } from "../../../cookie";
// import UserIcon from '@/icons/userIcon'
// import CourseIcon from '@/icons/courseIcon';
// import Algobot from '@/icons/algobot';
import { getCourses, getDashboardData } from "@/app/api/dashboard";
import CourseIcon from "../../../public/assets/icons/courseIcon";
import Algobot from "../../../public/assets/icons/algobot";
import UserIcon from "../../../public/assets/icons/userIcon";
import Button from "../button";
import CalanderIcon from "../icons/calanderIcon";
import Slider from "react-slick";
// const CommingSoonImage = '/assets/images/coming-soon.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";

export default function CommingSoon() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    upcomingLive: [],
    upcomingPhysical: [],
    registeredLive: [],
    registeredPhysical: []
  });
  const router = useRouter();

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      const userName = user && JSON.parse(user)?.name;
      setUser(userName);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        const coursesResponse = await getCourses({
          page: 1,
          limit: 10,
        });

        if (coursesResponse.success) {
          const now = new Date();
          const courses = coursesResponse.payload?.data || [];

          const upcomingLive = courses?.filter(course =>
            course.courseType === 'live' &&
            new Date(course.courseStart) > new Date() &&
            (!course.registrationCount || course.registrationCount === 0)
          );

          const upcomingPhysical = courses?.filter(course =>
            course.courseType === 'physical' &&
            new Date(course.courseStart) > new Date() &&
            (!course.registrationCount || course.registrationCount === 0)
          );

          const registeredLive = courses?.filter(course =>
            course.courseType === 'live' &&
            course.registrationCount > 0
          );

          const registeredPhysical = courses?.filter(course =>
            course.courseType === 'physical' &&
            course.registrationCount > 0
          );

          setData({
            ...dashboardData.payload,
            upcomingLive,
            upcomingPhysical,
            registeredLive,
            registeredPhysical
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCourseCard = (course, buttonText, onClick) => (
    <div className={styles.griditems}>
      <div className={styles.cardImage}>
        <img
          src={course.courseVideo || '/assets/images/course-placeholder.jpg'}
          alt={course.CourseName || 'Course Image'}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/images/course-placeholder.jpg';
          }}
        />
      </div>
      <div className={styles.cardDetails}>
        <h3>{course.CourseName || 'Course Name'}</h3>
        <p className={styles.courseDescription}>
          {course.description?.substring(0, 100) || 'No description available'}
          {course.description?.length > 100 ? '...' : ''}
        </p>
        <Button
          text={buttonText}
          onClick={() => onClick && onClick(course)}
          className={buttonText === 'Registered' ? styles.registeredBtn : ''}
        />
      </div>
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const CourseCard = ({ course, buttonText, onButtonClick }) => (
    <div className={styles.griditems}>
      <div className={styles.cardImage}>
        <img
          src={course.thumbnail || '/assets/images/course-placeholder.jpg'}
          alt={course.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/images/course-placeholder.jpg';
          }}
        />
      </div>
      <div className={styles.cardDetails}>
        <h3>{course.name || 'Course Name'}</h3>
        <p className={styles.courseDescription}>
          {course.description || 'No description available'}
        </p>
        <div className={styles.courseMeta}>
          {course.courseStart && (
            <div className={styles.courseDate}>
              <CalanderIcon />
              <span>{new Date(course.courseStart).toLocaleDateString()}</span>
            </div>
          )}
          <Button
            text={buttonText}
            onClick={() => onButtonClick && onButtonClick(course)}
            className={buttonText === 'Registered' ? styles.registeredBtn : ''}
          />
        </div>
      </div>
    </div>
  );

  const renderCourseSection = (title, courses, buttonText, onButtonClick) => {
    if (!courses || courses.length === 0) return null;

    return (
      <div className={styles.sectionContainer}>
        <div className={styles.itemstitleslider}>
          <h2>{title}</h2>
        </div>
        <Slider {...sliderSettings} className={styles.grid}>
          {courses.map((course, index) => (
            <div key={`${buttonText.toLowerCase().replace(' ', '-')}-${index}`}>
              <CourseCard
                course={course}
                buttonText={buttonText}
                onButtonClick={onButtonClick}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const handleEnrollClick = (course) => {
    router.push(`/course-details?courseId=${course._id}&category=${course.courseType}`);
  };

  const handleViewDetails = (course) => {
    router.push(`/my-course-details?courseId=${course._id}&category=${course.courseType}`);
  };

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
            Begin your monetization journey with expert-led courses in Forex,
            AlgoBots, and more.
          </p>
        </div>
      </div>

      <div className={styles.dashboardCardgrd}>
        <div className={styles.dashboardcard}>
          <div className={styles.dashboardcardtitle}>
            <h1>Courses</h1>
            <span>
              <CourseIcon />
              {data.courseCount || 0}
            </span>
          </div>
          <div className={styles.cardDetails}>

            <p>${(data.courseTotalPrice || 0).toFixed(2)}</p>
          </div>
        </div>
        <div className={styles.dashboardcard}>
          <div className={styles.dashboardcardtitle}>
            <h1>AlgoBots</h1>
            <span>
              <Algobot />
              {data.botCount || 0}
            </span>
          </div>
          <div className={styles.cardDetails}>

            <p>${(data.botTotalPrice || 0).toFixed(2)}</p>
          </div>
        </div>
        <div className={styles.dashboardcard}>
          <div className={styles.dashboardcardtitle}>
            <h1>Telegram Channels</h1>
            <span>
              <UserIcon />
              {data.telegramCount || 0}
            </span>
          </div>
          <div className={styles.cardDetails}>

            <p>${(data.telegramTotalPrice || 0).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboarddevidermain}>
        {/* Live Webinars Section */}
        <div className={styles.itemsleft}>
          <div className={styles.itemstitle}>
            <h1>live webinar</h1>
          </div>
          <div className={styles.slidergrouptop}>
            <div className={styles.itemstitleslider}>
              <h2>Enroll Now</h2>
            </div>
            {data.upcomingLive?.length > 0 ? (
              <Slider {...sliderSettings} className={styles.grid}>
                {data.upcomingLive.map((course, index) => (
                  <div key={`live-upcoming-${index}`}>
                    {renderCourseCard(course, 'Enroll Now', handleEnrollClick)}
                  </div>
                ))}
              </Slider>
            ) : (
              <div className={styles.nodata}>No upcoming live webinars available</div>
            )}
          </div>
          <div className={styles.slidergroupbottom}>
            <div className={styles.itemstitleslider}>
              <h2>Registered Live Webinars</h2>
            </div>
            {data.registeredLive?.length > 0 ? (
              <Slider {...sliderSettings} className={styles.grid}>
                {data.registeredLive.map((course, index) => (
                  <div key={`live-registered-${index}`}>
                    {renderCourseCard(course, 'Registered', handleViewDetails , "LIVE")}
                  </div>
                ))}
              </Slider>
            ) : (
              <div className={styles.nodata}>No registered live webinars</div>
            )}
          </div>
        </div>

        {/* Traders Meet Section */}
        <div className={styles.itemsright}>
          <div className={styles.itemstitle}>
            <h1>traders meet</h1>
          </div>
          <div className={styles.slidergrouptop}>
            <div className={styles.itemstitleslider}>
              <h2>Enroll Now</h2>
            </div>
              {data.upcomingPhysical?.length > 0 ? (
            <Slider {...sliderSettings} className={styles.grid}>
                {data.upcomingPhysical.map((course, index) => (
                  <div key={`physical-upcoming-${index}`}>
                    {renderCourseCard(course, 'Enroll Now', handleEnrollClick)}
                  </div>
                ))}
            </Slider>
              ) : (
                <div className={styles.nodata}>No upcoming trader meets available</div>
              )}
          </div>
          <div className={styles.slidergroupbottom}>
            <div className={styles.itemstitleslider}>
              <h2>Registered Traders Meet</h2>
            </div>
              {data.registeredPhysical?.length > 0 ? (
            <Slider {...sliderSettings} className={styles.grid}>
                {data.registeredPhysical.map((course, index) => (
                  <div key={`physical-registered-${index}`}>
                    {renderCourseCard(course, 'Registered', handleViewDetails , "PHYSICAL")}
                  </div>
                ))}
            </Slider>
              ) : (
                <div className={styles.nodata}>No registered trader meets</div>
              )}
          </div>
        </div>
      </div>
    </div >
  );
}
