import CourseDetails from '@/modules/courseDetails'
import React from 'react'
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <CourseDetails/>
    </Suspense>
  )
}
