'use client'
import React, { useEffect, useState } from 'react'
import styles from './header.module.scss';
import Logo from '../logo';
import UserIcon from '../icons/userIcon';
import MenuIcon from '../icons/menuIcon';
import classNames from 'classnames';
import CloseIcon from '../icons/closeIcon';
import Link from 'next/link';
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("noScroll");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "topToDown" : "downToTop";
      if (currentScrollTop === 0) {
        setScrollDirection("noScroll");
      } else if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);
  return scrollDirection;
}
export default function Header() {
  const scrollDirection = useScrollDirection();
  const [header, setHeader] = useState(false);
  return (
    <>
      <header
        className={classNames(
          styles.header,
          scrollDirection === 'downToTop'
            ? styles.show
            : scrollDirection === 'noScroll'
              ? null
              : styles.hide
        )}>
        <div className='container'>
          <div className={styles.headerDesign}>
            <Logo />
            <div className={styles.rightAlignmet}>
              <div className={styles.menu}>
                <a className={styles.active} href='/our-course' aria-label='Courses'>Courses</a>
                <a href='/live-online-classes' aria-label='asasa'>Live Online Classes</a>
                <a href='/offline-sessions' aria-label='Offline Sessions'>Offline Sessions</a>
                <a href='/algobots' aria-label='Algobots'>Algobots</a>
                <a href='/blog' aria-label='Blog'>Blogs</a>
                <a href='/about-us' aria-label='About Us'>About Us</a>
              </div>
              <Link href="/login">
                <div className={styles.profile}>
                  <UserIcon />
                </div>
              </Link>
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
          <a href='/our-course' className={styles.active} aria-label='Courses'>Courses</a>
          <a href='/live-online-classes' aria-label='Live Online Classes'>Live Online Classes</a>
          <a href='/offline-sessions' aria-label='Offline Sessions'>Offline Sessions</a>
          <a href='/algobots' aria-label='Algobots'>Algobots</a>
          <a href='/blog' aria-label='Blog'>Blogs</a>
          <a href='/about-us' aria-label='About Us'>About Us</a>
        </div>
      </div>
    </>
  )
}
