// src/pages/EarnPage.jsx
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCoins, FaPlayCircle, FaUserFriends, FaPoll, FaDice, FaCalendarCheck } from 'react-icons/fa';
import coinsImage from '../assets/coins.png'; // Coins image import
import { useInView } from '../hooks/useInView';
import styles from './EarnPage.module.css';

// DEMO DATA - this page has no backend "earn" endpoint yet, so this is
// placeholder content styled to match the rest of the app (same card/tone
// pattern as GiveawayRules and TrustSection). Swap `earnMethods` for a real
// API response once the backend route exists - the markup/CSS won't need
// to change, only where this array comes from.
const earnMethods = [
  {
    id: 1,
    icon: FaCalendarCheck,
    tone: 'purple',
    title: 'Daily Login Bonus',
    description: 'Open the app every day to collect a free bonus.',
    reward: '+10 Coins',
  },
  {
    id: 2,
    icon: FaPlayCircle,
    tone: 'gold',
    title: 'Watch & Earn',
    description: 'Watch a short video to earn quick coins.',
    reward: '+15 Coins',
  },
  {
    id: 3,
    icon: FaUserFriends,
    tone: 'pink',
    title: 'Refer a Friend',
    description: 'Invite friends to VELOOP and earn when they join.',
    reward: '+100 Coins',
  },
  {
    id: 4,
    icon: FaPoll,
    tone: 'green',
    title: 'Complete a Survey',
    description: 'Share your feedback in a quick survey.',
    reward: '+25 Coins',
  },
  {
    id: 5,
    icon: FaDice,
    tone: 'red',
    title: 'Daily Spin',
    description: 'Spin the wheel once a day for a surprise reward.',
    reward: 'Up to +50 Coins',
  },
];

const EarnPage = () => {
  const [listRef, isInView] = useInView({ threshold: 0.1 });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backBtn}>
          <FaArrowLeft /> Home
        </Link>

        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <img src={coinsImage} alt="Coins" className={styles.iconImage} width={60} height={60} decoding="async" />
          </div>
          <h1 className={styles.title}>Earn</h1>
          <p className={styles.subtitle}>Earn VELOOP Coins by completing tasks.</p>
        </div>

        {/* Balance summary - demo value until wired to the real user balance */}
        <div className={styles.balanceCard}>
          <span className={styles.balanceGlow} aria-hidden="true"></span>
          <div className={styles.balanceIcon}>
            <FaCoins />
          </div>
          <div className={styles.balanceInfo}>
            <span className={styles.balanceLabel}>Your Balance</span>
            <span className={styles.balanceValue}>1,240 Coins</span>
          </div>
          <span className={styles.previewTag}>Preview</span>
        </div>

        <div className={styles.sectionHeaderRow}>
          <span className={styles.eyebrow}>More Ways</span>
          <h2 className={styles.sectionTitle}>Ways to Earn</h2>
        </div>

        <div ref={listRef} className={`${styles.earnList} ${isInView ? styles.inView : ''}`}>
          {earnMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={styles.earnCard}
                style={{ '--delay': `${index * 0.08}s` }}
              >
                <span className={`${styles.earnIconWrap} ${styles[method.tone]}`}>
                  <Icon className={styles.earnIcon} />
                </span>
                <div className={styles.earnInfo}>
                  <h3 className={styles.earnTitle}>{method.title}</h3>
                  <p className={styles.earnDesc}>{method.description}</p>
                  <span className={styles.earnReward}>{method.reward}</span>
                </div>
                <button className={styles.earnBtn} type="button">Start</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EarnPage;