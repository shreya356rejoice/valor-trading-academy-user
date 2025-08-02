import React from 'react'
import styles from './pagination.module.scss';
import PaginationArrow from '../icons/paginationArrow';
export default function Pagination() {
  return (
    <div className={styles.paginationAlignment}>
      <div className={styles.arrow}>
        <PaginationArrow/>
      </div>
      <div className={styles.counterAlignment}>
        <div className={styles.box}>1</div>
        <div className={styles.box}>2</div>
        <div className={styles.box}>...</div>
        <div className={styles.box}>4</div>
        <div className={styles.box}>5</div>
      </div>
        <div className={styles.arrow}>
        <PaginationArrow/>
      </div>
    </div>
  )
}
