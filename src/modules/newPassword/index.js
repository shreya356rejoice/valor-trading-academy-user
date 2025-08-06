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
            <Logo/>
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
             <div className={styles.spacing}>
         <Input label='New Password' placeholder='**************' icon={showPassword ? EyeSlashIcon : EyeIcon} type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} onIconClick={() => setShowPassword(!showPassword)}/>
       </div>
         <Input label='Confirm Password' placeholder='**************' icon={showConfirmPassword ? EyeSlashIcon : EyeIcon} type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
      
         <div className={styles.btnwidth}>
          <Button text={isSubmitting ? "Loading..." : "Set new password"} fill onClick={handleSetNewPassword}/>
         </div>
        </div>
        
      </div>
    </div>
  )
}
