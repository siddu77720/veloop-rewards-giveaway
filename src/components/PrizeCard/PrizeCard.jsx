// src/components/PrizeCard/PrizeCard.jsx
import { FaUsers, FaClock, FaArrowRight, FaCoins } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './PrizeCard.module.css';

const PrizeCard = ({ prize }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.position}>{prize.position}</span>
        <span className={styles.entryFee}>
          <FaCoins /> {prize.entryFee} {prize.currency}
        </span>
      </div>

      <div className={styles.imageWrapper}>
        {/* Replace with actual asset image */}
        <img src={prize.image} alt={prize.name} className={styles.prizeImage} loading="lazy" decoding="async" />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.prizeName}>{prize.name}</h3>
        <p className={styles.prizeDesc}>{prize.description}</p>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <FaUsers className={styles.metaIcon} /> {prize.participants} Participants
          </span>
          <span className={styles.metaItem}>
            <FaClock className={styles.metaIcon} /> {prize.remainingTime} remaining
          </span>
        </div>

        <Link to={`/giveaway/${prize.id.toLowerCase()}`} className={styles.joinBtn}>
          Join Now <FaArrowRight className={styles.btnIcon} />
        </Link>
      </div>
    </div>
  );
};

export default PrizeCard;