import React from 'react'
import styles from './button.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

export default function Button({ text, fill, onClick, disabled, btnLink, light }) {
  const buttonContent = (
    <div className={classNames(styles.button, fill ? styles.fillBtn : "" , light ? styles.lightBtn : "")}>
      <button aria-label={text} onClick={onClick} disabled={disabled}>{text}</button>
    </div>
  )
  return (
    <>
      {btnLink ? <Link href={btnLink}>{buttonContent}</Link> : buttonContent}
    </>
  )
}
