'use client'
import React, { useEffect, useState } from 'react'
import styles from './recentcourse.module.scss';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import { getCourses } from '@/app/api/courses';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';

const ITEMS_PER_PAGE = 4;

export default function Recentcourse({ searchQuery, courses, setCourses }) {
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
            const data = await getCourses({
                searchQuery,
                page,
                limit: ITEMS_PER_PAGE
            });

            setCourses(data?.payload?.data || courses || []);
            setPagination(prev => ({
                ...prev,
                currentPage: page,
                totalItems: data?.payload?.count || 0
            }));
            setError(null);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to load courses. Please try again later.');
            setCourses([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Reset to first page when search query changes
        fetchCourses(1);
    }, [searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
            fetchCourses(newPage);
            // Optional: Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderSkeleton = () => {
        return Array(4).fill(0).map((_, index) => (
            <div className={styles.griditems} key={`skeleton-${index}`}>
                <div className={styles.image}>
                    <Skeleton height={180} style={{ display: 'block' , borderRadius: '10px'}} />
                </div>
                <div className={styles.details} style={{padding: '0px'}}>
                    <h3><Skeleton width="80%" /></h3>
                    <p><Skeleton count={2} /></p>
                    <div className={styles.iconalignment} style={{padding: '0px'}}>
                        <h4 className={styles.iconText}><Skeleton width={40} height={20} /></h4>
                        <div className={styles.iconText}>
                            <Skeleton circle width={20} height={20} style={{ marginRight: '4px' }} />
                            <Skeleton width={80} />
                        </div>
                    </div>
                    <Skeleton height={40} width={150} style={{ marginTop: '10px' , borderRadius: '40px'}} />
                </div>
            </div>
        ));
    };

    const EmptyState = () => (
        <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
                <img 
                    src="/assets/icons/no-courses.svg" 
                    alt="No courses found" 
                    className={styles.emptyImage}
                />
                <h3>No Courses Available</h3>
                <p>We couldn't find any courses matching your search. Please try a different keyword.</p>
                <button 
                    className={styles.retryButton}
                    onClick={() => fetchCourses()}
                >
                    Refresh Courses
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.recentcourse}>
            <div className={styles.title}>
                <h3>Recent Course</h3>
            </div>
            <div className={styles.grid}>
                {isLoading ? (
                    renderSkeleton()
                ) : courses.length === 0 ? (
                        <EmptyState />
                ) : (
                    courses.map((course, i) => (
                        <div className={styles.griditems} key={i}>
                            <div className={styles.image}>
                                <img src={course?.courseVideo} alt="CardImage" />
                            </div>
                            <div className={styles.details}>
                                <h3>{course?.CourseName}</h3>
                                <p>{course?.description}</p>
                                <div className={styles.iconalignment}>
                                    <h4>${course?.price || "0"}</h4>
                                    <div className={styles.iconText}>
                                        <img src={BathIcon} alt="BathIcon" />
                                        <span>{course?.instructor || "John Doe"}</span>
                                    </div>
                                </div>
                                <Button
                                    text="Enroll Now"
                                    onClick={() => router.push(`/course-details?courseId=${course?._id}`)}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
            {!isLoading && courses.length > 0 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>

    )
}
