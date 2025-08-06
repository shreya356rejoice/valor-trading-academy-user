'use client'
import React, { useEffect, useState } from 'react'
import styles from './otpVerification.module.scss';
import Logo from '@/components/logo';
import Button from '@/components/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { verifyOtp } from '@/app/api/auth';
export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  useEffect(() => {
      // Get email from URL state when component mounts
      const emailFromState = localStorage.getItem('email');
      if (emailFromState) {
          setEmail(emailFromState);
      }
  }, []);
  
  const handleChange = (e, index) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
          if (value && index < otp.length - 1) {
              document.getElementById(`otp-${index + 1}`).focus();
          }
      }
  };

  const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          document.getElementById(`otp-${index - 1}`).focus();
      }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

      setError(null);
      setIsVerifying(true);
      
      try {
          const data = await verifyOtp({ otp: otpString, email });
          if (data && data.success) {
              router.push('/new-password');
          } else {
              setError(data?.message || 'Invalid OTP. Please try again.');
          }
      } catch (error) {
          console.error('OTP verification failed:', error);
          setError(error.message || 'Failed to verify OTP. Please try again.');
      } finally {
          setIsVerifying(false);
      }
  };

  const handleResendOtp = () => {
      setIsResending(true);
      setError(null);
      
      forgetPassword({ email })
          .then((data) => {
          })
          .catch((error) => {
              console.error('Password reset error:', error);
              setError('Failed to resend OTP. Please try again.');
          })
          .finally(() => {
              setIsResending(false);
          });
  };

  const maskedEmail = email ? `${email.substring(0, 2)}${'*'.repeat(5)}${email.substring(email.indexOf('@') - 1)}` : 'your email';

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
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type='number'
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className={styles.otpInput}
                />
            ))}
        </div>
            {error && <span className="error">{error}</span>}
        <div className={styles.resendCode}>
            <p>
                Don't receive OTP code?
            </p>
            <span onClick={handleResendOtp}>
                Resend Code
            </span>
        </div>
        <div className={styles.btnwidth}>       
            <Button text="Continue" fill onClick={handleVerifyOtp}/>
        </div>
      </div>
    </div>
  )
}
