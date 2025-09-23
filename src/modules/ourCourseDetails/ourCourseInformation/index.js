"use client"
import React, { useEffect, useState } from 'react'
import styles from './ourCourseInformation.module.scss';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import Button from '@/components/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { getChapters, getCourses, getDashboardCourses } from '@/app/api/dashboard';
import { getCookie } from '../../../../cookie';
// import { getChapters } from '@/app/api/courses';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CalanderIcon from '@/components/icons/calanderIcon';
import LocationIcon from '@/components/icons/locationIcon';
import RecetCourse from '../recetCourse';
import RegistrationDialog from '@/components/RegistrationDialog';

const BathPrimaryIcon = '/assets/icons/bath-primary.svg';
const LockIcon = '/assets/icons/lock.svg';
const NoCoursesIcon = '/assets/icons/no-courses.svg';

const CourseInfoSkeleton = () => (
    <div className={styles.ourCourseInformation}>
        <div className='container'>
            <div className={styles.contentAlignment}>
                <div className={styles.leftContent}>
                    <Skeleton height={40} width="70%" style={{ marginBottom: '20px' }} />
                    <Skeleton count={3} style={{ marginBottom: '20px' }} />
                    <div className={styles.allIconText}>
                        <div className={styles.blogtextsflx}>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={styles.iconText} style={{ marginRight: '20px' }}>
                                    <Skeleton width={100} height={20} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.rightContent}>
                            <Skeleton width={150} height={45} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ourCourseInformation}>
                {/* <div className={styles.allTabAlignment}>
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} width={100} height={40} style={{ marginRight: '10px' }} />
                    ))}
                </div> */}
                <div className={styles.grid} style={{ marginTop: '20px' }}>
                    <div className={styles.gridItems}>
                        <Skeleton height={400} />
                    </div>
                    <div className={styles.gridItems}>
                        <Skeleton height={30} width="80%" style={{ marginBottom: '20px' }} />
                        <Skeleton count={5} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function OurCourseInformation() {
    const [course, setCourse] = useState({});
    const [chapters, setChapters] = useState([]);
    const [activeChapter, setActiveChapter] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState("");
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const id = useSearchParams().get('id');
    const router = useRouter();
    
        useEffect(() => {
            const user = getCookie("user");
            const userName = user && JSON.parse(user)?.name;
            setUser(userName);
        }, []);
    
        const handleNavigate = () => {
            if (user) {
                router.push('/courses')
            } else {
                router.push('/login')
            }
        }

        const handleRegister = () => {
            if (user) {
                setIsRegistrationOpen(true);
            } else {
                router.push('/login');
            }
        };

        const handleRegistrationSubmit = async (formData) => {
            try {
                // Update the course state to reflect registration
                setCourse(prevCourse => ({
                    ...prevCourse,
                    registration: {
                        ...prevCourse.registration,
                        isActive: true
                    },
                    // Add the meeting link if available in the response
                    meetingLink: formData.meetingLink || prevCourse.meetingLink
                }));
                // The RegistrationDialog will handle showing the thank you message
            } catch (error) {
                console.error('Registration failed:', error);
                // The error will be handled by the RegistrationDialog
                throw error; // Re-throw to let RegistrationDialog handle the error
            }
        };
        
        const handleRegistrationComplete = () => {
            setIsRegistrationOpen(false);
        };

    // Set the first chapter as active when chapters are loaded
    useEffect(() => {
        if (chapters.length > 0 && !activeChapter) {
            setActiveChapter(chapters[0]);
        }
    }, [chapters]);    
    console.log(user,"*******user");

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const response = await getChapters(id);
                setChapters(response.payload.data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCourse = async () => {
            try {
                const userToken = getCookie('userToken');
                let response;                
                
                if (userToken) {
                    response = await getCourses({ id });
                } else {
                    response = await getDashboardCourses({ id });
                }
                
                setCourse(response.payload.data[0]);
            } catch (error) {
                console.error('Error fetching course:', error);
                setIsLoading(false);
            }
        };
        
        setIsLoading(true);
        fetchCourse();
        const userToken = getCookie('userToken');
        if (userToken) {
            setIsLogin(true);
            fetchChapter();
        } else {
            setIsLogin(false);
            setIsLoading(false);
        }
    }, [id]);

    if (isLoading) {
        return <CourseInfoSkeleton />;
    }

    return (
        <div className={styles.ourCourseInformation}>
            <div className='container'>
                <div className={styles.contentAlignment}>
                    <div className={styles.leftContent}>
                        <h3>{course?.CourseName}</h3>
                            <p>
                                {course?.description}
                            </p>
                            <div className={styles.allIconText}>
                                {course?.courseType === "recorded" ? (
                                <div className={styles.blogtextsflx}>
                                    <div className={styles.iconText}>
                                        <ClockIcon />
                                        <span>{course?.hours} hours</span>
                                    </div>
                                    <div className={styles.iconText}>
                                        <img src={BathPrimaryIcon} alt='BathPrimaryIcon' />
                                        <span>{course?.instructor}</span>
                                    </div>
                                    <div className={styles.iconText}>
                                        <ProfileIcon />
                                        <span>{course?.subscribed}</span>
                                    </div>
                                    <div className={styles.iconText}>
                                        <span>Last-Update: {course?.updatedAt ? new Date(course.updatedAt).toLocaleDateString('en-GB') : 'N/A'}  |  English</span>
                                    </div>
                                    <div className={styles.iconText}>
                                        <span>Price:</span> <h4>${course?.price}</h4>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.blogtextsflx}>
                                    <div className={styles.iconText}>
                                        <CalanderIcon />
                                        <span>{course?.createdAt ? new Date(course.createdAt).toLocaleDateString('en-CA') : 'N/A'}</span>
                                    </div>
                                    <div className={styles.iconText}>
                                        <ClockIcon />
                                        <span>{course?.startTime} to {course?.endTime}</span>
                                    </div>
                                    {course?.courseType === "physical" && (
                                        <div className={styles.iconText}>
                                            <LocationIcon />
                                            <span>{course?.location}</span>
                                        </div>
                                    )}
                                    <div className={styles.iconText}>
                                        <img src={BathPrimaryIcon} alt='BathPrimaryIcon' />
                                        <span>{course?.instructor}</span>
                                    </div>
                                    <div className={styles.iconText}>
                                        <ProfileIcon />
                                        <span>{course?.subscribed}</span>
                                    </div>
                                </div>
                            )}

                            {/* Debug log removed from production */}
                            {process.env.NODE_ENV === 'development' && console.log("course data:", course)}
                            
                            <div className={styles.rightContent}>
                                {course?.courseType === "recorded" ? (
                                    <Button text="Enroll Now" onClick={handleNavigate} fill />
                                ) : (
                                    course?.registration?.isActive ? 
                                    (<Button text="Registered" disabled fill />) : 
                                    (<Button text="Register" onClick={handleRegister} fill />)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {course?.courseType === "live" && (
                    <div>
                       { course?.registration?.isActive ? 
                        (<p>Meeting Link: {course?.meetingLink}</p>) : "" }
                    </div>
                )}
               <div className={styles.ourCourseInformation}>
                    {course?.courseType === "recorded" ? (<> <div>
                        <div className={styles.allTabAlignment}>
                            {chapters?.map((chapter, index) => (
                                <button
                                    key={chapter._id || index}
                                    className={`${activeChapter?._id === chapter._id ? styles.activeTab : ''}`}
                                    onClick={() => setActiveChapter(chapter)}
                                >
                                    Chapter {chapter?.chapterNo}
                                </button>
                            ))}
                        </div>
                        {activeChapter ? (
                            <div className={styles.grid}>
                                <div className={styles.gridItems}>
                                    <div className={styles.box}>
                                        <iframe
                                            width="100%"
                                            height="400"
                                            src={(activeChapter?.chapterVideo?.replace("watch?v=", "embed/"))}
                                            title={(activeChapter?.chapterName)}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                                <div className={styles.gridItems}>
                                    <h4>Chapter {activeChapter.chapterNo}: {activeChapter.chapterName}</h4>
                                    {activeChapter.description ? (
                                        <div dangerouslySetInnerHTML={{ __html: activeChapter.description }} />
                                    ) : (
                                        <p>No content available for this chapter.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.noChapters}>
                                <div className={styles.iconCenterAlignment}>
                                    <img src={NoCoursesIcon} alt="No Courses" />
                                </div>
                                <p>No Course Content Available</p>
                                <p>This course doesn't have any chapters yet. Please check back later.</p>
                            </div>
                        )}
                    </div>
                        <div>
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
                        </div></>) : (<><div className={styles.imageAlignCenter}>
                            <img src={course?.courseVideo} alt="live webinar thumbnail" />
                        </div></>)}
                </div>
                {course?.courseType === "recorded" && <RecetCourse />}
                <RegistrationDialog
                    isOpen={isRegistrationOpen}
                    onClose={handleRegistrationComplete}
                    onSubmit={handleRegistrationSubmit}
                />
            </div>
        </div>
    );
}
