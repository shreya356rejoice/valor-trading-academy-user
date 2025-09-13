import React from 'react'
import styles from './blogDetails.module.scss';
import BlogDetailsBanner from './blogDetailsBanner';
import Bloginformation from './bloginformation';
export default function BlogDetails({blogDetail}) {
    return (
        <div>
            <BlogDetailsBanner title={blogDetail?.title} />
            <Bloginformation blogDetail={blogDetail}/>
        </div>
    )
}
