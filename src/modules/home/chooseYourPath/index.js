"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./chooseYourPath.module.scss";
import StarIcon from "@/components/icons/starIcon";
import ProfileIcon from "@/components/icons/profileIcon";
import ClockIcon from "@/components/icons/clockIcon";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { getCourseByType, getCourses, getDashboardCourses } from "@/app/api/dashboard";
import { getCookie } from "../../../../cookie";
import CalanderIcon from "@/components/icons/calanderIcon";
const CardImage = "/assets/images/card3.png";
const TopLayer = "/assets/images/top-layer.svg";
export default function ChooseYourPath() {
    const [courses, setCourses] = useState([]);
    const [activeType, setActiveType] = useState("recorded");
    const router = useRouter();
    const [user, setUser] = useState(null);
    
        useEffect(() => {
            const user = getCookie("user");
            const userName = user && JSON.parse(user)?.name;
            setUser(userName);
        }, []);
    
        const handleNavigate = () => {
            if (user) {
                console.log(activeType,"activeType");
                if(activeType === "live"){
                    router.push('/courses?category=live')
                }else if(activeType === "physical"){
                    router.push('/courses?category=physical')
                }else{
                    router.push('/courses')
                }
            } else {
                router.push('/login')
            }
        }

    useEffect(() => {
        console.log("hello");
        
        const fetchCourses = async (page = 1) => {

            try {
                console.log("hye");
                console.log(user,"=====user");
                
                if (user) {
                    console.log("hello");

                    const params = {
                        page,
                        limit: 3,
                        courseType: activeType || "recorded",
                      };
                    
                    // If user is not logged in, use the existing implementation
                    const response = await getCourses(params);
                    console.log(response,"response");
                    
                    if (response && response.payload && response.payload.data) {
                        setCourses(response.payload.data);
                    }
                    
                } else {
                    console.log("else");

                    const params = {
                        page,
                        limit: 3,
                        courseType: activeType || "recorded",
                      };
                    
                    // If user is logged in, use getCourseByType from dashboard API
                    const response = await getDashboardCourses(params);
                    console.log(response,"=====response");
                    
                    if (response && response.payload && response.payload.data) {
                        setCourses(response.payload.data);
                    }
                    
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, [user,activeType]);

    const courseTypes = [
        { id: "recorded", label: "Recorded courses", course: "pre-recorded" },
        { id: "live", label: "Live Webinars", course: "live-online" },
        { id: "physical", label: "Traders Meet", course: "in-person" },
    ];

    const currentCourses = courses[activeType] || [];

    console.log(courses,"@@@@@@@courses");
    
    return (
        <>
            <div className={styles.chooseYourPath}>
                <div className="container-lg">
                    <div className={styles.box}>
                        <div className={styles.title}>
                            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                                Choose Your Path to <span>Financial Freedom</span>
                            </motion.h2>
                            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                                Live Classes. Recorded Lessons. Offline Seminars.
                            </motion.p>
                        </div>
                        <div className={styles.tabCenteralignment}>
                            <div className={styles.tab}>
                                {courseTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        aria-pressed={activeType === type.id}
                                        onClick={() => setActiveType(type.id)}
                                        className={`${activeType === type.id ? styles.active : ''}`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* <motion.div className={styles.grid} variants={{ visible: { transition: { staggerChildren: 0.3 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}> */}
                        <div
                            className={styles.grid}
                            key={activeType}
                        >
                            {console.log(courses,"^^^^^^courses")}
                            {courses?.map(
                                (course, index) => {
                                    return (
                                        <motion.div className={styles.griditems} key={index} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                                            <div className={styles.image}>
                                                <img src={course?.courseVideo} alt="CardImage" />
                                            </div>
                                            <div className={styles.details}>
                                                <h3>{course?.CourseName}</h3>
                                                <p>{course?.description}</p>
                                                {activeType === "recorded" ? (<><div className={styles.allIconTextAlignment}>
                                                    {/* <div className={styles.iconText}>
                                                        <StarIcon />
                                                        <span>4.8</span>
                                                    </div> */}
                                                    <div className={styles.iconText}>
                                                       $
                                                        <span>{course?.price}</span>
                                                    </div>
                                                    <div className={styles.iconText}>
                                                        <ProfileIcon />
                                                        <span>{course?.subscribed}</span>
                                                    </div>
                                                    <div className={styles.iconText}>
                                                        <ClockIcon />
                                                        <span>{course?.hours} hours</span>
                                                    </div>
                                                </div>
                                                {/* <div className={styles.textButtonAlignment}>
                                                    <h4>${course?.price}</h4>
                                                    <button aria-label="Beginner Level">
                                                        <span>Beginner Level</span>
                                                    </button>
                                                </div> */}
                                                </>) : (
                                                    <>
                                                    <div className={styles.allIconTextAlignment}>
                                                    <div className={styles.iconText}>
                                                        <ProfileIcon />
                                                        {console.log(user,")))))))))))))user")
                                                        }
                                                        <span>{user ? course?.registrationCount : course?.registration}</span>
                                                    </div>
                                                    <div className={styles.iconText}>
                                                        <CalanderIcon />
                                                        <span>{course?.courseStart ? new Date(course.courseStart).toLocaleDateString('en-GB') : ''}</span>
                                                    </div>
                                                    <div className={styles.iconText}>
                                                        <ClockIcon />
                                                        <span>{course?.startTime} to {course?.endTime}</span>
                                                    </div>
                                                </div>
                                                    </>
                                                )}
                                                
                                                <div className={styles.btnwidth}>
                                                    <Button fill={activeType === "recorded" ? course?.payment?.length > 0 : course?.registrationCount > 0} text={`${activeType === "recorded" ? course?.payment?.length > 0 ? "Enrolled" : "Enroll Now" : course?.registrationCount > 0 ? "Registered" : "Register"}`} onClick={handleNavigate} />
                                                </div>
                                            </div>
                                        </motion.div>)
                                }
                            )}
                        </div>
                        {/* </motion.div> */}
                    </div>
                </div>
            </div>
            <div className={styles.toplayer}>
                <img src={TopLayer} alt="TopLayer" />
            </div>
        </>
    );
}
