'use client'
import React, { useState } from 'react'
import styles from './resetPassword.module.scss';
import Button from '@/components/button';
import Input from '@/components/input';
import Authentication from '@/components/authentication';
import Logo from '@/components/logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { forgetPassword } from '@/app/api/auth';
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleReset = () => {
      if (!email) {
          setError('Please enter your email address');
          return;
      }

      setIsLoading(true);
      setError(null);

      forgetPassword({ email })
          .then((data) => {
            if(data.success){
                localStorage.setItem('email', email);
                router.push('/otp-verification');
              }
              else{
                setError(data.message);
              }
          })
          .catch((error) => {
              console.error('Password reset error:', error);
              setError(error.message || 'Failed to send reset email. Please try again.');
          })
          .finally(() => {
              setIsLoading(false);
          });
  };
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
         <Input label='Email Address' placeholder='Email Address' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
         {error && <span className="error">{error}</span>}
         <div className={styles.btnwidth}>
          <Button text="Send Otp" fill onClick={handleReset} />
         </div>
         <div className={styles.lastContent}>
            <p>
                Don’t have an account? <Link href="/sign-up">Sign up</Link>
            </p>
         </div>
      </div>
    </div>
  )
}
