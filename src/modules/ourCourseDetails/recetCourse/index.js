"use client"
import React, { useEffect, useState } from 'react'
import styles from './recetCourse.module.scss';
import Button from '@/components/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCourses, getDashboardCourses } from '@/app/api/dashboard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CoursesImage = '/assets/images/course.png';
const BathIcon = '/assets/icons/bath-primary.svg';
const ITEMS_PER_PAGE = 4;

export default function RecetCourse() {
    const id = useSearchParams().get('id');
    const [selectedTab, setSelectedTab] = useState("recorded");
        const [allCourses, setAllCourses] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [pagination, setPagination] = useState({
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: ITEMS_PER_PAGE
        });
        const router = useRouter();
        const searchParams = useSearchParams();
        const currentCourseId = searchParams.get('id');
    
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
                    // Filter out the current course from the list
                    const filteredCourses = (data?.payload?.data || []).filter(
                        course => course._id !== currentCourseId
                    );
                    setAllCourses(filteredCourses);
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
        }, [selectedTab , currentCourseId]);

    const CourseCardSkeleton = () => (
        <div className={styles.griditems}>
            <div className={styles.cardImage}>
                <Skeleton height={200} width="100%" />
            </div>
            <div className={styles.cardDetails}>
                <Skeleton height={24} width="80%" style={{ marginBottom: '10px' }} />
                <Skeleton count={3} style={{ marginBottom: '15px' }} />
                <div className={styles.twoContentAlignment}>
                    <Skeleton width={60} height={24} />
                    <div className={styles.iconText}>
                        <Skeleton width={16} height={16} style={{ marginRight: '5px' }} />
                        <Skeleton width={80} height={16} />
                    </div>
                </div>
                <Skeleton height={40} style={{ marginTop: '15px' }} />
            </div>
        </div>
    );

    return (
        <>
            <div className={styles.recetCourse}>
                <div className='container'>
                    <div className={styles.title}>
                        <h2>
                            Recent Course
                        </h2>
                    </div>
                    {isLoading ? (
                        <div className={styles.grid}>
                            {[...Array(3)].map((_, i) => (
                                <CourseCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className={styles.errorMessage}>{error}</div>
                    ) : allCourses.length > 0 ? (
                        <div className={styles.grid}>
                            {allCourses.map((course, i) => (
                                <div className={styles.griditems} key={i}>
                                    <div className={styles.cardImage}>
                                        <img src={course?.courseVideo} alt={course?.CourseName} />
                                    </div>
                                    <div className={styles.cardDetails}>
                                        <h3>{course?.CourseName}</h3>
                                        <p className={styles.description}>
                                            {course?.description?.split(' ').slice(0, 20).join(' ')}
                                            {course?.description?.split(' ').length > 20 ? '...' : ''}
                                        </p>
                                        <div className={styles.twoContentAlignment}>
                                            <h4>${course?.price}</h4>
                                            <div className={styles.iconText}>
                                                <img src={BathIcon} alt='Instructor' />
                                                <span>{course?.instructor}</span>
                                            </div>
                                        </div>
                                        <Button 
                                            text="Enroll Now" 
                                            fill 
                                            onClick={() => router.push(`/our-course-details?id=${course?._id}`)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noCourses}>
                            <p>No other courses available at the moment.</p>
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
