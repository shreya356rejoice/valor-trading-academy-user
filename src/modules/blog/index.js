import React from 'react'
import BlogList from './blogList'
import CommonBanner from '@/components/commonBanner'

export default function Blog() {
    return (
        <div>
            <CommonBanner title='Discover Our Latest Blogs' description='Explore fresh insights, tips, and stories from our latest blog posts.' />
            <BlogList />
        </div>
    )
}
