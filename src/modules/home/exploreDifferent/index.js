'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import styles from './exploreDifferent.module.scss';
import Slider from "react-slick";
import { getCourseByType } from '@/app/api/dashboard';
import { useRouter } from 'next/navigation';
const Card1 = '/assets/images/card1.png';
const Card2 = '/assets/images/card9.png';
const Card3 = '/assets/images/card3.png';
const BookIcon = '/assets/icons/book.svg';
export default function ExploreDifferent() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplaySpeed: 3000,
        autoplay: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    variableWidth: false,
                }
            },
        ]

    };

    const [courses, setCourses] = useState([]);
    const controls = useAnimation();
    const ref = useRef(null);
    const router = useRouter();
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourseByType();
                setCourses(response.payload.courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const cardData = [
        {
            id: 1,
            title: "Recorded Courses",
            description:
                "Learn at your own pace with our extensive library of pre-recorded courses. Access high-quality content anytime, anywhere, and Pips Veda trading at your convenience.",
            image: Card1,
            courses: `${courses?.recorded?.length} Recorded Courses`,
            icon: BookIcon,
            link: "/our-course?course=recorded"
        },
        {
            id: 2,
            title: "Live Webinars",
            description:
                "Join interactive live sessions with market experts. Ask questions, participate in discussions, and get your trading queries resolved in real-time.",
            image: Card3,
            courses: `${courses?.live?.length} Live Webinars`,
            icon: BookIcon,
            link: "/our-course?course=live"
        },
        {
            id: 3,
            title: "Traders Meet",
            description:
                "Experience hands-on learning with our expert instructors in a classroom setting. Get personalized guidance and real-time feedback to accelerate your trading journey.",
            image: Card2,
            courses: `${courses?.physical?.length} Traders Meet`,
            icon: BookIcon,
            link: "/our-course?course=physical"
        },

    ];

    return (
        <>
            <div className={styles.exploreDifferent}>
                <div className='container'>
                    <div className={styles.title}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Explore Different type of courses
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Flexible learning formats designed for every trader’s journey.
                        </motion.p>
                    </div>
                </div>
                {/* <div className={styles.leftContentAlignment}>
                    <Slider {...settings}>
                        {
                            cardData.map((item) => {
                                console.log(item, "item")
                                
                                return (
                                    <div>
                                        <div
                                            className={styles.card}
                                        >
                                            <div className={styles.text}>
                                                <div>
                                                    <h3>{item?.title}</h3>
                                                    <p>
                                                        {item?.description}
                                                    </p>
                                                </div>
                                                <button aria-label='112 Courses' >
                                                    <img src={BookIcon} alt='BookIcon' />
                                                    <span>
                                                        {item?.courses}
                                                    </span>
                                                </button>
                                            </div>
                                            <div className={styles.image}>
                                                <img src={item?.image} alt='Card1' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div> */}
                <div className='container'>
                    <div className={styles.explorecards}>
                        {
                            cardData.map((item, index) => {
                                return (
                                    <div key={`card-${index}`}>
                                        <div
                                            className={styles.card}
                                            onClick={() => {
                                                if (item.id === 1) {
                                                    router.push('/our-course');
                                                } else if (item.id === 2) {
                                                    router.push('/live-online-classes');
                                                } else if (item.id === 3) {
                                                    router.push('/offline-sessions');
                                                }
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className={styles.image}>
                                                <img src={item?.image} alt='Card1' />
                                            </div>
                                            <div className={styles.text}>
                                                <div>
                                                    <h3>{item?.title}</h3>
                                                    <p>
                                                        {item?.description}
                                                    </p>
                                                </div>
                                                <button aria-label='112 Courses' >
                                                    <img src={BookIcon} alt='BookIcon' />
                                                    <span>
                                                        {item?.courses || '0'} 
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.whiteblur}></div>
        </>
    )
}
