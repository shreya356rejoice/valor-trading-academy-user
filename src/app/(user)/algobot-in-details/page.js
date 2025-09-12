import AlgoBotDetails from '@/modules/algobotDetails';
import AlgobotInDetails from '@/modules/algobotLandingPage/algobotInDetail';
import React from 'react'
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <AlgobotInDetails />
    </Suspense>
  )
}
