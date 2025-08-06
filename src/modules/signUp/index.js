'use client'
import React, { useState } from 'react'
import styles from './signUp.module.scss';
import Logo from '@/components/logo';
import Input from '@/components/input';
import Authentication from '@/components/authentication';
import Button from '@/components/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/app/api/auth';
import { toast } from 'react-toastify';
const EyeIcon = '/assets/icons/eye.svg';
const EyeSlashIcon = '/assets/icons/eye-slash.svg';
export default function SignUp() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '', submit: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (value) => {
    if (!value) return "Name is required.";
    if (value.length < 2) return "Name must be at least 2 characters.";
    return "";
  };
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
  const validateConfirmPassword = (value, password) => {
    if (!value) return "Confirm Password is required.";
    if (value !== password) return "Passwords do not match.";
    return "";
  };

  const handleSignup = () => {
    const nameError = validateName(data.name);
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    const confirmPasswordError = validateConfirmPassword(data.confirmPassword, data.password);
    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      submit: ''
    };
    setErrors(newErrors);
    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }
    setIsSubmitting(true);
    signUp({ name: data.name, email: data.email, password: data.password })
      .then((response) => {
        setIsSubmitting(false);
        setErrors({ name: '', email: '', password: '', confirmPassword: '', submit: '' });
        toast.success('Signup successfully.');
        router.push('/login');
      })
      .catch((error) => {
        setIsSubmitting(false);
        setErrors((prev) => ({ ...prev, submit: error?.message || "Signup failed. Please try again." }));
      });
  };
  return (
    <div className={styles.signUp}>
      <div className={styles.box}>
        <div className={styles.logoCenter}>
          <Logo />
        </div>
        <div className={styles.title}>
          <h2>
            Create Your Free Account
          </h2>
          <p>
            Start learning from industry experts and grow your financial skills.
          </p>
        </div>
        <div className={styles.leftRightalignment}>
          <div className={styles.spacing}>
            <Input label='Full Name' placeholder='Enter your name' name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className={styles.spacing}>
            <Input label='Email Address' placeholder='Enter your email' name="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className={styles.spacing}>
            <Input type={showPassword ? "text" : "password"} label='Password' placeholder='Enter your password' name="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} icon={showPassword ? EyeSlashIcon : EyeIcon} onIconClick={() => setShowPassword(!showPassword)} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <Input type={showConfirmPassword ? "text" : "password"} label='Confirm Password' placeholder='Enter your confirm password' name="confirmPassword" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} icon={showConfirmPassword ? EyeSlashIcon : EyeIcon} onIconClick={() => setShowConfirmPassword(!showConfirmPassword)} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <div className={styles.btnwidth}>
            <Button text="Sign Up" fill onClick={handleSignup} />
          </div>
          <Authentication />
          <div className={styles.lastContent}>
            <p>
              Already have an account? <Link href="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
