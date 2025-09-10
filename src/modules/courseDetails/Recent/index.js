'use client'
import React, { useEffect, useState } from 'react'
import styles from './recent.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCourses } from '@/app/api/dashboard';
import Button from '@/components/button';

const ITEMS_PER_PAGE = 4;

export default function Recent({ searchQuery, courses, setCourses }) {
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
    const currentCourseId = searchParams.get('courseId');

    const fetchCourses = async (page = 1) => {
        try {
            setIsLoading(true);
            const params = {
                searchQuery: searchQuery || "",
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
            setCourses([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        fetchCourses(1);
    }, [searchQuery, selectedTab]);

    return (
        <>
            <div className={styles.recentCourseAlignment}>
                <div className={styles.title}>
                    <h2>Recent Courses</h2>
                </div>
            </div>
            <div className={styles.grid}>
                {allCourses
                  .filter(course => course._id !== currentCourseId) // Filter out current course
                  .map((course, i) => (
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
                                    {/* <img src={BathIcon} alt="BathIcon" /> */}
                                    <span>{course?.instructor || "John Doe"}</span>
                                </div>
                            </div>
                            <Button
                                text="Enroll Now"
                                onClick={() => router.push(`/course-details?courseId=${course?._id}`)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}