import React from 'react'
import BlogList from './blogList'
import CommonBanner from '@/components/commonBanner'

export default function Blog() {
    return (
        <div>
            <CommonBanner title='Financial Insights & Articles' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' />
            <BlogList />
        </div>
    )
}
