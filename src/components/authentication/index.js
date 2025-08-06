'use client'
import React from 'react'
import styles from './authentication.module.scss';
import { loginWithGoogle } from '@/app/api/auth';
import { toast } from 'react-toastify';
import { setCookie } from '../../../cookie';
import { useRouter } from 'next/navigation';
const GoogleIcon = '/assets/icons/google-icon.svg';
const FacebookIcon = '/assets/icons/fb.svg';
const LinkdinIcon = '/assets/icons/linkdin.svg';
export default function Authentication() {
  const router = useRouter();
  const googleLogin =async () => {
    try{
    const data = await loginWithGoogle();
    if (data.success) {
      toast.success('Login successfully.');
      setCookie("userToken", data.payload.token);
      setCookie("user", data.payload);
      router.push("/pre-recorded");
    } else {
      toast.error(errorMessages[data?.message] ?? "Login failed. Please try again.");
    }
    }catch(error){
      console.log(error);
    }

  }
  return (
    <div className={styles.authentication}>
      <div className={styles.box} onClick={() => googleLogin()}>
        <img src={GoogleIcon} alt='GoogleIcon' />
      </div>
      <div className={styles.box}>
        <img src={FacebookIcon} alt='FacebookIcon' />
      </div>
      <div className={styles.box}>
        <img src={LinkdinIcon} alt='LinkdinIcon' />
      </div>
    </div>
  )
}
