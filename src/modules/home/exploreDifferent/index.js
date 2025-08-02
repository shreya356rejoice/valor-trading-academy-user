'use client';
import { motion } from 'framer-motion';
import React from 'react'
import styles from './exploreDifferent.module.scss';
import Slider from "react-slick";
const Card1 = '/assets/images/card1.png';
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
                            Choose from a wide range of focused financial categories
                        </motion.p>
                    </div>
                </div>
                <div className={styles.leftContentAlignment}>
                    <Slider {...settings}>
                        {
                            [...Array(5)].map(() => {
                                return (
                                    <div>
                                        <div
                                            className={styles.card}
                                        >
                                            <div className={styles.text}>
                                                <div>
                                                    <h3>Forex Trading</h3>
                                                    <p>
                                                        Lorem Ipsum simply dummy
                                                        text of the printing typesetting
                                                        industry Lorem Ipsum is simply
                                                        dummy text of the printing.
                                                    </p>
                                                </div>
                                                <button>
                                                    <img src={BookIcon} alt='BookIcon' />
                                                    <span>
                                                        112 Courses
                                                    </span>
                                                </button>
                                            </div>
                                            <div className={styles.image}>
                                                <img src={Card1} alt='Card1' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
            <div className={styles.whiteblur}></div>
        </>
    )
}
