// src/components/Navbar/Navbar.jsx
import { FaBell, FaCog } from 'react-icons/fa';
import veloopLogo from '../../assets/veloop-logo.gif';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <img src={veloopLogo} alt="VELOOP Logo" className={styles.logoImage} width={28} height={28} decoding="async" />
          <span className={styles.brandName}>VELOOP <span className={styles.rewardsText}>REWARDS</span></span>
        </div>

        {/* Right Side Controls */}
        <div className={styles.controls}>
          {/* Country/Language Selector */}
          <div className={styles.languageSelector}>
            <svg width="20" height="20" viewBox="0 0 24 24" className={styles.flagIcon}>
              <rect x="0" y="0" width="24" height="8" fill="#FF9933"/>
              <rect x="0" y="8" width="24" height="8" fill="#FFFFFF"/>
              <rect x="0" y="16" width="24" height="8" fill="#138808"/>
              <circle cx="12" cy="12" r="3" fill="#000080" stroke="#FF9933" strokeWidth="0.5"/>
              <line x1="12" y1="9" x2="12" y2="15" stroke="#000080" strokeWidth="0.5"/>
              <line x1="9" y1="12" x2="15" y2="12" stroke="#000080" strokeWidth="0.5"/>
            </svg>
            <span className={styles.languageText}>IN</span>
          </div>

          {/* Notification Bell */}
          <button className={styles.iconBtn} aria-label="Notifications">
            <FaBell className={styles.icon} />
            <span className={styles.notificationDot}></span>
          </button>

          {/* Settings */}
          <button className={styles.iconBtn} aria-label="Settings">
            <FaCog className={styles.icon} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;