import React from 'react'
import styles from './logo.module.scss';
const ValorLogo = '/assets/logo/valor.svg';
export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={ValorLogo} alt='ValorLogo'/>
    </div>
  )
}
