"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./sidebar.module.scss";
import SidebarArrow from "../icons/sidebarArrow";
import VideoIcon from "../icons/videoIcon";
import LiveIcon from "../icons/liveIcon";
import PersonIcon from "../icons/personIcon";
import classNames from "classnames";
import ProfileIconSm from "../icons/ProfileIconSm";
import SettingIcon from "../icons/settingIcon";
import LogoutIcon from "../icons/logoutIcon";
import CloseIcon from "../icons/closeIcon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, removeCookie } from "../../../cookie";
const SidebarLogo = "/assets/logo/sidebar-logo.svg";
const DashboardIcon = "/assets/icons/dashboaard.svg";
const CourseIcon = "/assets/icons/Course.svg";
const AlgobotIcon = "/assets/icons/algobot.svg";
const AlgobotIconWhite = "/assets/icons/algobot-icon.svg";
const ContactIcon = "/assets/icons/contact.svg";
const DashboardIconActive = "/assets/icons/dashboard-active.svg";
const CourseIconActive = "/assets/icons/CourseIcon-active.svg";
const MyCoursesIcon = "/assets/icons/my-course-icon.svg";
const MyCoursesIconActive = "/assets/icons/my-courses-active.svg";
const PaymentIcon = "/assets/icons/payment-icon.svg";
const PaymentIconActive = "/assets/icons/payment-active.svg";
const TelegramIcon = "/assets/icons/telegram-icon-w.svg";
const TelegramIconActive = "/assets/icons/telegram-icon.svg";
const ContactIconActive = "/assets/icons/contact-active.svg";
export default function Sidebar({ setSidebarToogle, sidebarToogle }) {
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState(true);
  const router = useRouter();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [user, setUser] = useState("");
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const handleCommonDropdownChange = () => {
    removeCookie("userToken");
    removeCookie("user");
    setProfileDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    removeCookie("userToken");
    router.push("/signin");
  };
  useEffect(() => {
    const user = getCookie("user");
    const userName = user && JSON.parse(user)?.name;
    setUser(userName);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoAlignment}>
        <Link href="/">
          <img src={SidebarLogo} alt="SidebarLogo" />
        </Link>
        <div className={styles.closeIcon} onClick={() => setSidebarToogle(false)}>
          <CloseIcon />
        </div>
      </div>
      <div className={styles.allMenuAlignment}>
        <Link href="/dashboard">
          <div className={classNames(styles.menu, pathname === "/dashboard" ? styles.activeMenu : " ")}>
            <div className={styles.iconAlignment}>
              <img src={DashboardIcon} alt="DashboardIcon" />
              <img src={DashboardIconActive} alt="DashboardIconActive" />
            </div>
            <span>Dashboard</span>
          </div>
        </Link>
        <Link href="/courses/pre-recorded">
          <div className={classNames(styles.menu, pathname.includes("/courses") ? styles.activeMenu : "")} ref={menuRef} onClick={() => setDropdown((prev) => !prev)}>
            <div className={styles.iconAlignment}>
              <img src={CourseIcon} alt="CourseIcon" />
              <img src={CourseIconActive} alt="CourseIconActive" />
            </div>
            <div className={styles.textIconAlignment}>
              <span>Course</span>
              {/* <div className={classNames(styles.icons, dropdown ? styles.rotate : "")}>
                            <SidebarArrow />
                        </div> */}
            </div>
          </div>
        </Link>
        {/* <div 
                    className={classNames(styles.dropodow, dropdown ? styles.show : styles.hide)}
                    ref={dropdownRef}
                >
                    <div className={styles.dropodowAlignment}>
                        <Link href="/courses/pre-recorded">
                            <div className={classNames(styles.iconText, pathname === "/courses/pre-recorded" ? styles.iconTextActive : "")}>
                                <VideoIcon />
                                <span>Pre-Recorded</span>
                            </div>
                        </Link>
                        <Link href="/courses/live-online">
                            <div className={classNames(styles.iconText, pathname === "/courses/live-online" ? styles.iconTextActive : "")}>
                                <LiveIcon />
                                <span>Live Online</span>
                            </div>
                        </Link>
                        <Link href="/courses/in-person">
                            <div className={classNames(styles.iconText, pathname === "/courses/in-person" ? styles.iconTextActive : "")}>
                                <PersonIcon />
                                <span>In-Person</span>
                            </div>
                        </Link>
                    </div>
                </div> */}
        <Link href="/algobot">
          <div className={classNames(styles.menu, pathname === "/algobot" ? styles.activeMenu : " ")}>
            <div className={styles.iconAlignment}>
              <img src={AlgobotIconWhite} alt="AlgobotIcon" />
              <img src={AlgobotIcon} alt="AlgobotIconActive" />
            </div>
            <span>AlgoBots</span>
          </div>
        </Link>
        <Link href="/telegram">
          <div className={classNames(styles.menu, pathname === "/telegram" ? styles.activeMenu : " ")}>
            <div className={styles.iconAlignment}>
              <img src={TelegramIcon} alt="TelegramIcon" />
              <img src={TelegramIconActive} alt="TelegramIconActive" />
            </div>
            <span>Telegram Channels</span>
          </div>
        </Link>
        <Link href="/my-courses">
          <div className={classNames(styles.menu, pathname === "/my-courses" ? styles.activeMenu : " ")}>
            <div className={styles.iconAlignment}>
              <img src={MyCoursesIcon} alt="MyCoursesIcon" />
              <img src={MyCoursesIconActive} alt="MyCoursesIconActive" />
            </div>
            <span>My Courses</span>
          </div>
        </Link>
        <Link href="/payment">
          <div className={classNames(styles.menu, pathname === "/payment" ? styles.activeMenu : " ")}>
            <div className={styles.iconAlignment}>
              <img src={PaymentIcon} alt="PaymentHistoryIcon" />
              <img src={PaymentIconActive} alt="PaymentHistoryIconActive" />
            </div>
            <span>Payment History</span>
          </div>
        </Link>
        <Link href="/contact-us">
          <div className={classNames(styles.menu, pathname === "/contact-us" ? styles.activeMenu : " ")}>
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
          <button className={classNames(profileDropdown ? styles.rotateIcon : "")} onClick={() => setProfileDropdown(!profileDropdown)}>
            {user}
            <SidebarArrow />
          </button>
          <div className={classNames(styles.dropdownProfile, profileDropdown ? styles.show : styles.hide)}>
            <div className={styles.dropodowAlignment}>
              {/* <Link href="/profile" onClick={handleCommonDropdownChange}>
                                <div className={classNames(styles.iconText, pathname === "/profile" ? styles.iconTextActive : "")}>
                                    <ProfileIconSm />
                                    <span>Profile</span>
                                </div>
                            </Link>
                            <Link href="/settings" onClick={handleCommonDropdownChange}>
                                <div className={classNames(styles.iconText, pathname === "/settings" ? styles.iconTextActive : "")}>
                                    <SettingIcon />
                                    <span>Settings</span>
                                </div>
                            </Link> */}
              <Link href="/" onClick={handleLogout}>
                <div className={styles.iconText} onClick={handleCommonDropdownChange}>
                  <LogoutIcon />
                  <span>Logout</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
