import CommingSoon from '@/components/commingSoon'
import React from 'react'
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommingSoon/>
    </Suspense>
  )
}
