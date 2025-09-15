'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './profileDetails.module.scss';
import MessageIcon from '@/components/icons/messageIcon';
import Input from '@/components/input';
import Textares from '@/components/textarea';
import Textarea from '@/components/textarea';
import Button from '@/components/button';
import { toast } from 'react-toastify';
import { sendMessage } from '@/app/api/contactus';
import { getUtilityData } from '@/app/api/dashboard';
import DownArrow from '@/components/icons/downArrow';
import { regions } from '@/regions';
import Dropdownarrow from '../../../../public/assets/icons/dropdownarrow';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RightIcon from '@/components/icons/rightIcon';
import { getCookie, setCookie } from '../../../../cookie';
import { editProfile, getProfile } from '@/app/api/auth';
const SmsIcon = '/assets/icons/sms.svg';
const EmailIcon = '/assets/icons/email-sm.svg';
const PhoneIcon = '/assets/icons/phone.svg';
const LocationIcon = '/assets/icons/location.svg';
export default function ProfileDetails() {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        location: '',
        gender: ''
    });
    const [birthDate, setBirthDate] = useState(null);

    // dropdown states
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+12');
    const [selectedGender, setSelectedGender] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dateError, setDateError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [initialUserData, setInitialUserData] = useState(null);

    const countryRef = useRef(null);
    const genderRef = useRef(null);
    
    useEffect(() => {
        fetchProfile(); 
    }, []);

    const fetchProfile = async () => {
        const userCookie = getCookie("user");
        const parsedUser = JSON.parse(userCookie)._id;
        const response = await getProfile(parsedUser);
        const userProfile = response.payload.data[0];
        console.log("User profile data:", userProfile);
        
        // Update user state with profile data
        setUser(prev => ({
            ...prev,
            ...userProfile
        }));
        setInitialUserData(userProfile);
        
        // Set birthdate if available
        if (userProfile?.birthday) {
            const birthDate = new Date(userProfile.birthday);
            console.log("Setting birth date:", birthDate);
            setBirthDate(birthDate);
        } else {
            setBirthDate(null);
        }

        // Set country code if available
        if (userProfile?.countryCode) {
            console.log("Setting country code:", userProfile.countryCode);
            setSelectedCountryCode(userProfile.countryCode);
        } else {
            setSelectedCountryCode('+12');
        }

        // Set gender if available
        if (userProfile?.gender) {
            console.log("Setting gender:", userProfile.gender);
            setSelectedGender(userProfile.gender);
        } else {
            setSelectedGender('');
        }
    };


    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (countryRef.current && !countryRef.current.contains(e.target)) {
                setShowCountryDropdown(false);
            }
            if (genderRef.current && !genderRef.current.contains(e.target)) {
                setShowGenderDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const validateUser = () => {
        if (!user.name || !user.phone || !user.location || !user.gender || !birthDate) {
            return false;
        }
        return true;
    };

    const handleEditProfile = async () => {

        setPhoneError('');
        setDateError('');

        // Phone number validation
        if (!user?.phone || user.phone.length !== 10) {
            setPhoneError('Phone number must be 10 digits');
            return;
        }
        if (!validateUser()) {
            toast.error("Please fill in all fields");
            return;
        }

        // Check if user is at least 13 years old
        const thirteenYearsAgo = new Date();
        thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

        if (birthDate > thirteenYearsAgo) {
            setDateError('You must be at least 13 years old');
            return;
        }

        if (isLoading) return; // Prevent multiple clicks

        setIsLoading(true);
        try {
            const payload = {
                ...user,
                phone: user.phone.trim(), // Trim phone number
                countryCode: selectedCountryCode,
                gender: selectedGender || user.gender,
                birthday: birthDate ? birthDate.toISOString().split('T')[0] : ''
            };

            const res = await editProfile(user._id, payload);

            if (res.success) {
                setCookie("user", JSON.stringify(res.payload));
                toast.success("Profile updated successfully");
                fetchProfile();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

  
    const hasChanges = () => {
        if (!initialUserData || !user) return false;
    
        return (
            user.name !== initialUserData.name ||
            user.phone !== initialUserData.phone ||
            user.location !== initialUserData.location ||
            user.gender !== initialUserData.gender ||
            (birthDate && initialUserData.birthday && 
             new Date(birthDate).toISOString().split('T')[0] !== initialUserData.birthday)
        );
    };
    return (
        <div className={styles.contactUs}>
          <div className={styles.subbox}>
                    <div className={styles.grid}>
                        <Input
                            type="text"
                            name="name"
                            label='First Name'
                            placeholder='Enter your first name'
                            value={user?.name || ''}
                            onChange={(e) => {
                                // Remove leading spaces
                                const value = e.target.value.replace(/^\s+/, '');
                                setUser({ ...user, name: value });
                            }}
                        />
                        {/* Country code + phone */}
                        <div className={styles.telephoninputmain}>
                            <div className={styles.dropdownrelative} ref={countryRef}>
                                <label>Phone</label>
                                <div className={styles.telephoninput}>
                                    <div className={styles.countrycodeselectormain}>
                                        <div className={styles.countrycodeselectorrelative}>
                                            <div
                                                className={styles.countrycodeselector}
                                                onClick={() => setShowCountryDropdown(prev => !prev)}
                                            >
                                                <span>{selectedCountryCode}</span>
                                                <div className={styles.dropdownarrow}><Dropdownarrow /></div>
                                            </div>

                                            {showCountryDropdown && (
                                                <div className={styles.dropdown}>
                                                    <div className={styles.dropdownSpacing}>
                                                        {regions.map((region) => (
                                                            <div
                                                                className={styles.iconText}
                                                                key={`${region.code}-${region.numberCode}`}
                                                                onClick={() => {
                                                                    setSelectedCountryCode(region.numberCode);
                                                                    setShowCountryDropdown(false);
                                                                }}
                                                            >
                                                                <span>{region.numberCode}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <input
                                        type="tel"  // Changed from text to tel for better mobile keyboard
                                        name="phone"
                                        placeholder='Enter your number'
                                        value={user?.phone || ''}
                                        maxLength={10}  // Prevent typing more than 10 digits
                                        onChange={(e) => {
                                            // Only allow numbers and remove any non-digit characters
                                            const value = e.target.value.replace(/\D/g, '');
                                            setUser({ ...user, phone: value });
                                            // Clear error when user starts typing
                                            if (phoneError) {
                                                setPhoneError('');
                                            }
                                        }}
                                    />
                                </div>
                                {phoneError && <span className={styles.errorMessage}>{phoneError}</span>}
                            </div>
                        </div>

                        <Input type="text" name="location" label='Address' placeholder='Enter your location'
                            value={user?.location}
                            onChange={(e) => setUser({ ...user, location: e.target.value })} />

                        {/* Gender dropdown */}
                        <div className={styles.dropdownrelative} ref={genderRef}>
                            <div className={styles.dropdownhead}>
                                <label>Gender</label>
                                <div
                                    className={styles.dropdowninput}
                                    onClick={() => setShowGenderDropdown(prev => !prev)}
                                >
                                    <div className={styles.dropdownselecteditem}>
                                        <span>{selectedGender || "Select Gender"}</span>
                                    </div>
                                    <div className={styles.dropdownarrow}><Dropdownarrow /></div>
                                </div>
                            </div>

                            {showGenderDropdown && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownSpacing}>
                                        {["Male", "Female", "Other"].map((gender) => (
                                            <div
                                                className={styles.iconText}
                                                key={gender}
                                                onClick={() => {
                                                    setSelectedGender(gender);
                                                    setUser({ ...user, gender });
                                                    setShowGenderDropdown(false);
                                                }}
                                            >
                                                <span>{gender}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.datePickerWrapper}>
                            <label>Date of Birth</label>
                            <DatePicker
                                selected={birthDate}
                                onChange={(date) => {
                                    setBirthDate(date);
                                    setDateError(''); // Clear error when date changes
                                }}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select date of birth"
                                // className={`${styles.datePickerInput} date-picker-custom ${dateError ? styles.error : ''}`}
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={100}
                                maxDate={new Date()} // Prevent future dates
                                locale="en-GB"
                            />
                            {dateError && <span className={styles.errorMessage}>{dateError}</span>}
                        </div>

                    </div>

                    <Button
                        text={isLoading ? "Saving..." : "Save"}
                        fill
                        icon={RightIcon}
                        onClick={handleEditProfile}
                        disabled={!hasChanges() || isLoading}
                    />
                </div>
        </div>
    )
}
