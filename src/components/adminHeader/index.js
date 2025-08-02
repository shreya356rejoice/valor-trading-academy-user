import React from 'react'
import styles from './adminHeader.module.scss';
import Logo from '../logo';
import MenuIcon from '../icons/menuIcon';
export default function AdminHeader() {
  return (
    <div className={styles.adminHeader}>
        <div className={styles.headerAlignment}>
            <Logo/>
            <div className={styles.menuIcon}>
                <MenuIcon/>
            </div>
        </div>
    </div>
  )
}

