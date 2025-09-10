import React from 'react'
import styles from './myCourse.module.scss';
import MyCourseBanner from './myCourseBanner';
import MyCourseDetails from './myCourseDetails';
export default function MyCourse() {
    return (
        <div className={styles.algobotPage}>
            <MyCourseBanner />
            <MyCourseDetails />
        </div>
    )
}
