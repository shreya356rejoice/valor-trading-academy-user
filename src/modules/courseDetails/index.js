'use client'
import React, { useEffect, useState } from 'react'
import styles from './courseDetails.module.scss';
import RightArrow from '@/components/icons/rightArrow';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import CourseDetailsTab from './courseDetailsTab';
// import Recentcourse from '../course/recentcourse';
import Recent from './Recent';
import { useRouter, useSearchParams } from 'next/navigation';
import { EmptyState } from './emptyState';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getChapters, getCourses, getPaymentUrl } from '@/app/api/dashboard';
import Button from '@/components/button';
import { getCookie } from '../../../cookie';

const BathIcon = '/assets/icons/bath.svg';
const NoCoursesIcon = '/assets/icons/no-courses.svg';
const LockIcon = '/assets/icons/lock.svg';

const CourseDetailsSkeleton = () => (
  <div className={styles.courseDetails}>
    <div className={styles.breadcumbAlignment}>
      <Skeleton width={50} />
      <Skeleton width={100} style={{ marginLeft: 10 }} />
    </div>
    <div className={styles.contentAlignment}>
      <Skeleton height={40} width="70%" style={{ marginBottom: 16 }} />
      <Skeleton count={3} style={{ marginBottom: 8 }} />
      <Skeleton width="60%" style={{ marginBottom: 24 }} />

      <div className={styles.allIconTextAlignment}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.iconText}>
            <Skeleton circle width={20} height={20} style={{ marginRight: 8 }} />
            <Skeleton width={80} />
          </div>
        ))}
      </div>
    </div>

    <div className={styles.courseInformation}>
      <Skeleton height={400} style={{ marginBottom: 20 }} />
      <Skeleton height={30} width="50%" style={{ marginBottom: 16 }} />
      <Skeleton count={4} />
    </div>
  </div>
);

export default function CourseDetails() {
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('courseId');
  const router = useRouter();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await getChapters(id);
        setChapters(response.payload);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await getCourses({ id });
        setCourses(response.payload.data[0]);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
    const userToken = getCookie('userToken');
    if (userToken) {
      setIsLogin(true);
      fetchChapter();
    }
    else {
      setIsLogin(false);
    }
  }, [id]);

  const handlePayment = async () => {
    if (isLogin) {
      setIsProcessing(true);
      try {
        const response = await getPaymentUrl({
          success_url: 'https://pips-veda.vercel.app/my-courses',
          cancel_url: window.location.href,
          courseId: id
        });
        if (response.success) {
          router.replace(response.payload.data.checkout_url);
        } else {
          toast.error("Payment failed. Please try again");
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        toast.error("An error occurred. Please try again later.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      router.push('/signin');
    }
  }

  return (
    <div className={styles.courseDetails}>
      <div className={styles.breadcumbAlignment}>
        <a aria-label="Home" href="/">Home</a>
        <RightArrow />
        <a aria-label="Course" href="/courses/pre-recorded">Course</a>
        <RightArrow />
        <a aria-label="Pre-Recorded">Pre-Recorded</a>
      </div>
      <div className={styles.contentAlignment}>
        <h2>
          {courses?.CourseName}
        </h2>
        <p>
          {courses?.description}
        </p>
        <div className={styles.allIconTextAlignment}>
          <div className={styles.coursdetailstext}>
            <div className={styles.iconText}>
              <ClockIcon />
              <span>{courses?.hours} hours</span>
            </div>
            <div className={styles.iconText}>
              <img src={BathIcon} alt="BathIcon" />
              <span>{courses?.instructor || "John Doe"}</span>
            </div>
            {/* <div className={styles.iconText}>
            <StarIcon />
            <span>4.8</span>
          </div> */}
            <div className={styles.iconText}>
              <ProfileIcon />
              <span>{courses?.subscribed}</span>
            </div>
            <div className={styles.iconText}>
              <span>Last-Update: {new Date(courses?.updatedAt || new Date()).toLocaleDateString('en-GB')} | English</span>
            </div>
          </div>
          <div className={styles.rightContentAlignment}>
            {chapters?.isPayment === true ? '' : (
              <Button
                text={isProcessing ? 'Enrolling...' : 'Enroll Now'}
                onClick={() => handlePayment()}
                disabled={isProcessing}
                className={isProcessing ? styles.processingButton : ''}
              />
            )}
          </div>
        </div>
      </div>
      {chapters?.data && (
        <>
          <div className={`${styles.mainRelative} ${chapters?.isPayment === false ? styles.layeredrelative : ''}`}>
            <div className={styles.courseDetailsTab}>
              {chapters.data.map((chapter, index) => (
                <button
                  key={chapter._id}
                  aria-label={`Chapter ${chapter.chapterNo}`}
                  className={selectedChapter?._id === chapter._id ? styles.active : ''}
                  onClick={() => setSelectedChapter(chapter)}
                >
                  <span>Chapter {chapter.chapterNo}</span>
                </button>
              ))}
            </div>
            {chapters.data && chapters.data.length > 0 ? (
              <div className={styles.courseInformation}>
                <div className={styles.video}>
                  <iframe
                    width="100%"
                    height="400"
                    src={(selectedChapter || chapters.data[0])?.chapterVideo?.replace("watch?v=", "embed/")}
                    title={(selectedChapter || chapters.data[0])?.chapterName}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div>
                  <h2>
                    Chapter {(selectedChapter || chapters.data[0])?.chapterNo}: {(selectedChapter || chapters.data[0])?.chapterName}
                  </h2>
                  <p>{(selectedChapter || chapters.data[0])?.description}</p>
                </div>
              </div>
            ) : (<div className={styles.noChapters}>
              <div className={styles.iconCenterAlignment}>
                <img src={NoCoursesIcon} alt="No Courses" />
              </div>
              <p>No Course Content Available</p>
              <p>This course doesn't have any chapters yet. Please check back later.</p>
            </div>)}

            {chapters?.isPayment === false && (
              <div className={styles.layer}>
                <div>
                  <div className={styles.iconCenterAlignment}>
                    <img src={LockIcon} alt='LockIcon' />
                  </div>
                  <p>
                    Enroll Now to unlock
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {/* <Recentcourse courses={courses} setCourses={setCourses} /> */}

      <Recent courses={courses} setCourses={setCourses} />
    </div>
  )
}
