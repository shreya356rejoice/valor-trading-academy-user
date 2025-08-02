'use client'
import React, { useState } from 'react'
import styles from './sidebar.module.scss';
import SidebarArrow from '../icons/sidebarArrow';
import VideoIcon from '../icons/videoIcon';
import LiveIcon from '../icons/liveIcon';
import PersonIcon from '../icons/personIcon';
import classNames from 'classnames';
import ProfileIconSm from '../icons/ProfileIconSm';
import SettingIcon from '../icons/settingIcon';
import LogoutIcon from '../icons/logoutIcon';
import CloseIcon from '../icons/closeIcon';
import Link from 'next/link';
const SidebarLogo = '/assets/logo/sidebar-logo.svg';
const DashboardIcon = '/assets/icons/dashboaard.svg';
const CourseIcon = '/assets/icons/Course.svg';
const ContactIcon = '/assets/icons/contact.svg';
const DashboardIconActive = '/assets/icons/dashboard-active.svg';
const CourseIconActive = '/assets/icons/CourseIcon-active.svg';
const ContactIconActive = '/assets/icons/contact-active.svg';
export default function Sidebar({setSidebarToogle , sidebarToogle}) {
    const [dropdown, setDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoAlignment}>
                <img src={SidebarLogo} alt="SidebarLogo" />
                <div className={styles.closeIcon} onClick={()=> setSidebarToogle(false)}>
                    <CloseIcon/>
                </div>
            </div>
            <div className={styles.allMenuAlignment}>
                <Link href="/dashboard">
                <div className={styles.menu}>
                    <div className={styles.iconAlignment}>
                        <img src={DashboardIcon} alt="DashboardIcon" />
                        <img src={DashboardIconActive} alt="DashboardIconActive" />
                    </div>
                    <span>Dashboards</span>
                </div>
                </Link>
                <Link href="/course">
                <div className={classNames(styles.menu, styles.activeMenu)}>
                    <div className={styles.iconAlignment}>
                        <img src={CourseIcon} alt="CourseIcon" />
                        <img src={CourseIconActive} alt="CourseIconActive" />
                    </div>
                    <div className={styles.textIconAlignment}>
                        <span>Course</span>
                        <div className={classNames(styles.icons, dropdown ? styles.rotate : "")} onClick={() => setDropdown(!dropdown)}>
                            <SidebarArrow />
                        </div>
                    </div>
                </div>
                </Link>
                <div className={classNames(styles.dropodow, dropdown ? styles.show : styles.hide)}>
                    <div className={styles.dropodowAlignment}>
                        <Link href="/pre-recorded">
                        <div className={styles.iconText}>
                            <VideoIcon />
                            <span>Pre-Recorded</span>
                        </div>
                        </Link>
                        <Link href="/live-online">
                        <div className={styles.iconText}>
                            <LiveIcon />
                            <span>Live Online</span>
                        </div>
                        </Link>
                        <Link href="/in-person">
                        <div className={styles.iconText}>
                            <PersonIcon />
                            <span>In-Person</span>
                        </div>
                        </Link>
                    </div>
                </div>
                <Link href="/contact-us">
                <div className={styles.menu}>
                    <div className={styles.iconAlignment}>
                        <img src={ContactIcon} alt="ContactIcon" />
                        <img src={ContactIconActive} alt="ContactIconActive" />
                    </div>
                    <span>Contact Us</span>
                </div>
                </Link>

            </div>
            <div className={styles.sidbarFooter}>
                <div className={styles.mainRelative}>
                    <button className={ classNames(profileDropdown ? styles.rotateIcon : "") } onClick={()=> setProfileDropdown(!profileDropdown)}>
                        Ahmad Khan
                        <SidebarArrow />
                    </button>
                    <div className={ classNames(styles.dropdownProfile , profileDropdown ? styles.show : styles.hide) }>
                        <div className={styles.dropodowAlignment}>
                            <Link href="/profile">
                            <div className={styles.iconText}>
                                <ProfileIconSm />
                                <span>Profile</span>
                            </div>
                            </Link>
                            <Link href="/settings">
                            <div className={styles.iconText}>
                                <SettingIcon />
                                <span>Settings</span>
                            </div>
                            </Link>
                            <div className={styles.iconText}>
                                <LogoutIcon />
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
