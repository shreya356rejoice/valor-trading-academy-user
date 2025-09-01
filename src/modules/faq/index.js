import React from 'react'
import styles from './faq.module.scss';
import FaqBanner from './faqBanner';
import FaqList from './faqList';
export default function Faq() {
    return (
        <div>
            <FaqBanner />
            <FaqList />
        </div>
    )
}
