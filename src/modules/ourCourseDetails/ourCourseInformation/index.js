"use client"
import React, { useEffect, useState } from 'react'
import styles from './ourCourseInformation.module.scss';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import Button from '@/components/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { getChapters, getCourses } from '@/app/api/dashboard';
import { getCookie } from '../../../../cookie';
const BathPrimaryIcon = '/assets/icons/bath-primary.svg';

export default function OurCourseInformation() {
    const [course, setCourse] = useState({});
    const [chapters, setChapters] = useState([]);
    const [activeChapter, setActiveChapter] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const id = useSearchParams().get('id');
    const router = useRouter();

    // Set the first chapter as active when chapters are loaded
    useEffect(() => {
        if (chapters.length > 0 && !activeChapter) {
            setActiveChapter(chapters[0]);
        }
    }, [chapters]);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const response = await getChapters(id);
                setChapters(response.payload.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        const fetchCourse = async () => {
            try {
                const response = await getCourses({ id });
                console.log(response, "response.payload.data[0]");
                
                setCourse(response.payload.data[0]);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
        const userToken = getCookie('userToken');
        if (userToken) {
            setIsLogin(true);
            fetchChapter();
        }
        else {
            setIsLogin(false);
        }
    }, [id]);

    console.log(chapters, "=====chapters");

    return (
        <div className={styles.ourCourseInformation}>
            <div className='container'>
                <div className={styles.contentAlignment}>
                    <div className={styles.leftContent}>
                        <h3>
                            {course?.CourseName}
                        </h3>
                        <p>
                            {course?.description}
                        </p>
                        <div className={styles.allIconText}>
                            <div className={styles.iconText}>
                                <ClockIcon />
                                <span>{course?.hours} hours</span>
                            </div>
                            <div className={styles.iconText}>
                                <img src={BathPrimaryIcon} alt='BathPrimaryIcon' />
                                <span>{course?.instructor}</span>
                            </div>
                            {/* <div className={styles.iconText}>
                                <StarIcon />
                                <span>4.8</span>
                            </div> */}
                            <div className={styles.iconText}>
                                <ProfileIcon />
                                <span>{course?.subscribed}</span>
                            </div>
                            <div className={styles.iconText}>
                                <span>Last-Update: {course?.updatedAt ? new Date(course.updatedAt).toLocaleDateString('en-GB') : 'N/A'}  |  English</span>
                            </div>
                            <div className={styles.rightContent}>
                                <Button text="Enroll Now" fill />
                            </div>
                        </div>

                    </div>

                </div>
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
                {console.log(activeChapter, "activeChapter")
                }
                {activeChapter && (
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
                )}
            </div>
        </div>
    )
}
