'use client'
import React, { useEffect, useState } from 'react'
import styles from './courseDetails.module.scss';
import RightArrow from '@/components/icons/rightArrow';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import CourseDetailsTab from './courseDetailsTab';
import Recentcourse from '../course/recentcourse';
import { useRouter, useSearchParams } from 'next/navigation';
import { EmptyState } from './emptyState';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getChapters } from '@/app/api/dashboard';

const BathIcon = '/assets/icons/bath.svg';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('courseId');


  const fetchChapters = async () => {
    try {
      setLoading(true);
      const data = await getChapters(id);
      setChapters(data?.payload?.data || []);

      // Set the first chapter as selected by default if available
      if (data?.payload?.data?.length > 0) {
        setSelectedChapter(data.payload.data[0]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching chapters:", err);
      setError("Failed to load course details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchChapters();
  }, [id]);

  useEffect(() => {
    if (chapters.length > 0 && !selectedChapter) {
      setSelectedChapter(chapters[0]);
    }
  }, [chapters, selectedChapter]);



  const course = chapters[0]?.courseId || {};


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
          {course?.CourseName}
        </h2>
        <p>
          {course?.description}
        </p>
        <div className={styles.allIconTextAlignment}>
          <div className={styles.iconText}>
            <ClockIcon />
            <span>12 hours</span>
          </div>
          <div className={styles.iconText}>
            <img src={BathIcon} alt="BathIcon" />
            <span>{course?.instructor || "John Doe"}</span>
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
      {chapters.length === 0 ? (
        <EmptyState onRetry={fetchChapters} />
      ) : (
        <>
          <div className={styles.mainRelative}>
            <CourseDetailsTab
              chapters={chapters}
              selectedChapter={selectedChapter}
              onChapterSelect={setSelectedChapter}
            />
            {selectedChapter && (
              <div className={styles.courseInformation}>
                <div className={styles.video}>
                  <iframe
                    width="100%"
                    height="400"
                    src={selectedChapter.chapterVideo?.replace("watch?v=", "embed/")}
                    title={selectedChapter.chapterName}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div>
                  <h2>
                    Chapter {selectedChapter.chapterNo}: {selectedChapter.chapterName}
                  </h2>
                  <p>{selectedChapter.description}</p>
                </div>
              </div>
            )}
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
          </div>
        </>
      )}
      <Recentcourse courses={courses} setCourses={setCourses} />
    </div>
  )
}
