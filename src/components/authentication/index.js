import React from 'react'
import styles from './authentication.module.scss';
const GoogleIcon = '/assets/icons/google-icon.svg';
const FacebookIcon = '/assets/icons/fb.svg';
const LinkdinIcon = '/assets/icons/linkdin.svg';
export default function Authentication() {
  return (
    <div className={styles.authentication}>
      <div className={styles.box}>
        <img src={GoogleIcon} alt='GoogleIcon'/>
      </div>
      <div className={styles.box}>
        <img src={FacebookIcon} alt='FacebookIcon'/>
      </div>
      <div className={styles.box}>
        <img src={LinkdinIcon} alt='LinkdinIcon'/>
      </div>
    </div>
  )
}
