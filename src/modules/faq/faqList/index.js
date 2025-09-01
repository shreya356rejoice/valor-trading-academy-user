'use client'
import React, { useState } from 'react'
import styles from './faqList.module.scss';
import PlusIcon from '@/components/icons/plusIcon';
import classNames from 'classnames';

const faqData = [
    {
        question: "What is Lorem Ipsum?",
        answer:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        question: "Why do we use it?",
        answer:
            "It is a long established fact that a reader will be distracted by the readable content of a page.",
    },
    {
        question: "Where does it come from?",
        answer:
            "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
    {
        question: "Where can I get some?",
        answer:
            "There are many variations of passages of Lorem Ipsum available.",
    },
    {
        question: "Is Lorem Ipsum safe to use?",
        answer:
            "Yes, Lorem Ipsum has been used as dummy text for centuries.",
    },
    {
        question: "Can I customize Lorem Ipsum?",
        answer:
            "Absolutely, you can generate Lorem Ipsum text in different lengths and styles.",
    },
];



export default function FaqList() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div>

            <div className={styles.faqListAlignment}>
                <div className='container'>
                    {faqData.map((faq, index) => (
                        <div key={index} className={styles.mainFaq}>
                            <div className={styles.faqHeader}>
                                <h3>{faq.question}</h3>
                                <div
                                    className={classNames(
                                        styles.icon,
                                        activeIndex === index ? styles.rotate : ""
                                    )}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <PlusIcon />
                                </div>
                            </div>
                            <div
                                className={classNames(
                                    styles.faqBody,
                                    activeIndex === index ? styles.show : styles.hide
                                )}
                            >
                                <div className={styles.spacing}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </div>
    )
}
