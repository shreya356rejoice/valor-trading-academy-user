import React from 'react'
import styles from './button.module.scss';
import classNames from 'classnames';
export default function Button({text , fill , onClick , disabled}) {
  return (
    <div className={ classNames(styles.button , fill ? styles.fillBtn : "") }>
      <button aria-label={text} onClick={onClick} disabled={disabled}>{text}</button>
    </div>
  )
}
