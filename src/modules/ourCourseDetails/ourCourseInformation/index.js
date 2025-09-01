import React from 'react'
import styles from './ourCourseInformation.module.scss';
import ClockIcon from '@/components/icons/clockIcon';
import StarIcon from '@/components/icons/starIcon';
import ProfileIcon from '@/components/icons/profileIcon';
import Button from '@/components/button';
const BathPrimaryIcon = '/assets/icons/bath-primary.svg';
export default function OurCourseInformation() {
    return (
        <div className={styles.ourCourseInformation}>
            <div className='container'>
                <div className={styles.contentAlignment}>
                    <div className={styles.leftContent}>
                        <h3>
                            Crypto Currency for Beginners
                        </h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div className={styles.allIconText}>
                            <div className={styles.iconText}>
                                <ClockIcon />
                                <span>12 hours</span>
                            </div>
                            <div className={styles.iconText}>
                                <img src={BathPrimaryIcon} alt='BathPrimaryIcon' />
                                <span>John  Doe</span>
                            </div>
                            <div className={styles.iconText}>
                                <StarIcon />
                                <span>4.8</span>
                            </div>
                            <div className={styles.iconText}>
                                <ProfileIcon />
                                <span>1234</span>
                            </div>
                            <div className={styles.iconText}>
                                <span>Last-Update: 21-6-25  |  English</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightContent}>
                        <Button text="Enroll Now" fill />
                    </div>
                </div>
                <div className={styles.allTabAlignment}>
                    <button>Chapter 1</button>
                    <button>Chapter 2</button>
                    <button>Chapter 3</button>
                    <button>Chapter 4</button>
                    <button>Chapter 5</button>
                    <button>Chapter 6</button>
                    <button>Chapter 7</button>
                </div>
                <div className={styles.grid}>
                    <div className={styles.gridItems}>
                        <div className={styles.box}></div>
                    </div>
                    <div className={styles.gridItems}>
                        <h4>
                            Chapter 1 : This line is written for dummy text.
                        </h4>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make.
                        </p>
                        <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point
                            of using Lorem.
                        </p>
                        <p>
                            as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and
                            web page editors.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
