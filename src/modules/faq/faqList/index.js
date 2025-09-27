'use client'
import React, { useState } from 'react'
import styles from './faqList.module.scss';
import PlusIcon from '@/components/icons/plusIcon';
import classNames from 'classnames';

const faqData = [
    {
        question: "What is Algobot and how can it help me with trading?",
        answer:
            "Algobot is an automated trading system that executes trades based on predefined algorithms. It helps traders by analyzing market conditions 24/7, executing trades at optimal times, and removing emotional decision-making from trading.",
    },
    {
        question: "What courses do you offer for algorithmic trading?",
        answer:
            "We offer a comprehensive curriculum including: Introduction to Algorithmic Trading, Advanced Trading Strategies, Backtesting Techniques, Risk Management, and Live Trading Implementation. Our courses are designed for both beginners and experienced traders.",
    },
    {
        question: "Do I need programming knowledge to use Algobot?",
        answer:
            "While basic programming knowledge is helpful, it's not mandatory. We provide user-friendly interfaces and pre-built strategies. However, our advanced courses do cover custom strategy development which may require some coding skills.",
    },
    {
        question: "What are the subscription plans available?",
        answer:
            "We offer three main plans: Basic (limited features, paper trading only), Pro (full features with limited live trading), and Enterprise (unlimited access with premium support). All plans include access to our educational resources.",
    },
    {
        question: "Can I test the Algobot before subscribing?",
        answer:
            "Yes! We offer a 14-day free trial with access to most features in a paper trading environment. This allows you to test the platform's capabilities risk-free before committing to a subscription.",
    },
    {
        question: "What kind of support do you provide?",
        answer:
            "We provide 24/5 email support, live chat during business hours, weekly webinars, and a comprehensive knowledge base. Our Pro and Enterprise plans include priority support and one-on-one mentoring sessions.",
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
                <h3>EduFins Academy</h3>
            </div>
        </div>
    )
}
