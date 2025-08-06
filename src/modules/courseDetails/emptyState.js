import styles from './courseDetails.module.scss';

export const EmptyState = ({ onRetry }) => (
    <div className={styles.emptyState} style={{ padding: '2rem' , backgroundColor: "var(--bg-white)",minHeight: '50vh',borderRadius: '22px',boxShadow: '0 8px 40px 0 rgba(215, 216, 222, 0.41)'}}>
      <div className={styles.emptyContent}>
        <img 
          src="/assets/icons/no-courses.svg" 
          alt="Course not found" 
          className={styles.emptyImage}
        />
        <h3>Course Details Not Available</h3>
        <p>We couldn't find the requested course details. The course might have been removed or is temporarily unavailable.</p>
        <div className={styles.buttonGroup}>
          <button 
            className={styles.primaryButton}
            onClick={onRetry}
          >
            Try Again
          </button>
          
        </div>
      </div>
    </div>
  );