// src/components/FeaturedGiveaways/FeaturedGiveaways.jsx
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCoins, FaClock, FaFire, FaTicketAlt } from 'react-icons/fa';
import { useGiveaway } from '../../hooks/useGiveaway';
import styles from './FeaturedGiveaways.module.css';

const FeaturedGiveaways = () => {
  const { data, loading } = useGiveaway();
  const prizes = data?.prizes || [];

  if (loading || prizes.length === 0) return null;

  // Seamless loop ke liye list ko duplicate kiya (marquee effect)
  const loopPrizes = [...prizes, ...prizes];

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.title}>Active Giveaways</h2>
          <p className={styles.subtitle}>Join active giveaways and get a chance to win exciting rewards.</p>
        </div>
        <Link to="/giveaway" className={styles.viewAllBtn}>
          View All <FaArrowRight />
        </Link>
      </div>

      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {loopPrizes.map((prize, index) => (
            <Link
              to={`/giveaway/${String(prize.id).toLowerCase()}`}
              key={`${prize.id}-${index}`}
              className={styles.card}
              tabIndex={index < prizes.length ? 0 : -1}
            >
              <div className={styles.cardImageWrapper}>
                <div className={styles.imageGlow}></div>

                <div className={styles.cardBadge}>
                  {index % prizes.length === 0 ? (
                    <span className={styles.hotBadge}><FaFire /> HOT</span>
                  ) : index % prizes.length === prizes.length - 1 ? (
                    <span className={styles.trendingBadge}>TRENDING</span>
                  ) : (
                    <span className={styles.newBadge}>NEW</span>
                  )}
                </div>

                <img src={prize.image} alt={prize.name} className={styles.cardImage} loading="lazy" decoding="async" />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{prize.name}</h3>
                  <span className={styles.prizeValue}>
                    <span className={`${styles.iconGlow} ${styles.glowPurple}`}>
                      <FaCoins className={styles.coinIcon} />
                    </span>
                    {prize.entryFee} {prize.currency}
                  </span>
                </div>

                <div className={styles.entryInfo}>
                  <span className={`${styles.iconGlow} ${styles.glowAmber}`}>
                    <FaTicketAlt className={styles.entryIcon} />
                  </span>
                  <span>{prize.participants} Entries</span>
                </div>

                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '78%' }}></div>
                </div>
                <span className={styles.progressText}>78% Filled</span>

                <div className={styles.countdown}>
                  <span className={`${styles.iconGlow} ${styles.glowRed}`}>
                    <FaClock className={styles.countdownIcon} />
                  </span>
                  <span>Ends in {prize.remainingTime}</span>
                </div>

                <button className={styles.joinBtn}>
                  Join Now <FaArrowRight />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGiveaways;