'use client'
import React, { useEffect, useState } from 'react';
import styles from './articles.module.scss';
import ProfileIcon from '@/components/icons/profileIcon';
import CalanderIcon from '@/components/icons/calanderIcon';
import Button from '@/components/button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_BLOG_DATA } from '@/graphql/getBlogData';
import { useRouter } from 'next/navigation';

const ArticlesImage = '/assets/images/articles.png';

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function Articles() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [blogs, setBlogs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data: blogData, loading, error } = useQuery(GET_ALL_BLOG_DATA, {
          variables: {
              pagination: {
                  pageSize: itemsPerPage,
                  page: currentPage
              },
              // filters: filters
          },
          fetchPolicy: 'cache-and-network'
      });

      useEffect(() => {
              if (blogData) {
                setBlogs(blogData?.blogs_connection?.nodes);
              }
            }, [blogData]);

  return (
    <>
      <div className={styles.articles}>
        <div className='container'>
          <motion.div
            className={styles.title}
            ref={ref}
            variants={titleVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          > 
            <h2>
              Financial Insights & <span>Articles</span>
            </h2>
            <p>
              Explore our curated writings on markets, strategies, and more
            </p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {
              blogs?.map((blog, i) => (
                <motion.div className={styles.griditems} key={i} variants={cardVariants}>
                  <div className={styles.image}>
                   { console.log(blog,"blog")}
                    
                    <img src={process.env.NEXT_PUBLIC_NEXT_GRAPHQL_IMAGE_URL + blog?.coverImage?.url} alt='ArticlesImage' />
                  </div>
                  <div>
                    <h3>
                      {blog?.title}
                    </h3>
                    <p>
                      {blog?.shortDescription}
                    </p>
                    <div className={styles.allIconText}>
                      <div className={styles.iconText}>
                        <ProfileIcon />
                        <span>{blog?.author?.name}</span>
                      </div>
                      <div className={styles.iconText}>
                        <CalanderIcon />
                        <span>{blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'}) : ''}</span>
                      </div>
                    </div>
                    <Button text="Read More" fill onClick={() => router.push(`/blog-details/${blog.slug}`)} />
                  </div>
                </motion.div>
              ))
            }
          </motion.div>
        </div>
      </div>
      {/* <div className={styles.valorText}>
        <h3>Valor Academy</h3>
      </div> */}
    </>
  );
}
