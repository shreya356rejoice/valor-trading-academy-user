import { PreventProvider } from '@/context/PreventContext';
import CourseDetails from '@/modules/courseDetails'
import React from 'react'
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreventProvider>
        <CourseDetails/>
    </PreventProvider>
    </Suspense>
  )
}
