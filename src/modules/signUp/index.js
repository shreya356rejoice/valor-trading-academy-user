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
    const nameRegex = /^[A-Za-z\s'-]{2,}$/;
    if (!nameRegex.test(value)) {
      return "Name must be at least 2 characters and contain only letters.";
    }
    return "";
  };

  // Email: RFC-like but practical for web use
  const validateEmail = (value) => {
    if (!value) return "Email is required.";
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(value)) return "Enter a valid email address.";
    return "";
  };

  // Password: Min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
  const validatePassword = (value) => {
    if (!value) return "Password is required.";
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(value)) {
      return "Password must be at least 6 characters, include uppercase, lowercase, number, and special character.Example: Hello@123";
    }
    return "";
  };

  // Confirm Password: Match with password
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
        if (response.success) {
          setIsSubmitting(false);
          toast.success('User Signup successfully.');
          setErrors({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            submit: "",
          });
          router.push("/login");
        }
        else {
          setIsSubmitting(false);
          toast.error(errorMessages[response?.message] ?? "User Signup failed. Please try again.");
        }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isSubmitting) handleSignup();
          }}
        >
          <div className={styles.leftRightalignment}>
            <div className={styles.spacing}>
              <Input
                label='Full Name'
                placeholder='Enter your name'
                name="name"
                value={data.name}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value.trim() });
                  setErrors((prev) => ({
                    ...prev,
                    name: validateName(e.target.value),
                  }));
                }} />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className={styles.spacing}>
              <Input
                label='Email Address'
                placeholder='Enter your email'
                name="email"
                value={data.email}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value.trim() });
                  setErrors((prev) => ({
                    ...prev,
                    email: validateEmail(e.target.value),
                  }));
                }} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className={styles.spacing}>
              <Input
                type={showPassword ? "text" : "password"}
                label='Password'
                placeholder='Enter your password'
                name="password"
                value={data.password}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value.trim() });
                  setErrors((prev) => ({
                    ...prev,
                    password: validatePassword(e.target.value),
                  }));
                }}
                icon={showPassword ? EyeSlashIcon : EyeIcon}
                onIconClick={() => setShowPassword(!showPassword)} />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <Input
              type={showConfirmPassword ? "text" : "password"}
              label='Confirm Password'
              placeholder='Enter your confirm password'
              name="confirmPassword"
              value={data.confirmPassword}
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                setData({ ...data, confirmPassword: e.target.value.trim() });
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: validateConfirmPassword(e.target.value, data.password),
                }));
              }}
              icon={showConfirmPassword ? EyeSlashIcon : EyeIcon}
              onIconClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <div className={styles.btnwidth}>
              <Button
                type="submit"
                text={isSubmitting ? "Signing up..." : "Sign Up"}
                fill
                disabled={
                  isSubmitting ||
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.password ||
                  !!errors.confirmPassword
                }
                onClick={!isSubmitting && handleSignup} />
            </div>



            <Authentication />
            <div className={styles.lastContent}>
              <p>
                Already have an account? <Link href="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
