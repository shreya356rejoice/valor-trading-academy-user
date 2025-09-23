'use client'
import React, { useEffect, useState } from 'react'
import styles from './recentcourse.module.scss';
import Button from '@/components/button';
import Pagination from '@/components/pagination';


import { useRouter, useSearchParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getCourses } from '@/app/api/dashboard';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';

const ITEMS_PER_PAGE = 4;

export default function Recentcourse({ searchQuery, courses, setCourses }) {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const [selectedTab, setSelectedTab] = useState(category || "recorded");
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
        // Always update selectedTab based on URL category parameter
        setSelectedTab(category || "recorded");
    }, [category]);

    useEffect(() => {
        // Fetch courses when selectedTab or searchQuery changes
        fetchCourses(1);
    }, [searchQuery, selectedTab]);

    // Handle tab change
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
            fetchCourses(newPage);
            // Optional: Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderSkeleton = () => {
        return Array(3).fill(0).map((_, index) => (
            <div className={styles.griditems} key={`skeleton-${index}`}>
                <div className={styles.image}>
                    <Skeleton height={180} style={{ display: 'block', borderRadius: '10px' }} />
                </div>
                <div className={styles.details} style={{ padding: '0px' }}>
                    <h3><Skeleton width="80%" /></h3>
                    <p><Skeleton count={2} /></p>
                    <div className={styles.iconalignment} style={{ padding: '0px' }}>
                        <h4 className={styles.iconText}><Skeleton width={40} height={20} /></h4>
                        <div className={styles.iconText}>
                            <Skeleton circle width={20} height={20} style={{ marginRight: '4px' }} />
                            <Skeleton width={80} />
                        </div>
                    </div>
                    <Skeleton height={40} width={150} style={{ marginTop: '10px', borderRadius: '40px' }} />
                </div>
            </div>
        ));
    };

    const EmptyState = () => (
        <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
                <div className={styles.emptyIllustration}>
                    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M90 15C50.5 15 17.5 48 17.5 87.5C17.5 127 50.5 160 90 160C129.5 160 162.5 127 162.5 87.5C162.5 48 129.5 15 90 15ZM90 147.5C56.5 147.5 30 121 30 87.5C30 54 56.5 27.5 90 27.5C123.5 27.5 150 54 150 87.5C150 121 123.5 147.5 90 147.5Z" fill="#E5E7EB"/>
                        <path d="M112.5 72.5H100V60C100 55 96 50 90 50C84 50 80 55 80 60V72.5H67.5C62.5 72.5 57.5 76.5 57.5 82.5C57.5 88.5 62.5 92.5 67.5 92.5H80V105C80 110 84 115 90 115C96 115 100 110 100 105V92.5H112.5C117.5 92.5 122.5 88.5 122.5 82.5C122.5 76.5 117.5 72.5 112.5 72.5ZM97.5 82.5V105C97.5 107.8 94.3 110 90 110C85.7 110 82.5 107.8 82.5 105V82.5H67.5C65.7 82.5 62.5 81.3 62.5 77.5C62.5 73.7 65.7 72.5 67.5 72.5H82.5V60C82.5 57.2 85.7 55 90 55C94.3 55 97.5 57.2 97.5 60V72.5H112.5C114.3 72.5 117.5 73.7 117.5 77.5C117.5 81.3 114.3 82.5 112.5 82.5H97.5Z" fill="#9CA3AF"/>
                    </svg>
                </div>
                <h3>No Courses Found</h3>
                <p>We couldn't find any courses matching your criteria.</p>
            </div>
        </div>
    );

    return (
        <div className={styles.recentcourse}>
            <div className={styles.tabCenteralignment}>
                <div className={styles.tab}>
                    <button aria-label='Pre Recorded Courses' className={selectedTab === "recorded" ? styles.active : ""} onClick={() => handleTabChange("recorded")}>Pre Recorded Courses</button>
                    <button aria-label='Live Courses' className={selectedTab === "live" ? styles.active : ""} onClick={() => handleTabChange("live")}>Live Webinars</button>
                    <button aria-label='In Person Courses' className={selectedTab === "physical" ? styles.active : ""} onClick={() => handleTabChange("physical")}>Traders Meet</button>
                    <button aria-label='Trending Courses' className={selectedTab === "trending" ? styles.active : ""} onClick={() => setSelectedTab("trending")}>Trending Courses</button>
                    <button aria-label='Popular Courses' className={selectedTab === "popular" ? styles.active : ""} onClick={() => setSelectedTab("popular")}>Popular Courses</button>
                </div>
            </div>
            <div className={styles.grid}>
                {isLoading ? (
                    renderSkeleton()
                ) : allCourses.length === 0 ? (
                    <EmptyState />
                ) : (
                    allCourses.map((course, i) => (
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
                                {console.log(selectedTab,"selectedTab")
                                }
                                {/* {course?.isPayment ? (<Button
                                    text="Enrolled"
                                    fill
                                    onClick={() => router.push(`/my-course-details?courseId=${course?._id}`)}
                                />) : (<Button
                                    text="Enroll Now"
                                    onClick={() => router.push(`/course-details?courseId=${course?._id}`)}
                                />)} */}

                                {selectedTab === "recorded" ? (
                                    course?.isPayment ? (
                                        <Button
                                            text="Enrolled"
                                            fill
                                            onClick={() =>
                                                router.push(`/my-course-details?courseId=${course?._id}`)
                                            }
                                        />
                                    ) : (
                                        <Button
                                            text="Enroll Now"
                                            onClick={() =>
                                                router.push(`/course-details?courseId=${course?._id}`)
                                            }
                                        />
                                    )
                                ) : (selectedTab === "live" || selectedTab === "physical") ? (
                                    course?.registration?.isActive ? (
                                        <Button
                                            text="Registered"
                                            fill
                                            onClick={() =>
                                                router.push(`/my-course-details?courseId=${course?._id}&category=${selectedTab}`)
                                            }
                                        />
                                    ) : (
                                        <Button
                                            text="Register"
                                            onClick={() =>
                                                router.push(`/course-details?courseId=${course?._id}&category=${selectedTab}`)
                                            }
                                        />
                                    )
                                ) : null}

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
