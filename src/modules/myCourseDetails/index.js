'use client'
import React, { useEffect, useState } from 'react'
import styles from './myCourseDetails.module.scss';
import RightArrow from '@/components/icons/rightArrow';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
// import CourseDetailsTab from './courseDetailsTab';
// import Recentcourse from '../course/recentcourse';
import { useRouter, useSearchParams } from 'next/navigation';
// import { EmptyState } from './emptyState';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getChapters, getCourses, getPaymentUrl, getSessionData } from '@/app/api/dashboard';
import Button from '@/components/button';
import { getCookie } from '../../../cookie';
import CustomVideoPlayer from '@/components/customeVideoPlayer';
import CourseSession from '../courseDetails/courseSession';
import CalanderIcon from '@/components/icons/calanderIcon';
import LocationIcon from '@/components/icons/locationIcon';

const BathPrimaryIcon = '/assets/icons/bath-primary.svg';
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

export default function MyCourseDetails() {
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('courseId');
  const category = searchParams.get('category');
  const router = useRouter();

  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = getCookie('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [courseResponse, chapterResponse, sessionResponse] = await Promise.all([
          getCourses({ id }),
          getChapters(id),
          getSessionData(id)
        ]);

        setCourses(courseResponse.payload.data[0]);
        setChapters(chapterResponse.payload);
        setSessions(sessionResponse.payload);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load course data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const userToken = getCookie('userToken');
    if (userToken) {
      setIsLogin(true);
      fetchData();
    } else {
      setIsLogin(false);
      fetchData(); // Still fetch course data even if not logged in
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

  if (loading) {
    return <CourseDetailsSkeleton />;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error loading course details. Please try again later.</div>;
  }

  return (
    <div className={styles.courseDetails}>
      <div className={styles.breadcumbAlignment}>
        <a aria-label="Home" href="/dashboard">Home</a>
        <RightArrow />
        <a aria-label="My Course" href="/my-courses">My Course</a>
        {/* <RightArrow />
        <a aria-label="Pre-Recorded">Pre-Recorded</a> */}
      </div>
      <div className={styles.contentAlignment}>
        <h2>
          {courses?.CourseName}
        </h2>
        <p>
          {courses?.description}
        </p>
        <div className={styles.allIconTextAlignment}>
          {!category ? (
            <div className={styles.coursdetailstext}>
              <div className={styles.iconText}>
                <ClockIcon />
                <span>{courses?.hours} hours</span>
              </div>
              <div className={styles.iconText}>
                <img src={BathPrimaryIcon} alt='BathPrimaryIcon' />
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
              {!chapters?.isPayment && (<div className={styles.iconText}>
                <span>Price:</span> <h4>${courses?.price}</h4>
              </div>)}
            </div>
          ) : (
            <><div className={styles.coursdetailstext}>
              <div className={styles.iconText}>
                <CalanderIcon />
                <span>Schedule On: {new Date(courses?.courseStart || new Date()).toLocaleDateString('en-GB')}</span>
              </div>
              <div className={styles.iconText}>
                <ClockIcon />
                <span>{courses?.startTime} to {courses?.endTime}</span>
              </div>
              {category === "physical" && (<div className={styles.iconText}>
                <LocationIcon />
                <span>{courses?.location}</span>
              </div>)}
              <div className={styles.iconText}>
                <img src={BathPrimaryIcon} alt='BathPrimaryIcon' />
                <span>{courses?.instructor}</span>
              </div>
              <div className={styles.iconText}>
                <ProfileIcon />
                <span>{courses?.subscribed}</span>
              </div>
            </div></>
          )}

          <div className={styles.rightContentAlignment}>
            {category ? (
              courses?.registration && (
                <Button
                  text={'Registered'}
                  fill
                  onClick={handlePayment}
                  disabled
                  className={isProcessing ? styles.processingButton : ''}
                />
              )
            ) : (chapters?.isPayment === true ? '' : (
              <Button
                text={isProcessing ? 'Enrolling...' : 'Enroll Now'}
                fill
                onClick={() => handlePayment()}
                disabled={isProcessing}
                className={isProcessing ? styles.processingButton : ''}
              />
            )
            )}
            {/* {chapters?.isPayment === true ? '' : (
              <Button
                text={isProcessing ? 'Enrolling...' : 'Enroll Now'}
                onClick={() => handlePayment()}
                disabled={isProcessing}
                className={isProcessing ? styles.processingButton : ''}
              />
            )} */}
          </div>
        </div>
        <div>
          {(category === "LIVE" || category === "live") && (<p>Meeting Link : <a
            href={courses.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {courses.meetingLink}
          </a></p>)}
        </div>
      </div>

      {!category ? (
        chapters?.data?.length > 0 ? (
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
                    {/* <iframe
                      width="100%"
                      height="400"
                      src={(selectedChapter || chapters.data[0])?.chapterVideo?.replace("watch?v=", "embed/")}
                      title={(selectedChapter || chapters.data[0])?.chapterName}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe> */}


                    {chapters.data[0]?.chapterVideo ? (
                      // !isPaid ? (
                      //   <div className={styles.videoLocked}>
                      //     <div className={styles.lockOverlay}>
                      //       <img src={LockIcon} alt="Locked" />
                      //       <p>Enroll to unlock this video</p>
                      //     </div>
                      //     <img
                      //       src={`https://img.youtube.com/vi/${chapters.data[0]?.chapterVideo.split('v=')[1]}/hqdefault.jpg`}
                      //       alt="Video thumbnail"
                      //       className={styles.videoThumbnail}
                      //     />
                      //   </div>
                      // ) : (
                      <div className={styles.videoWrapper}>
                        {/* <VideoPlayer
                              src={selectedChapter.chapterVideo}
                              userId={user?._id}
                              controls
                              controlsList="nodownload"
                              disablePictureInPicture
                              noremoteplayback
                              className={styles.videoPlayer}
                            /> */}
                        {console.log("selectedChapter.chapterVideo", chapters.data[0]?.chapterVideo)}
                        <CustomVideoPlayer
                          src={chapters.data[0]?.chapterVideo}
                          // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                          // src="https://pipsveda.s3.us-east-1.azonaws.com/pipsveda/blob-1757418874956new%20latest.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVJSBBJ5XMZUEA2XW%2F20250913%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250913T063038Z&X-Amz-Expires=3600&X-Amz-Signature=e0ed6c6d43a4038201fd1206007456c1387457b7cb86fb7335d92417d65ba51b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                          userId={user?._id}
                          controls
                          controlsList="nodownload"
                          disablePictureInPicture
                          noremoteplayback
                          className={styles.videoPlayer}
                        />
                      </div>
                      // )
                    ) : (
                      <div className={styles.noVideo}>Video not available</div>
                    )}
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
        ) : (<><CourseSession sessions={sessions} setSessions={setSessions} /></>)
      ) : (
        <div className={`${styles.mainRelative} ${chapters?.isPayment === false ? styles.layeredrelative : ''}`}>
          <div className={styles.thumbnail}>
            <img src={courses?.courseVideo} alt="Thumbnail" />
          </div>
        </div>
      )}

    </div>
  )
}
