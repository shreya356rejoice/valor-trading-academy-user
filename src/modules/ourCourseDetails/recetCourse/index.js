import React from 'react'
import styles from './recetCourse.module.scss';
import Button from '@/components/button';
const CoursesImage = '/assets/images/course.png';
const BathIcon = '/assets/icons/bath-primary.svg';
export default function RecetCourse() {
    return (
        <>
            <div className={styles.recetCourse}>
                <div className='container'>
                    <div className={styles.title}>
                        <h2>
                            Recet Course
                        </h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry.
                        </p>
                    </div>
                    <div className={styles.grid}>
                        {
                            [...Array(3)].map((_, i) => {
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
