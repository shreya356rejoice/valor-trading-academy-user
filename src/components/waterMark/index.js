'use client'
import React, { useEffect, useState } from 'react'
import styles from "./waterMark.module.scss"
import Marquee from 'react-fast-marquee'
import { getCookie } from '../../../cookie'
import Logo from '../logo'

export default function Watermark() {
    const [user , setUser] = useState({});
    useEffect(() => {
        const userData = getCookie('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);
    return (
        <>
            <div className={styles.watermarkmain}>
                <div className={styles.watermarkmarqueemain}>
                    <Marquee direction="right">
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.watermarkflx}>
                            <Logo />
                            <p>{user.email}</p>
                        </div>
                    </Marquee>
                </div>
            </div>
        </>
    )
}