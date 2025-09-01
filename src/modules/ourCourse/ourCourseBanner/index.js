import React from 'react'
import styles from './ourCourseBanner.module.scss';
export default function OurCourseBanner() {
    return (
        <div className={styles.ourCourseBanner}>
            <div className='container'>
                <h1>
                    Our Course
                </h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                </p>
            </div>
        </div>
    )
}
