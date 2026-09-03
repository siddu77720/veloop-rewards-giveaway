// src/pages/ProfilePage.jsx
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backBtn}>
          <FaArrowLeft /> Home
        </Link>
        
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <FaUser />
          </div>
          <h1 className={styles.title}>Profile</h1>
          <p className={styles.subtitle}>Manage your account here.</p>
        </div>
        
        <div className={styles.emptyState}>
          <p>Profile details will appear here soon.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;