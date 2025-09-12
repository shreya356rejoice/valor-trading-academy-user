'use client'
import React, { useEffect, useState } from 'react'
import styles from './ourCourseDetails.module.scss';
import Button from '@/components/button';
import { useRouter, usePathname } from 'next/navigation';
import { getCourses } from '@/app/api/dashboard';
const CoursesImage = '/assets/images/course.png';
const BathIcon = '/assets/icons/bath-primary.svg';
const ITEMS_PER_PAGE = 4;
export default function OurCourseDetails() {
     const [selectedTab, setSelectedTab] = useState("recorded");
    const pathname = usePathname();

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
                console.log(selectedTab, "------selectedTab");
                
                const params = {
                    // searchQuery: searchQuery || "",
                    page,
                    limit: ITEMS_PER_PAGE,
                    courseType: selectedTab || "recorded",
                  };
            
                  const data = await getCourses(params);
            
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

    return (
        <>
            <div className={styles.ourCourseDetails}>
                <div className='container'>
                    <div className={styles.tabCenter}>
                        <div className={styles.tab}>
                            <button className={selectedTab === "recorded" ? styles.active : ""} onClick={() => setSelectedTab("recorded")}>Recorded courses</button>
                            <button className={selectedTab === "live" ? styles.active : ""} onClick={() => setSelectedTab("live")}>Live Courses</button>
                            <button className={selectedTab === "physical" ? styles.active : ""} onClick={() => setSelectedTab("physical")}>In-Person Courses</button>
                        </div>
                    </div>
                    <div className={styles.grid}>
                        {
                            allCourses.map((course, i) => {
                                console.log(course,"course")
                                
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
                                                <h4>
                                                    ${course?.price}
                                                </h4>
                                                <div className={styles.iconText}>
                                                    <img src={BathIcon} alt='BathIcon' />
                                                    <span>{course?.instructor}</span>
                                                </div>
                                            </div>
                                            <Button 
                                                text="Enroll Now" 
                                                onClick={() => router.push(`/our-course-details?id=${course._id}`)}
                                                fill 
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </>
    )
}
