import React from 'react'
import styles from './course.module.scss';
import CourseBanner from './courseBanner';
import Recentcourse from './recentcourse';
export default function Course() {
  return (
    <div className={styles.coursePageAlignment}>
      <div className={styles.pageTitle}>
        <h2>
          <span>Hello Ahmad,</span> welcome!
        </h2>
        <p>
          Your monetisation journey on TagMango starts here!
        </p>
      </div>
      <CourseBanner/>
      <Recentcourse/>
    </div>
  )
}
