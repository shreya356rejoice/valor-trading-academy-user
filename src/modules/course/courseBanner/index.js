'use client'
import React from 'react'
import styles from './courseBanner.module.scss';
import Slider from "react-slick";
import RightIcon from '@/components/icons/rightIcon';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';

export default function CourseBanner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className={styles.courseBanner}>
            <div className={styles.line}></div>

            <div className={styles.spacing}>
                <div className={styles.lineLeft}></div>
                <div className={styles.lineRight}></div>
                <div className={styles.grid}>
                    <div className={styles.griditems}>
                        <h2>
                            Lorem Ipsum simply dummy printing
                            and typesetting industry.
                        </h2>
                        <p>
                            Lorem Ipsum has been the industry's standard dummy ever since
                            when an unknown printer took a galley of type.
                        </p>
                        <div className={styles.relativeInput}>
                            <input type="text" placeholder="Search..." />
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
                    <div className={styles.griditems}>
                        <Slider {...settings}>
                            {
                                [...Array(4)].map(() => {
                                    return (
                                        <div>
                                            <div className={styles.card}>
                                                <div className={styles.content}>
                                                    <div>
                                                        <h3>Crypto Trading</h3>
                                                        <p>
                                                            Lorem Ipsum simply dummy
                                                            text the printing typesetting
                                                            industry Lorem Ipsum.
                                                        </p>
                                                        <div className={styles.iconText}>
                                                            <img src={BathIcon} alt="BathIcon" />
                                                            <span>Jonat bailey</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.cardFooter}>
                                                        <h4>
                                                            $859
                                                        </h4>
                                                        <div className={styles.rightText}>
                                                            <span>Enroll Now</span>
                                                            <RightIcon />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.image}>
                                                    <img src={CardImage} alt="CardImage" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
            <div className={styles.lineBototm}></div>

        </div>
    )
}
