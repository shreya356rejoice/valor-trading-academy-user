import React from 'react'
import OurCourseInformation from './ourCourseInformation'
import RecetCourse from './recetCourse'
import CommonBanner from '@/components/commonBanner'

export default function OurCourseDetails() {
    return (
        <div>
            <CommonBanner title='Forex Trading for Beginners' description='A simple guide to understanding and starting currency trading in the global forex market.' />
            <OurCourseInformation />
            <RecetCourse />
        </div>
    )
}
