import React from 'react';
import Link from 'next/link';
import styles from './logo.module.scss';

const ValorLogo = '/assets/logo/eduFins-logo.png';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <img src={ValorLogo} className='logo-width' alt='ValorLogo'/>
    </Link>
  );
}
