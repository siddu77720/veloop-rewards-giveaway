// src/components/WinnerCard/WinnerCard.jsx
import { FaTrophy, FaUser } from 'react-icons/fa';
import styles from './WinnerCard.module.css';

const WinnerCard = ({ winner }) => {
  return (
    <div className={styles.card}>
      <div className={styles.userAvatar}>
        <FaUser />
      </div>
      <div className={styles.userInfo}>
        <span className={styles.userId}>{winner.userId}</span>
        <span className={styles.prizeName}>{winner.prizeName}</span>
        <span className={styles.date}>{winner.date}</span>
      </div>
      <div className={styles.trophyIcon}>
        <FaTrophy />
      </div>
    </div>
  );
};

export default WinnerCard;