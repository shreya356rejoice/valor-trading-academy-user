import AlgoBotDetails from '@/modules/algobotDetails';
import React from 'react'
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AlgoBotDetails/>
    </Suspense>
  )
}
