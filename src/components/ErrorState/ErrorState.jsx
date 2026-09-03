// src/components/ErrorState/ErrorState.jsx
import { FaExclamationTriangle } from 'react-icons/fa';
import styles from './ErrorState.module.css';

const ErrorState = ({ onRetry }) => {
  return (
    <div className={styles.errorState}>
      <div className={styles.iconWrapper}>
        <FaExclamationTriangle />
      </div>
      <h2 className={styles.title}>We couldn't load the giveaway information.</h2>
      <p className={styles.description}>Please try again later.</p>
      <button onClick={onRetry} className={styles.retryBtn}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;