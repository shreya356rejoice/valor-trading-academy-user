'use client'
import React, { useEffect, useState, useRef } from 'react'
import styles from './header.module.scss';
import Logo from '../logo';
import UserIcon from '../icons/userIcon';
import MenuIcon from '../icons/menuIcon';
import classNames from 'classnames';
import CloseIcon from '../icons/closeIcon';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCookie, removeCookie } from '../../../cookie';
import { toast } from 'react-toastify';
import ProfileIconSm from '../icons/ProfileIconSm';
import LogoutIcon from '../icons/logoutIcon';

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
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = getCookie('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    removeCookie('user');
    removeCookie('userToken');
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
  };
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
                <a className={pathname === '/our-course' ? styles.active : ''} href='/our-course' aria-label='Courses'>Courses</a>
                <a className={pathname === '/live-online-classes' ? styles.active : ''} href='/live-online-classes' aria-label='Live Online Classes'>Live Online Classes</a>
                <a className={pathname === '/offline-sessions' ? styles.active : ''} href='/offline-sessions' aria-label='Offline Sessions'>Offline Sessions</a>
                <a 
                  className={pathname === '/algobots' && searchParams.get('category') === 'Arbitrage Algo' ? styles.active : ''} 
                  href='/algobots?category=Arbitrage Algo' 
                >
                  Algobots
                </a>
                <a 
                  className={pathname === '/algobots' && searchParams.get('category') === 'Trading Tools' ? styles.active : ''} 
                  href='/algobots?category=Trading Tools' 
                >
                  Trading Tools
                </a>
                <a className={pathname === '/blog' ? styles.active : ''} href='/blog' aria-label='Blog'>Blogs</a>
                <a className={pathname === '/about-us' ? styles.active : ''} href='/about-us' aria-label='About Us'>About Us</a>
              </div>
              {user ? (
                <div className={styles.profileDropdown} ref={dropdownRef}>
                  <div 
                    className={styles.profile} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(!showDropdown);
                    }}
                  >
                    <UserIcon />
                  </div>
                  <div className={`${styles.dropdownMenu} ${showDropdown ? styles.show : ''}`}>
                      <Link 
                        href="/user-profile" 
                        className={styles.dropdownItem}
                        onClick={() => setShowDropdown(false)}
                      >
                        <ProfileIconSm />
                        Profile
                      </Link>
                      <button 
                        className={styles.dropdownItem}
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                      >
                        <LogoutIcon />
                        Logout
                      </button>
                    </div>
                </div>
              ) : (
                <Link href="/login">
                  <div className={styles.profile}>
                    <UserIcon />
                  </div>
                </Link>
              )}
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
          <a href='/our-course' className={pathname === '/our-course' ? styles.active : ''} aria-label='Courses'>Courses</a>
          <a href='/live-online-classes' className={pathname === '/live-online-classes' ? styles.active : ''} aria-label='Live Online Classes'>Live Online Classes</a>
          <a href='/offline-sessions' className={pathname === '/offline-sessions' ? styles.active : ''} aria-label='Offline Sessions'>Offline Sessions</a>
          <a href='/algobots' className={pathname === '/algobots' ? styles.active : ''} aria-label='Algobots'>Algobots</a>
          <a href='/blog' className={pathname === '/blog' ? styles.active : ''} aria-label='Blog'>Blogs</a>
          <a href='/about-us' className={pathname === '/about-us' ? styles.active : ''} aria-label='About Us'>About Us</a>
        </div>
      </div>
    </>
  )
}
