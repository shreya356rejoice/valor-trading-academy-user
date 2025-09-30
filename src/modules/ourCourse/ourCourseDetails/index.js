'use client'
import React, { useEffect, useState } from 'react'
import styles from './ourCourseDetails.module.scss';
import Button from '@/components/button';
import { useRouter, usePathname } from 'next/navigation';
import { getCourses, getDashboardCourses } from '@/app/api/dashboard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CalanderIcon from '@/components/icons/calanderIcon';
import { getCookie } from '../../../../cookie';

const CoursesImage = '/assets/images/course.png';
const BathIcon = '/assets/icons/bath-primary.svg';
const ITEMS_PER_PAGE = 4;
export default function OurCourseDetails() {
     const [selectedTab, setSelectedTab] = useState("recorded");
     const [user,setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const user = getCookie("user");
        if (user) {
          const userName = user && JSON.parse(user)?.name;
          setUser(userName);
        }
      }, [])

    useEffect(() => {
        // Set active tab based on URL path
        if (pathname === '/offline-sessions') {
            setSelectedTab('physical');
        } else if (pathname === '/live-online-classes') {
            setSelectedTab('live');
        } else if (pathname === '/our-course') {
            setSelectedTab('recorded');
        }
    }, [pathname]);

        const [allCourses, setAllCourses] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [pagination, setPagination] = useState({
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: ITEMS_PER_PAGE
        });
        const router = useRouter();
    
        const fetchCourses = async (page = 1) => {
            try {
                setIsLoading(true);
                
                const params = {
                    // searchQuery: searchQuery || "",
                    page,
                    limit: ITEMS_PER_PAGE,
                    courseType: selectedTab || "recorded",
                  };

                    const data = await getDashboardCourses(params);
                    if (data?.success) {
                        setAllCourses(data?.payload?.data || []);
                    }

                    setPagination((prev) => ({
                        ...prev,
                        currentPage: page,
                        totalItems: data?.payload?.count || 0,
                    }));
                }
             catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to load courses. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
    
        useEffect(() => {
            fetchCourses();
        }, [selectedTab]);

        const handleEnroll = (course) => {
            console.log(course,"course");
            console.log(user,"user");
            
            
            if(user){
                if(selectedTab === "recorded"){
                    if(course?.subscribed > 0){
                        router.push(`/my-course-details?courseId=${course?._id}`)
                    }else{
                        router.push(`/course-details?courseId=${course?._id}`)
                    }
                }else if(selectedTab === "live"){
                    if(course?.registration > 0){
                        router.push(`/my-course-details?courseId=${course?._id}`)
                    }else{
                        router.push(`/course-details?courseId=${course?._id}`)
                    }
                }else{
                    if(course?.isPayment){
                        router.push(`/my-course-details?courseId=${course?._id}`)
                    }else{
                        router.push(`/course-details?courseId=${course?._id}`)
                    }
                }
            }else{
                router.push(`/our-course-details?id=${course?._id}`);
            }
        }

    const CourseCardSkeleton = () => (
        <div className={styles.griditems}>
            <Skeleton height={200} className={styles.cardImage} />
            <div className={styles.cardDetails}>
                <Skeleton height={24} width="80%" style={{ marginBottom: '10px' }} />
                <Skeleton count={3} style={{ marginBottom: '15px' }} />
                <div className={styles.twoContentAlignment}>
                    <Skeleton width={60} height={24} />
                    <Skeleton width={100} height={24} />
                </div>
                <Skeleton height={40} style={{ marginTop: '15px' }} />
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className={styles.ourCourseDetails}>
                <div className='container'>
                    {/* <div className={styles.tabCenter}>
                        <div className={styles.tab}>
                            <Skeleton width={150} height={40} style={{ margin: '0 10px' }} />
                            <Skeleton width={120} height={40} style={{ margin: '0 10px' }} />
                            <Skeleton width={140} height={40} style={{ margin: '0 10px' }} />
                        </div>
                    </div> */}
                    <div className={styles.grid}>
                        {[...Array(3)].map((_, i) => (
                            <CourseCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.ourCourseDetails}>
                <div className='container'>
                    <div className={styles.tabCenter}>
                        <div className={styles.tab}>
                            <button className={selectedTab === "recorded" ? styles.active : ""} onClick={() => setSelectedTab("recorded")}>Recorded courses</button>
                            <button className={selectedTab === "live" ? styles.active : ""} onClick={() => setSelectedTab("live")}>Live Webinars</button>
                            <button className={selectedTab === "physical" ? styles.active : ""} onClick={() => setSelectedTab("physical")}>Traders Meet</button>
                        </div>
                    </div>
                    {error ? (
                        <div className={styles.errorMessage}>{error}</div>
                    ) : (
                        <div className={styles.grid}>
                            {allCourses.length > 0 ? allCourses.map((course, i) => {
                                
                                return (
                                    <div className={styles.griditems} key={i}>
                                        <div className={styles.cardImage}>
                                            <img src={course?.courseVideo} alt='CoursesImage' />
                                        </div>
                                        <div className={styles.cardDetails}>
                                            <h3>
                                                {course?.CourseName}
                                            </h3>
                                            <p className={styles.courseDescription}>
                                                {course?.description ? 
                                                    course.description.split('\n').slice(0, 3).join('\n') + 
                                                    (course.description.split('\n').length > 3 ? '...' : '')
                                                    : 'No description available'
                                                }
                                            </p>
                                            <div className={styles.twoContentAlignment}>
                                                {course?.courseType === "recorded" ? (<h4>
                                                    ${course?.price}
                                                </h4>) : (
                                                    <div className={styles.iconText}>
                                                        <CalanderIcon />
                                                        <span>{course?.createdAt ? new Date(course.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            timeZone: 'UTC'
                                                        }).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3') : 'N/A'}</span>
                                                    </div>
                                                )}
                                                <div className={styles.iconText}>
                                                    <img src={BathIcon} alt='BathIcon' />
                                                    <span>{course?.instructor}</span>
                                                </div>
                                            </div>
                                            {console.log(course,"====course")
                                            }
                                            {selectedTab === "recorded" ? (
                                                <Button 
                                                text={ user ? course?.subscribed > 0 ? "Enrolled" : "Enroll Now" : "Enroll Now"}
                                                onClick={() => handleEnroll(course)}
                                                fill={user && course?.subscribed > 0} 
                                            />
                                            ) : (
                                                <Button 
                                                    text={ user ? course?.registration > 0 ? "Registered" : "Register" : "Register"}
                                                    onClick={() => handleEnroll(course)}
                                                    fill={user && course?.registration > 0}
                                                />
                                            )}
                                            {/* <Button 
                                                text="Enroll Now" 
                                                onClick={() => router.push(`/our-course-details?id=${course._id}`)}
                                                fill 
                                            /> */}
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div className={styles.noCourses}>
                                    <p>No courses available for the selected category.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>EduFins Academy</h3>
            </div>
        </>
    )
}
