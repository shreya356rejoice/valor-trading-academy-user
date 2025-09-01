import React from 'react'
import OurCourseDetails from './ourCourseDetails'
import CommonBanner from '@/components/commonBanner'

export default function OurCourse() {
    return (
        <div>
            <CommonBanner title='Our Course' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' />
            <OurCourseDetails />
        </div>
    )
}
