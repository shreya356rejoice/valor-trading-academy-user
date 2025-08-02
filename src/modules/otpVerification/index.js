import React from 'react'
import styles from './otpVerification.module.scss';
import Logo from '@/components/logo';
import Button from '@/components/button';
export default function OtpVerification() {
  return (
    <div className={styles.otpVerification}>
      <div className={styles.box}>
        <div className={styles.logoCenter}>
            <Logo/>
        </div>
        <div className={styles.title}>
            <h2>
               OTP Verification
            </h2>
            <p>
              Enter OTP Code sent to ju******78@gmail.com.
            </p>
        </div>
        <div className={styles.inputgroup}>
            <input type='number'/>
            <input type='number'/>
            <input type='number'/>
            <input type='number'/>
            <input type='number'/>
            <input type='number'/>
        </div>
        <div className={styles.resendCode}>
            <p>
                Don't receive OTP code?
            </p>
            <span>
                Resend Code
            </span>
        </div>
        <div className={styles.btnwidth}>
            <Button text="Continue" fill />
        </div>
      </div>
    </div>
  )
}
