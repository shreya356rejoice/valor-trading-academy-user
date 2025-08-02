import React from 'react'
import styles from './recentcourse.module.scss';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
const CardImage = '/assets/images/card9.png';
const BathIcon = '/assets/icons/bath.svg';
export default function Recentcourse() {
    return (
        <div className={styles.recentcourse}>
            <div className={styles.title}>
                <h3>
                    Recent Course
                </h3>
            </div>
            <div className={styles.grid}>
                {
                    [...Array(4)].map((_, i) => {
                        return (
                            <div className={styles.griditems} key={i}>
                                <div className={styles.image}>
                                    <img src={CardImage} alt="CardImage" />
                                </div>
                                <div className={styles.details}>
                                    <h3>Crypto Currency for Beginners</h3>
                                    <p>
                                        Lorem Ipsum has been the industry's standard dummy text
                                        ever...
                                    </p>
                                    <div className={styles.iconalignment}>
                                        <h4>
                                            $789
                                        </h4>
                                        <div className={styles.iconText}>
                                            <img src={BathIcon} alt="BathIcon" />
                                            <span>John  Doe</span>
                                        </div>
                                    </div>
                                    <Button text="Enroll Now" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Pagination/>
        </div>
    )
}
