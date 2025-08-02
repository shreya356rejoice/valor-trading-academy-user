'use client'
import React , {useState} from 'react'
import styles from './adminHeader.module.scss';
import Logo from '../logo';
import MenuIcon from '../icons/menuIcon';
import Sidebar from '../sidebar';
import classNames from 'classnames';
export default function AdminHeader() {
  const [ sidebarToogle , setSidebarToogle ] = useState(false);
  return (
    <>
    <div className={styles.adminHeader}>
        <div className={styles.headerAlignment}>
            <Logo/>
            <div className={styles.menuIcon} onClick={()=> setSidebarToogle(!sidebarToogle)}>
                <MenuIcon/>
            </div>
        </div>
    </div>
    <div className={ classNames(styles.mobileViewSidebar , sidebarToogle ? styles.show : styles.hide) }>
      <Sidebar setSidebarToogle={setSidebarToogle} sidebarToogle={sidebarToogle} />
    </div>
</>
  )
}

