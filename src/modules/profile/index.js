import React from 'react'
import styles from './profile.module.scss';
import ProfileBanner from './profileBanner';
import ProfileDetails from './profileDetails';
export default function Profile() {
    return (
        <div className={styles.algobotPage}>
            <ProfileBanner />
            <ProfileDetails />
        </div>
    )
}
