'use client'
import React from 'react'
import styles from './courseDetailsTab.module.scss';

export default function CourseDetailsTab({ 
  chapters, 
  selectedChapter, 
  onChapterSelect 
}) {
  return (
    <div className={styles.courseDetailsTab}>
      {chapters.map((chapter) => (
        console.log("chapter=====" , chapter),
        
        <button 
          key={chapter._id}
          aria-label={`Chapter ${chapter.chapterNo}`}
          className={selectedChapter?._id === chapter._id ? styles.active : ''}
          onClick={() => onChapterSelect(chapter)}
        >
          Chapter {chapter.chapterNo}
        </button>
      ))}
    </div>
  )
}