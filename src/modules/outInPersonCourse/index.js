import React from 'react'
import CommonBanner from '@/components/commonBanner'
import OurCourseDetails from '../ourCourse/ourCourseDetails'

export default function OurInPersonCourse() {
    return (
        <div>
            <CommonBanner title='In Person Courses' description='For those who thrive in a traditional classroom setting, our in-person sessions offer a hands-on, immersive learning experience. Meet your mentors face-to-face, participate in live trading simulations, and benefit from personalized guidance in a focused environment. Ideal for learners who prefer direct interaction and real-time feedback.' />
            <OurCourseDetails />
        </div>
    )
}