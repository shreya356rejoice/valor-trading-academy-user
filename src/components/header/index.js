'use client'
import React, { useState } from 'react'
import styles from './header.module.scss';
import Logo from '../logo';
import UserIcon from '../icons/userIcon';
import MenuIcon from '../icons/menuIcon';
import classNames from 'classnames';
import CloseIcon from '../icons/closeIcon';
export default function Header() {
  const [header, setHeader] = useState(false);
  return (
    <><header className={styles.header}>
      <div className='container'>
        <div className={styles.headerDesign}>
          <Logo />
          <div className={styles.rightAlignmet}>
            <div className={styles.menu}>
              <a className={styles.active} aria-label='Courses'>Courses</a>
              <a aria-label='asasa'>Live Online Classes</a>
              <a aria-label='Offline Sessions'>Offline Sessions</a>
              <a aria-label='Community'>Community</a>
              <a aria-label='Resources'>Resources</a>
              <a aria-label='Blog'>Blog</a>
              <a aria-label='About Us'>About Us</a>
            </div>
            <div className={styles.profile}>
              <UserIcon />
            </div>
            <div className={classNames(styles.profile, styles.menuIcon)} onClick={() => setHeader(!header)}>
              <MenuIcon />
            </div>
          </div>
        </div>
      </div>
    </header>
      <div className={classNames(styles.mobileHeader, header ? styles.show : styles.hide)}>
        <div className={styles.logoCloseIcon}>
          <Logo />
          <div onClick={() => setHeader(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.menu}>
          <a className={styles.active} aria-label='Courses'>Courses</a>
          <a aria-label='asasa'>Live Online Classes</a>
          <a aria-label='Offline Sessions'>Offline Sessions</a>
          <a aria-label='Community'>Community</a>
          <a aria-label='Resources'>Resources</a>
          <a aria-label='Blog'>Blog</a>
          <a aria-label='About Us'>About Us</a>
        </div>
      </div>
    </>
  )
}
