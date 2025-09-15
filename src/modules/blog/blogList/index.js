'use client'
import React, { useEffect, useState } from 'react'
import styles from './blogList.module.scss';
import SearchIcon from '@/components/icons/searchIcon';
import { useInView } from 'react-intersection-observer';
import ProfileIcon from '@/components/icons/profileIcon';
import CalanderIcon from '@/components/icons/calanderIcon';
import Button from '@/components/button';
import { motion } from 'framer-motion';
import { GET_ALL_BLOG_DATA, GET_BLOG_CATEGORIES } from '@/graphql/getBlogData';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
const ArticlesImage = '/assets/images/articles.png';


const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};


const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export default function BlogList() {

    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});
    const router = useRouter();

    useEffect(() => {
        const newFilters = {};
        
        if (searchQuery && searchQuery.trim() !== '') {
            newFilters.title = { contains: searchQuery };
        }
        
        if (selectedCategory !== 'all') {
            newFilters.categories = {
                slug: { eq: selectedCategory }
            };
        }
        
        setFilters(newFilters);
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const { data: blogData, loading, error } = useQuery(GET_ALL_BLOG_DATA, {
        variables: {
            pagination: {
                pageSize: itemsPerPage,
                page: currentPage
            },
            filters: filters
        },
        fetchPolicy: 'cache-and-network'
    });

    const { data: categoriesData } = useQuery(GET_BLOG_CATEGORIES);

    const handleCategorySelect = (slug) => {
        setSelectedCategory(slug);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const categories = categoriesData?.categories || [];
    // const blogs = blogData?.blogs_connection?.nodes || [];
    const totalItems = blogData?.blogs_connection?.pageInfo?.total|| 0;

    useEffect(() => {
        if (blogData) {
          setBlogs(blogData?.blogs_connection?.nodes);
        }
      }, [blogData]);

    return (
        <>
            <div className={styles.blogListAlignment}>
                <div className='container'>
                    <div className={styles.blogHeaderAlignment}>
                            <div className={styles.searchbar}>
                                <input 
                                    type='text' 
                                    placeholder='Search for blogs...' 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className={styles.iconAlignment}>
                                    <SearchIcon />
                                </div>
                            </div>
                        <div className={styles.tab}>
                        <button className={selectedCategory === 'all' ? styles.active : ''} onClick={() => handleCategorySelect('all')}>All</button>
                            {categories?.map((category, i) => (
                                <button className={selectedCategory === category.slug ? styles.active : ''} onClick={() => handleCategorySelect(category.slug)} key={i}>{category?.name}</button>
                            ))}
                        </div>
                    </div>
                    <div
                        className={styles.grid}

                    >
                        {
                            blogs.map((blog, i) => (
                                <div className={styles.griditems} key={i}>
                                    <div className={styles.image}>
                                        <img src={ArticlesImage} alt='ArticlesImage' />
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
                                        <Button text="Read More" onClick={() => router.push(`/blog-details/${blog.slug}`)} fill />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles.valorText}>
                <h3>Valor Academy</h3>
            </div>
        </>
    )
}
