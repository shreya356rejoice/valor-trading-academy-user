'use client'
import React from 'react'
import styles from './profileBanner.module.scss';
export default function ProfileBanner() {
    return (
        <div className={styles.algobotBanner}>
            <div>
                <h1>
                    Edit <span>Profile</span>
                </h1>
                <p>
                Update your personal information, contact details, and preferences to keep your profile up to date.
                </p>
            </div>
        </div>
    )
}

