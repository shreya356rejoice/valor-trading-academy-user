'use client'
import React, { useState, useEffect } from 'react';
import styles from './RegistrationDialog.module.scss';
import Button from '../button';
import { useSearchParams } from 'next/navigation';
import { registerUser } from '@/app/api/dashboard';

const RegistrationDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    brokerName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const courseId = useSearchParams().get('id');
  const detailCourseId = useSearchParams().get('courseId');
  
  // Handle body scroll and reset form when dialog is opened/closed
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on body when dialog is open
      document.body.style.overflow = 'hidden';
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        brokerName: ''
      });
      setErrors({});
    } else {
      // Re-enable scrolling when dialog is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to re-enable scrolling if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
    } else if (formData.firstName.trim().length < 3) {
      newErrors.firstName = 'First name must be at least 3 characters';
    } else if (formData.firstName.trim().length > 30) {
      newErrors.firstName = 'First name cannot exceed 30 characters';
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
    } else if (formData.lastName.trim().length < 3) {
      newErrors.lastName = 'Last name must be at least 3 characters';
    } else if (formData.lastName.trim().length > 30) {
      newErrors.lastName = 'Last name cannot exceed 30 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length !== 10) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      } else if (!phoneRegex.test(phoneDigits)) {
        newErrors.phone = 'Please enter a valid phone number (10 digits)';
      }
    }
    
    // Broker Name validation
    if (!formData.brokerName.trim()) {
      newErrors.brokerName = 'Broker name is required';
    } else if (formData.brokerName.trim().length < 2) {
      newErrors.brokerName = 'Broker name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const registrationData = {
        ...formData,
        courseId: courseId || detailCourseId // Make sure courseId is passed as a prop to the RegistrationDialog component
      };
            
      const response = await registerUser(registrationData);

      console.log(response,"response");

      if(response.success){
        // Show thank you dialog immediately
        setShowThankYou(true);
        
        // Call the original onSubmit if needed
        if (onSubmit) {
          await onSubmit(formData);
        }
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Failed to submit the form. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    onClose();
  };

  if (!isOpen) return null;
    
  if (showThankYou) {
    return (
      <div className={styles.overlay} onClick={handleThankYouClose}>
        <div className={`${styles.dialog} ${styles.thankYouDialog}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h3>Thank You!</h3>
            <button className={styles.closeButton} onClick={handleThankYouClose}>&times;</button>
          </div>
          <div className={styles.thankYouContent}>
            <div className={styles.checkmark}>✓</div>
            <h4>Registration Successful</h4>
            <p>Thank you for registering with us! We've received your information and our team will get in touch with you shortly.</p>
            <Button 
              type="button" 
              text="Close" 
              onClick={handleThankYouClose}
              fill
              className={styles.thankYouButton}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Register</h3>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={errors.firstName ? styles.errorInput : ''}
            />
            {console.log(errors,'errors')
            }
            {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={errors.lastName ? styles.errorInput : ''}
            />
            {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={errors.email ? styles.errorInput : ''}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={errors.phone ? styles.errorInput : ''}
            />
            {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Broker Name</label>
            <input
              type="text"
              name="brokerName"
              value={formData.brokerName}
              onChange={handleChange}
              required
              className={errors.brokerName ? styles.errorInput : ''}
            />
            {errors.brokerName && <span className={styles.errorMessage}>{errors.brokerName}</span>}
          </div>
          {errors.form && <div className={styles.formError}>{errors.form}</div>}
          <div className={styles.buttonContainer}>
            <Button 
              type="button" 
              text="Cancel" 
              onClick={onClose}
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              text={isSubmitting ? 'Submitting...' : 'Submit'} 
              onClick={handleSubmit}
              fill 
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationDialog;
