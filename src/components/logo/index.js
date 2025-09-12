import React from 'react';
import Link from 'next/link';
import styles from './logo.module.scss';

const ValorLogo = '/assets/logo/valor.svg';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <img src={ValorLogo} alt='ValorLogo'/>
    </Link>
  );
}
