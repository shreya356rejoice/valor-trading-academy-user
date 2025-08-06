'use client'
import React, { useEffect, useState } from 'react'
import styles from './course.module.scss';
import CourseBanner from './courseBanner';
import Recentcourse from './recentcourse';
import { getCookie } from '../../../cookie';
export default function Course() {
  const [searchQuery,setSearchQuery]=useState('');
  const [courses,setCourses]=useState([]);
  const [user,setUser]=useState(null);
  useEffect(()=>{
      const user=getCookie("user");
      if(user){
        const userName = user && JSON.parse(user)?.name;
        setUser(userName);
      }
  },[])
  return (
    <div className={styles.coursePageAlignment}>
      <div className={styles.pageTitle}>
        <h2>
          <span>Hello {user},</span> welcome!
        </h2>
        <p>
          Your monetisation journey on TagMango starts here!
        </p>
      </div>
      <CourseBanner searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Recentcourse searchQuery={searchQuery} courses={courses} setCourses={setCourses}/>
    </div>
  )
}
