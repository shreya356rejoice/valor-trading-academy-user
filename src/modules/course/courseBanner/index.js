'use client'
import React, { useEffect, useState } from 'react'
import styles from './courseBanner.module.scss';
import Slider from "react-slick";
import RightIcon from '@/components/icons/rightIcon';
import { getCourses } from '@/app/api/courses';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';

export default function CourseBanner({searchQuery,setSearchQuery}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [isLoading, setIsLoading] = useState(true);
    const [bannerCourses, setBannerCourses] = useState([]);
    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            const data = await getCourses({
                searchQuery,
                page: 1,
                limit: 3
            });
            if(data.success){
                setBannerCourses(data?.payload?.data.slice(0, 3) || []);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            setIsLoading(false);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const CourseBannerSkeleton = ({ settings }) => (
        <div className={styles.griditems}>
            <Slider {...settings}>
                {[1, 2, 3].map((_, index) => (
                    <div key={`skeleton-${index}`}>
                        <div className={styles.card}>
                            <div className={styles.content}>
                                <div>
                                    <Skeleton height={24} width="70%" style={{ marginBottom: '10px' }} />
                                    <Skeleton height={16} count={2} style={{ marginBottom: '15px' }} />
                                    <div className={styles.iconText} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Skeleton circle width={20} height={20} style={{ marginRight: '8px' }} />
                                        <Skeleton width={100} height={16} />
                                    </div>
                                </div>
                                <div className={styles.cardFooter} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Skeleton width={60} height={24} />
                                    <div className={styles.rightText}>
                                        <Skeleton width={80} height={16} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.image}>
                                <Skeleton height={180} style={{ display: 'block', borderRadius: '10px' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

    return (
        <div className={styles.courseBanner}>
            <div className={styles.line}></div>

            <div className={styles.spacing}>
                <div className={styles.lineLeft}></div>
                <div className={styles.lineRight}></div>
                <div className={styles.grid}>
                    <div className={styles.griditems}>
                        <h2>
                            Lorem Ipsum simply dummy printing
                            and typesetting industry.
                        </h2>
                        <p>
                            Lorem Ipsum has been the industry's standard dummy ever since
                            when an unknown printer took a galley of type.
                        </p>
                        <div className={styles.relativeInput}>
                            <input type="text" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
                            <div className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <g clipPath="url(#clip0_2724_6410)">
                                        <path d="M21.296 20.0385L16.06 14.5928C17.4067 12.9949 18.1449 10.9722 18.1439 8.88249C18.1439 3.98476 14.1591 0 9.2614 0C4.36367 0 0.378906 3.98476 0.378906 8.88249C0.378906 13.7802 4.36367 17.765 9.2614 17.765C11.1001 17.765 12.8522 17.2104 14.3503 16.1576L19.6261 21.6447C19.8466 21.8737 20.1432 22 20.4611 22C20.7619 22 21.0473 21.8853 21.264 21.6768C21.4851 21.4636 21.6127 21.1714 21.6187 20.8643C21.6247 20.5572 21.5086 20.2602 21.296 20.0385ZM9.2614 2.31717C12.8816 2.31717 15.8267 5.2623 15.8267 8.88249C15.8267 12.5027 12.8816 15.4478 9.2614 15.4478C5.6412 15.4478 2.69608 12.5027 2.69608 8.88249C2.69608 5.2623 5.6412 2.31717 9.2614 2.31717Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2724_6410">
                                            <rect width="22" height="22" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {isLoading ? (
                        <CourseBannerSkeleton settings={settings} />
                    ) : (
                    <div className={styles.griditems}>
                        <Slider {...settings}>
                            {
                                bannerCourses.map((course, i) => {
                                    return (
                                        <div>
                                            <div className={styles.card}>
                                                <div className={styles.content}>
                                                    <div>
                                                        <h3>{course?.CourseName}</h3>
                                                        <p>
                                                            {course?.description}
                                                        </p>
                                                        <div className={styles.iconText}>
                                                            <img src={BathIcon} alt="BathIcon" />
                                                            <span>{course?.instructor || 'John Doe'}</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.cardFooter}>
                                                        <h4>
                                                            ${course?.price}
                                                        </h4>
                                                        <div className={styles.rightText} onClick={() => router.push(`/course-details?courseId=${course?._id}`)}>
                                                            <span>Enroll Now</span>
                                                            <RightIcon />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.image}>
                                                    <img src={course?.courseVideo} alt="CardImage" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>)}
                </div>
            </div>
            <div className={styles.lineBototm}></div>

        </div>
    )
}
