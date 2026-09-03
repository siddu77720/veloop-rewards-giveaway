// src/components/GiveawayStats/GiveawayStats.jsx
import { FaGift, FaUsers, FaTrophy, FaClock } from 'react-icons/fa';
import Countdown from '../Countdown/Countdown';
import styles from './GiveawayStats.module.css';

const GiveawayStats = ({ stats, endDate }) => {
  const statItems = [
    {
      icon: <FaGift />,
      label: "Total Giveaways",
      value: stats.totalGiveaways,
      suffix: "Active",
      color: "#8b5cf6"
    },
    {
      icon: <FaUsers />,
      label: "Total Participants",
      value: stats.totalParticipants,
      suffix: "Users",
      color: "#fbbf24"
    },
    {
      icon: <FaTrophy />,
      label: "Prizes Won",
      value: stats.prizesWon,
      suffix: "Rewards",
      color: "#22c55e"
    }
  ];

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsCard}>
        {/* First 3 Stats */}
        {statItems.map((item, index) => (
          <div key={index} className={styles.statBlock}>
            <div className={styles.iconWrapper} style={{ color: item.color }}>
              {item.icon}
            </div>
            <span className={styles.statValue}>{item.value}</span>
            <span className={styles.statLabel}>{item.label}</span>
            <span className={styles.statSuffix}>{item.suffix}</span>
          </div>
        ))}

        {/* 4th Block - Countdown */}
        <div className={styles.statBlock}>
          <div className={styles.iconWrapper} style={{ color: "#ef4444" }}>
            <FaClock />
          </div>
          <Countdown endDate={endDate} />
          <span className={styles.statLabel}>Ends In</span>
          <span className={styles.statSuffix}>Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default GiveawayStats;