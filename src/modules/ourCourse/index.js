import React from 'react'
import OurCourseDetails from './ourCourseDetails'
import CommonBanner from '@/components/commonBanner'

export default function OurCourse() {
    return (
        <div>
            <CommonBanner title='Pre Recorded Courses' description='Access a library of high-quality, pre-recorded lessons that allow you to learn at your own pace, on your own time. These courses are perfect for self-starters who prefer flexibility and the ability to revisit complex topics whenever needed. Each module is carefully structured to ensure a step-by-step understanding of trading concepts, tools, and strategies.' />
            <OurCourseDetails />
        </div>
    )
}
