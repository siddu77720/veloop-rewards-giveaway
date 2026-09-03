// src/components/GiveawayLoader/GiveawayLoader.jsx
import { FaGift } from 'react-icons/fa';
import styles from './GiveawayLoader.module.css';

const GiveawayLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderAnimation}>
        <div className={styles.giftBox}>
          <FaGift className={styles.giftIcon} />
        </div>
        <div className={styles.sparkle1}>✦</div>
        <div className={styles.sparkle2}>✦</div>
        <div className={styles.sparkle3}>✦</div>
      </div>
      <p className={styles.loaderText}>Unlocking rewards...</p>
    </div>
  );
};

export default GiveawayLoader;