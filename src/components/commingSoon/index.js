import React from 'react'
import styles from './commingSoon.module.scss';
const CommingSoonImage = '/assets/images/coming-soon.png';
export default function CommingSoon() {
  return (
    <div className={styles.commingSoon}>
      <div className={styles.centerImage}>
        <img src={CommingSoonImage} alt="CommingSoonImage"/>
      </div>
    </div>
  )
}
