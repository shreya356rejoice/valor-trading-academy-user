'use client'
import React, { useEffect, useState } from 'react'
import styles from './newPassword.module.scss';
import Logo from '@/components/logo';
import Button from '@/components/button';
import Input from '@/components/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updatePassword } from '@/app/api/auth';
const EyeIcon = '/assets/icons/eye.svg';
const EyeSlashIcon = '/assets/icons/eye-slash.svg';
export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "", submit: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailFromState = localStorage.getItem('email');
    if (emailFromState) {
      setEmail(emailFromState);
    }
  }, []);

  const handleSetNewPassword = async () => {
    // Clear previous errors
    setErrors({ newPassword: "", confirmPassword: "", submit: "" });

    const validationErrors = {
      newPassword: "",
      confirmPassword: "",
      submit: ""
    };

    // Validate new password
    if (!newPassword || newPassword.trim() === "") {
      validationErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      validationErrors.newPassword = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (!confirmPassword || confirmPassword.trim() === "") {
      validationErrors.confirmPassword = "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    // Check if there are any validation errors
    const hasError = Object.values(validationErrors).some(err => err !== "");
    if (hasError) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await updatePassword({
        email,
        password: newPassword
      });

      if (res.success) {
        // Clear sensitive data from localStorage
        localStorage.removeItem('email');
        // Redirect to signin on success
        router.push("/login");
      } else {
        // Handle API error response
        setErrors({
          ...validationErrors,
          submit: res.message || "Failed to update password. Please try again."
        });
      }

    } catch (err) {
      console.error('Password update error:', err);
      setErrors({
        ...validationErrors,
        submit: err.message || "An error occurred. Please try again later."
      });
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
            Set new password
          </h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing industry.
          </p>
        </div>
        <div className={styles.leftRightAlignment}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isSubmitting) handleSetNewPassword();
            }}
          >
            <div className={styles.spacing}>
              <Input name="newPassword"
                type={showPassword ? "text" : "password"}
                label="New Password"
                placeholder="**************"
                onIconClick={() => setShowPassword(!showPassword)}
                icon={!showPassword ? EyeIcon : EyeSlashIcon}
                value={newPassword}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({
                    newPassword: ""
                  });
                }} />
            </div>
            <Input name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="**************"
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                }
              }}
              onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              icon={!showConfirmPassword ? EyeIcon : EyeSlashIcon}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({
                  confirmPassword: ""
                });
              }} />

            <div className={styles.btnwidth}>
              <Button
                type="submit"
                text={isSubmitting ? "Updating..." : "Set new password"}
                fill
                disabled={isSubmitting}
                showLoader={isSubmitting} />
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
