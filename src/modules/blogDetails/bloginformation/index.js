import React from 'react'
import styles from './bloginformation.module.scss';
import DateIcon from '@/components/icons/dateIcon';
const BlogImage = '/assets/images/blog4.png';
export default function Bloginformation() {
    return (
        <>
            <div className={styles.bloginformation}>
                <div className='container'>
                    <img src={BlogImage} alt='BlogImage' />
                    <div className={styles.dateAlignment}>
                        <DateIcon />
                        <span>October 20, 2024</span>
                    </div>
                    <p>
                        Objectively restore stand-alone markets rather than enterprise-wide products. Uniquely underwhelm best-of-breed mindshare through adaptive niches. Interactively leverage existing innovative e-services seamlessly parallel task open-source content without resource
                        sucking technology.
                    </p>
                    <p>
                        Dramatically cultivate frictionless communities with enterprise-wide customer service. Dramatically simplify web-enabled growth strategies rather than integrated imperatives. Interactively leverage existing innovative e-services customer service. Intrinsicly impact web-enabled value vis-a-vis innovative customer service. Continually procrastinate efficient growth strategies for
                        backend experiences.
                    </p>
                    <p>
                        Credibly visualize distinctive testing procedures without end-to-end ROI. Seamlessly brand cross- platform communities with backend markets. Assertively utilize business services through robust solutions. Rapidiously deliver cross-unit infrastructures rather than accurate
                        metrics.
                    </p>
                    <img src={BlogImage} alt='BlogImage' />
                    <p>
                        Objectively restore stand-alone markets rather than enterprise-wide products. Uniquely underwhelm best-of-breed mindshare through adaptive niches. Interactively leverage existing innovative e-services seamlessly parallel task open-source content without resource
                        sucking technology.
                    </p>
                    <p>
                        Dramatically cultivate frictionless communities with enterprise-wide customer service. Dramatically simplify web-enabled growth strategies rather than integrated imperatives. Interactively leverage existing innovative e-services customer service. Intrinsicly impact web-enabled value vis-a-vis innovative customer service. Continually procrastinate efficient growth strategies for
                        backend experiences.
                    </p>
                    <p>
                        Credibly visualize distinctive testing procedures without end-to-end ROI. Seamlessly brand cross- platform communities with backend markets. Assertively utilize business services through robust solutions. Rapidiously deliver cross-unit infrastructures rather than accurate
                        metrics.
                    </p>
                    <p>
                        Objectively restore stand-alone markets rather than enterprise-wide products. Uniquely underwhelm best-of-breed mindshare through adaptive niches. Interactively leverage existing innovative e-services seamlessly parallel task open-source content without resource
                        sucking technology.
                    </p>
                    <p>
                        Dramatically cultivate frictionless communities with enterprise-wide customer service. Dramatically simplify web-enabled growth strategies rather than integrated imperatives. Interactively leverage existing innovative e-services customer service. Intrinsicly impact web-enabled value vis-a-vis innovative customer service. Continually procrastinate efficient growth strategies for
                        backend experiences.
                    </p>
                    <p>
                        Credibly visualize distinctive testing procedures without end-to-end ROI. Seamlessly brand cross- platform communities with backend markets. Assertively utilize business services through robust solutions. Rapidiously deliver cross-unit infrastructures rather than accurate
                        metrics.
                    </p>
                </div>
            </div>
             <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </>
    )
}
