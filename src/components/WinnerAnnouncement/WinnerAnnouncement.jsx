// src/components/WinnerAnnouncement/WinnerAnnouncement.jsx
import { Link } from 'react-router-dom';
import { FaTrophy, FaCheckCircle, FaArrowRight, FaUser } from 'react-icons/fa';
import styles from './WinnerAnnouncement.module.css';

const WinnerAnnouncement = () => {
  const winners = [
    {
      id: 1,
      name: "Rahul S.",
      reward: "iPhone 15 Pro"
    },
    {
      id: 2,
      name: "Priya M.",
      reward: "Apple Watch"
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        {/* Purple Glow Background */}
        <div className={styles.glowOverlay}></div>
        
        {/* Sparkles */}
        <div className={styles.sparkle1}>✦</div>
        <div className={styles.sparkle2}>✦</div>
        <div className={styles.sparkle3}>✦</div>

        {/* Header - Left Side Text */}
        <div className={styles.header}>
          <span className={styles.label}><FaTrophy /> WINNER ANNOUNCEMENT</span>
          <h2 className={styles.heading}>Congratulations to Our Winner!</h2>
        </div>

        {/* Winners Row - 1 Row 2 Winners */}
        <div className={styles.winnersRow}>
          {winners.map((winner) => (
            <div key={winner.id} className={styles.winnerCard}>
              {/* User Icon */}
              <div className={styles.userIcon}>
                <FaUser />
              </div>
              <div className={styles.winnerInfo}>
                <div className={styles.winnerNameWrapper}>
                  <span className={styles.winnerName}>{winner.name}</span>
                  <FaCheckCircle className={styles.verifiedIcon} />
                </div>
                <span className={styles.winnerReward}>Won: {winner.reward}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaContainer}>
          <Link to="/winners" className={styles.viewAllBtn}>
            View All Winners <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WinnerAnnouncement;