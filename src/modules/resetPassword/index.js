'use client'
import React, { useState } from 'react'
import styles from './resetPassword.module.scss';
import Button from '@/components/button';
import Input from '@/components/input';
import Logo from '@/components/logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { forgetPassword } from '@/app/api/auth';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();


  const handleReset = () => {
    let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!regex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    forgetPassword({ email })
      .then((data) => {
        if (data.success) {
          localStorage.setItem('email', email);
          toast.success('OTP sent successfully.');
          router.push('/otp-verification');
        }
        else {
          toast.error(errorMessages[data.message] || 'Failed to send reset email. Please try again.');
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
          <Logo />
        </div>
        <div className={styles.title}>
          <h2>
            Reset Your Password
          </h2>
          <p>
            We’ll send you an email to reset your password.
          </p>
        </div>
        <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading) handleReset();
        }}
      >
        <Input
          name="email"
          type="email"
          label='Email Address'
          placeholder='Enter your email'
          value={email}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          disabled={isLoading}
        />
        {error && <span className="error">{error}</span>}
        <div className={styles.btnwidth}>
          <Button text={isLoading ? 'Sending...' : 'Continue'}
          fill
            disabled={isLoading}
            showLoader={isLoading}
            onClick={handleReset} />
        </div>
        </form>
        <div className={styles.lastContent}>
          <p>
            Don’t have an account? <Link href="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
