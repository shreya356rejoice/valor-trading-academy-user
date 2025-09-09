'use client'
import React, { useEffect, useState } from 'react'
import styles from './otpVerification.module.scss';
import Logo from '@/components/logo';
import Button from '@/components/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { forgetPassword, verifyOtp } from '@/app/api/auth';
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

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim();
        if (/^\d+$/.test(pasteData)) {
            const digits = pasteData.split("").slice(0, otp.length);
            const newOtp = [...otp];
            digits.forEach((digit, i) => {
                newOtp[i] = digit;
            });
            setOtp(newOtp);
            // Focus last filled box
            const nextIndex =
                digits.length < otp.length ? digits.length : otp.length - 1;
            document.getElementById(`otp-${nextIndex}`).focus();
        }
    };

    return (
        <div className={styles.otpVerification}>
            <div className={styles.box}>
                <div className={styles.logoCenter}>
                    <Logo />
                </div>
                <div className={styles.title}>
                    <h2>
                        OTP Verification
                    </h2>
                    <p>
                        Enter OTP Code sent to ju******78@gmail.com.
                    </p>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!isVerifying) handleVerifyOtp();
                    }}
                ></form>
                <div className={styles.inputgroup}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            id={`otp-${index}`}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
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
                    <span onClick={!isResending ? handleResendOtp : undefined}>
                        {isResending ? "Sending..." : "Resend Code"}
                    </span>
                </div>
                <div className={styles.btnwidth}>
                    <Button
                        type="submit"
                        text={isVerifying ? "Verifying..." : "Continue"}
                        fill
                        disabled={isVerifying}
                        onClick={!isVerifying ? handleVerifyOtp : undefined} />
                </div>
            </div>
        </div>
    )
}
