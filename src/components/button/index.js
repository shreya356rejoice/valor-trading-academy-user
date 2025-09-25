import React from 'react'
import styles from './button.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

export default function Button({ text, fill, onClick, disabled, btnLink }) {
  const buttonContent = (
    <div className={classNames(styles.button, fill ? styles.fillBtn : "")}>
      <button aria-label={text} onClick={onClick} disabled={disabled}>{text}</button>
    </div>
  )
  return (
    <>
      {btnLink ? <Link href={btnLink}>{buttonContent}</Link> : buttonContent}
    </>
  )
}
