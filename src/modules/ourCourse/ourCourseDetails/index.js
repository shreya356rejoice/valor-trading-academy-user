import React from 'react'
import styles from './ourCourseDetails.module.scss';
import Button from '@/components/button';
const CoursesImage = '/assets/images/course.png';
const BathIcon = '/assets/icons/bath-primary.svg';
export default function OurCourseDetails() {
    return (
        <>
            <div className={styles.ourCourseDetails}>
                <div className='container'>
                    <div className={styles.tabCenter}>
                        <div className={styles.tab}>
                            <button className={styles.active}>On demand courses</button>
                            <button>Live Online Courses</button>
                            <button>In-Person Courses</button>
                        </div>
                    </div>
                    <div className={styles.grid}>
                        {
                            [...Array(6)].map((_, i) => {
                                return (
                                    <div className={styles.griditems} key={i}>
                                        <div className={styles.cardImage}>
                                            <img src={CoursesImage} alt='CoursesImage' />
                                        </div>
                                        <div className={styles.cardDetails}>
                                            <h3>
                                                Crypto Currency for Beginners
                                            </h3>
                                            <p>
                                                Lorem Ipsum has been the industry's standard dummy text
                                                ever...
                                            </p>
                                            <div className={styles.twoContentAlignment}>
                                                <h4>
                                                    $789
                                                </h4>
                                                <div className={styles.iconText}>
                                                    <img src={BathIcon} alt='BathIcon' />
                                                    <span>John  Doe</span>
                                                </div>
                                            </div>
                                            <Button text="Enroll Now" fill />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </>
    )
}
