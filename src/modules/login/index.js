import React from 'react'
import styles from './login.module.scss';
import Logo from '@/components/logo';
import Input from '@/components/input';
import Button from '@/components/button';
import Authentication from '@/components/authentication';
import Link from 'next/link';
const EyeIcon = '/assets/icons/eye.svg';
export default function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.box}>
        <div className={styles.logoCenter}>
          <Logo />
        </div>
        <div className={styles.title}>
          <h2>
            Welcome Back
          </h2>
          <p>
            Continue your journey into the world of financial mastery.
          </p>
        </div>
        <div className={styles.spacing}>
          <Input label='Email Address' placeholder='Email Address' />
        </div>
        <Input label='Password' placeholder='Enter your password' icon={EyeIcon} />
        <div className={styles.forgotPassword}>
          <Link href="/reset-password">Forgot password?</Link>
        </div>
        <div className={styles.btnwidth}>
          <Link href="/pre-recorded">
            <Button text="Sign In" fill />
          </Link>
        </div>
        <Authentication />
        <div className={styles.lastContent}>
          <p>
            Don’t have an account? <Link href="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
