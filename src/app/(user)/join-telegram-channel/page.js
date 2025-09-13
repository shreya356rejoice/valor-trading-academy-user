import JoinTelegram from '@/modules/joinTelegram'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <JoinTelegram />
            </Suspense>
        </div>
    )
}
