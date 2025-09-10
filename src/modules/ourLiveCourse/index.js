import React from 'react'
import CommonBanner from '@/components/commonBanner'
import OurCourseDetails from '../ourCourse/ourCourseDetails'

export default function OurLiveCourse() {
    return (
        <div>
            <CommonBanner title='Live Online Classes' description='Join our expert mentors in real-time through interactive online sessions. These live classes create a collaborative environment where you can ask questions, engage in discussions, and learn from both instructors and peers. Stay up-to-date with the latest market trends, trading strategies, and industry insights — all from the comfort of your home.' />
            <OurCourseDetails />
        </div>
    )
}
