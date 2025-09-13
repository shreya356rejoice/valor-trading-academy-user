import OurCourseDetails from '@/modules/ourCourseDetails'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
            <OurCourseDetails />
            </Suspense>
        </div>
    )
}
