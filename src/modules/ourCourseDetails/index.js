import React from 'react'
import OurCourseInformation from './ourCourseInformation'
import RecetCourse from './recetCourse'
import CommonBanner from '@/components/commonBanner'

export default function OurCourseDetails() {
    return (
        <div>
            <CommonBanner title='Crypto Currency for Beginners' description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' />
            <OurCourseInformation />
            <RecetCourse />
        </div>
    )
}
