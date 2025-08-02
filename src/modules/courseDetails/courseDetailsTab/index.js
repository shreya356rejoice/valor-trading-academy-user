import React from 'react'
import styles from './courseDetailsTab.module.scss';
export default function CourseDetailsTab() {
    return (
        <div className={styles.courseDetailsTab}>
            <button className={styles.active}>Chapter 1</button>
            <button>Chapter 2</button>
            <button>Chapter 3</button>
            <button>Chapter 4</button>
            <button>Chapter 5</button>
            <button>Chapter 6</button>
            <button>Chapter 7</button>
        </div>
    )
}
