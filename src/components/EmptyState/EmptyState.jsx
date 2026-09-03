// src/components/EmptyState/EmptyState.jsx
import { FaInbox } from 'react-icons/fa';
import styles from './EmptyState.module.css';

const EmptyState = ({ title, description }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.iconWrapper}>
        <FaInbox />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default EmptyState;