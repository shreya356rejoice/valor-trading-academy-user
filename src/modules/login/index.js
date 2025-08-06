'use client'
import React, { useState } from 'react'
import styles from './login.module.scss';
import Logo from '@/components/logo';
import Input from '@/components/input';
import Button from '@/components/button';
import Authentication from '@/components/authentication';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie } from '../../../cookie';
import { signIn } from '@/app/api/auth';
const EyeIcon = '/assets/icons/eye.svg';
const EyeSlashIcon = '/assets/icons/eye-slash.svg';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", submit: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();


  const validateEmail = (value) => {
    if (!value) return "Email is required.";
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(value)) return "Enter a valid email address.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        submit: ""
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await signIn(email, password);
      if (data.success) {
        toast.success('Login successfully.');
        setCookie("userToken", data.payload.token);
        setCookie("user", data.payload);
        router.push("/courses/pre-recorded");
      } else {
        toast.error(errorMessages[data?.message] ?? "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
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
          <Input label='Email Address' placeholder='Email Address' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <Input type={showPassword ? "text" : "password"} label='Password' placeholder='Enter your password' icon={showPassword ? EyeSlashIcon : EyeIcon} name="password" value={password} onIconClick={() => setShowPassword(!showPassword)} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="error">{errors.password}</p>}
        <div className={styles.forgotPassword}>
          <Link href="/reset-password">Forgot password?</Link>
        </div>
        <div className={styles.btnwidth}>
          <Button text="Sign In" fill onClick={handleLogin} />
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
