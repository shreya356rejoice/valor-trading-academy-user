import React from 'react'
import styles from './input.module.scss';
export default function Input({ label, name, placeholder, icon, type, value, onChange, onIconClick }) {
    return (
        <div className={styles.input}>
            {
                label && (
                    <label>{label}</label>
                )
            }
            <div className={styles.relative}>
                <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
                {
                    icon && (
                        <div className={styles.iconAlignment}>
                            <img src={icon} alt={icon} onClick={onIconClick} />
                        </div>
                    )
                }

            </div>
        </div>
    )
}
