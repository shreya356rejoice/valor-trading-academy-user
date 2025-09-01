import React from 'react'
import styles from './blogDetails.module.scss';
import BlogDetailsBanner from './blogDetailsBanner';
import Bloginformation from './bloginformation';
export default function BlogDetails() {
    return (
        <div>
            <BlogDetailsBanner />
            <Bloginformation />
        </div>
    )
}
