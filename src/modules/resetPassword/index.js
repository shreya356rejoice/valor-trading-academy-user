import React from 'react'
import styles from './resetPassword.module.scss';
import Button from '@/components/button';
import Input from '@/components/input';
import Authentication from '@/components/authentication';
import Logo from '@/components/logo';
export default function ResetPassword() {
  return (
   <div className={styles.resetPassword}>
      <div className={styles.box}>
        <div className={styles.logoCenter}>
            <Logo/>
        </div>
        <div className={styles.title}>
            <h2>
              Reset Your Password
            </h2>
            <p>
             We’ll send you an email to reset your password.
            </p>
        </div>
         <Input label='Email Address' placeholder='Email Address' />
         <div className={styles.btnwidth}>
            <Button text="Sign In" fill />
         </div>
         <div className={styles.lastContent}>
            <p>
                Don’t have an account? <a>Sign up</a>
            </p>
         </div>
      </div>
    </div>
  )
}
