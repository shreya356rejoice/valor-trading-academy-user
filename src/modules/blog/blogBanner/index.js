import React from 'react'
import styles from './blogBanner.module.scss';
export default function BlogBanner() {
    return (
        <div className={styles.blogBanner}>
            <div className='container'>
                <h1>
                    Financial Insights & Articles
                </h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
        </div>
    )
}
