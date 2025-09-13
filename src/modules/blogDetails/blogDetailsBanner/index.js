import React from 'react'
import styles from './blogDetailsBanner.module.scss';
export default function BlogDetailsBanner({title}) {
    return (
        <div className={styles.blogDetailsBanner}>
            <div className='container-lg'>
                <h1>
                    {title}
                </h1>
                {/* <p>
                    Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                </p> */}
            </div>
        </div>
    )
}
