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
const SidebarLogo = '/assets/logo/sidebar-logo.svg';
const DashboardIcon = '/assets/icons/dashboaard.svg';
const CourseIcon = '/assets/icons/Course.svg';
const ContactIcon = '/assets/icons/contact.svg';
const DashboardIconActive = '/assets/icons/dashboard-active.svg';
const CourseIconActive = '/assets/icons/CourseIcon-active.svg';
const ContactIconActive = '/assets/icons/contact-active.svg';
export default function Sidebar() {
    const [dropdown, setDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoAlignment}>
                <img src={SidebarLogo} alt="SidebarLogo" />
            </div>
            <div className={styles.allMenuAlignment}>
                <div className={styles.menu}>
                    <div className={styles.iconAlignment}>
                        <img src={DashboardIcon} alt="DashboardIcon" />
                        <img src={DashboardIconActive} alt="DashboardIconActive" />
                    </div>
                    <span>Dashboards</span>
                </div>
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
                <div className={classNames(styles.dropodow, dropdown ? styles.show : styles.hide)}>
                    <div className={styles.dropodowAlignment}>
                        <div className={styles.iconText}>
                            <VideoIcon />
                            <span>Pre-Recorded</span>
                        </div>
                        <div className={styles.iconText}>
                            <LiveIcon />
                            <span>Live Online</span>
                        </div>
                        <div className={styles.iconText}>
                            <PersonIcon />
                            <span>In-Person</span>
                        </div>
                    </div>
                </div>
                <div className={styles.menu}>
                    <div className={styles.iconAlignment}>
                        <img src={ContactIcon} alt="ContactIcon" />
                        <img src={ContactIconActive} alt="ContactIconActive" />
                    </div>
                    <span>Contact Us</span>
                </div>

            </div>
            <div className={styles.sidbarFooter}>
                <div className={styles.mainRelative}>
                    <button className={ classNames(profileDropdown ? styles.rotateIcon : "") } onClick={()=> setProfileDropdown(!profileDropdown)}>
                        Ahmad Khan
                        <SidebarArrow />
                    </button>
                    <div className={ classNames(styles.dropdownProfile , profileDropdown ? styles.show : styles.hide) }>
                        <div className={styles.dropodowAlignment}>
                            <div className={styles.iconText}>
                                <ProfileIconSm />
                                <span>Profile</span>
                            </div>
                            <div className={styles.iconText}>
                                <SettingIcon />
                                <span>Settings</span>
                            </div>
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
