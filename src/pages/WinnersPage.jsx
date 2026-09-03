// src/pages/WinnersPage.jsx
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import trophyImage from '../assets/trophy.png';
import styles from './WinnersPage.module.css';

const WinnersPage = () => {
  const winners = [
    {
      id: 1,
      name: "Rahul S.",
      prize: "iPhone 15 Pro"
    },
    {
      id: 2,
      name: "Priya M.",
      prize: "Apple Watch"
    },
    {
      id: 3,
      name: "Amit K.",
      prize: "AirPods Pro"
    },
    {
      id: 4,
      name: "Neha P.",
      prize: "Amazon Gift Card"
    },
    {
      id: 5,
      name: "Vikas N.",
      prize: "₹2,000 Voucher"
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backBtn}>
          <FaArrowLeft /> Home
        </Link>
        
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <img src={trophyImage} alt="Winners" className={styles.iconImage} width={60} height={60} decoding="async" />
          </div>
          <h1 className={styles.title}>Winners</h1>
          <p className={styles.subtitle}>View all winners here.</p>
        </div>
        
        <div className={styles.winnersList}>
          {winners.map((winner) => (
            <div key={winner.id} className={styles.winnerCard}>
              <div className={styles.userIcon}>
                <FaUser />
              </div>
              <div className={styles.winnerInfo}>
                <span className={styles.winnerName}>{winner.name}</span>
                <span className={styles.winnerPrize}>{winner.prize}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnersPage;