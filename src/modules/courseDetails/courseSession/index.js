'use client'
import React, { useEffect, useState } from 'react'
import styles from './courseSession.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCourses } from '@/app/api/dashboard';
import Button from '@/components/button';

const NoCoursesIcon = '/assets/icons/no-courses.svg';
const LockIcon = '/assets/icons/lock.svg';

const ITEMS_PER_PAGE = 4;

export default function CourseSession({ searchQuery, sessions, setSessions }) {
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
            setSessions([]);
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
                    <h2>Upcoming Session</h2>
                </div>
            </div>
            <div className={styles.overlayrelative}>
                <div className={styles.grid}>
                    {sessions?.data?.length > 0 ?
                        (sessions?.data?.map((session, i) => (
                            <div className={styles.griditems} key={i}>
                                <div className={styles.image}>
                                    <img src={session?.sessionVideo} alt="CardImage" />
                                </div>
                                <div className={styles.details}>
                                    <h3>{session?.sessionName}</h3>
                                    <p>{session?.description}</p>
                                    <div className={styles.iconalignment}>
                                        <span>{session?.date ? new Date(session.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : "N/A"}</span>
                                        <div className={styles.iconText}>
                                            <span>{session?.time || "N/A"}</span>
                                        </div>
                                    </div>
                                    <Button
                                        text="Join Meeting"
                                        onClick={() => window.open(session?.meetingLink, '_blank', 'noopener,noreferrer')}
                                    />
                                </div>
                            </div>
                        ))) : (
                            <>
                                <div className={styles.noChapters}>
                                    <div className={styles.iconCenterAlignment}>
                                        <img src={NoCoursesIcon} alt="No Courses" />
                                    </div>
                                    <p>No Course Content Available</p>
                                    <p>This course doesn't have any chapters yet. Please check back later.</p>
                                </div>
                                <div></div>
                            </>
                        )}

                    {sessions?.isPayment === false && (
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
            </div>
        </>
    )
}