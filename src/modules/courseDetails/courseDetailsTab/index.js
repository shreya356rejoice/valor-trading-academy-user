import React from 'react'
import styles from './courseDetailsTab.module.scss';
export default function CourseDetailsTab() {
    return (
        <div className={styles.courseDetailsTab}>
            <button aria-label='Chapter 1' className={styles.active}>Chapter 1</button>
            <button aria-label='Chapter 2'>Chapter 2</button>
            <button aria-label='Chapter 3'>Chapter 3</button>
            <button aria-label='Chapter 4'>Chapter 4</button>
            <button aria-label='Chapter 5'>Chapter 5</button>
            <button aria-label='Chapter 6'>Chapter 6</button>
            <button aria-label='Chapter 7'>Chapter 7</button>
        </div>
    )
}
