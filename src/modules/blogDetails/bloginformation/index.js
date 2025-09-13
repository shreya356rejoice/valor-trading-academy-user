"use client"
import React from 'react'
import styles from './bloginformation.module.scss';
import DateIcon from '@/components/icons/dateIcon';
import { marked } from 'marked';
const BlogImage = '/assets/images/blog4.png';

export default function Bloginformation({blogDetail}) {
    return (
        <>
            <div className={styles.bloginformation}>
                <div className='container'>
                <img src={process.env.NEXT_PUBLIC_NEXT_GRAPHQL_IMAGE_URL + blogDetail?.detailImage?.url} alt="BlogDetailsImage" />
                    <div className={styles.dateAlignment}>
                        <DateIcon />
                        <span>{blogDetail?.createdAt ? new Date(blogDetail.createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) : ''}</span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: marked(blogDetail?.blogContent || '') }} />
                </div>
            </div>
             <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </>
    )
}
