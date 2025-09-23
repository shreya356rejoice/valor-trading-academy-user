"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./chooseYourPath.module.scss";
import StarIcon from "@/components/icons/starIcon";
import ProfileIcon from "@/components/icons/profileIcon";
import ClockIcon from "@/components/icons/clockIcon";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { getCourseByType } from "@/app/api/dashboard";
import { getCookie } from "../../../../cookie";
const CardImage = "/assets/images/card3.png";
const TopLayer = "/assets/images/top-layer.svg";
export default function ChooseYourPath() {
    const [courses, setCourses] = useState({
        recorded: [],
        live: [],
        physical: [],
    });
    const [activeType, setActiveType] = useState("recorded");
    const router = useRouter();
    const [user, setUser] = useState("");
    
        useEffect(() => {
            const user = getCookie("user");
            const userName = user && JSON.parse(user)?.name;
            setUser(userName);
        }, []);
    
        const handleNavigate = () => {
            if (user) {
                router.push('/courses')
            } else {
                router.push('/login')
            }
        }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourseByType();
                if (response && response.payload && response.payload.courses) {
                    setCourses({
                        recorded: response.payload.courses.recorded.slice(0, 5) || [],
                        live: response.payload.courses.live.slice(0, 5) || [],
                        physical: response.payload.courses.physical.slice(0, 5) || [],
                    });
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const courseTypes = [
        { id: "recorded", label: "Recorded courses", course: "pre-recorded" },
        { id: "live", label: "Live Webinars", course: "live-online" },
        { id: "physical", label: "Traders Meet", course: "in-person" },
    ];

    const currentCourses = courses[activeType] || [];

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
                            {currentCourses.map(
                                (course, index) => {
                                    return (
                                        <motion.div className={styles.griditems} key={index} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                                            <div className={styles.image}>
                                                <img src={course?.courseVideo} alt="CardImage" />
                                            </div>
                                            <div className={styles.details}>
                                                <h3>{course?.CourseName}</h3>
                                                <div className={styles.allIconTextAlignment}>
                                                    <div className={styles.iconText}>
                                                        <StarIcon />
                                                        <span>4.8</span>
                                                    </div>
                                                    <div className={styles.iconText}>
                                                        <ProfileIcon />
                                                        <span>1234</span>
                                                    </div>
                                                    <div className={styles.iconText}>
                                                        <ClockIcon />
                                                        <span>{course?.hours} hours</span>
                                                    </div>
                                                </div>
                                                <div className={styles.textButtonAlignment}>
                                                    <h4>${course?.price}</h4>
                                                    <button aria-label="Beginner Level">
                                                        <span>Beginner Level</span>
                                                    </button>
                                                </div>
                                                <div className={styles.btnwidth}>
                                                    <Button text="Enroll Now" onClick={handleNavigate} />
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
