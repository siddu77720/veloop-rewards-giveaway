// src/components/WinnerReveal/WinnerReveal.jsx
import { useState, useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa';
import styles from './WinnerReveal.module.css';

const WinnerReveal = ({ winner }) => {
  const [phase, setPhase] = useState('loading'); // loading, revealed

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('revealed');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {phase === 'loading' ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Selecting Winners...</p>
          </div>
        ) : (
          <div className={styles.revealed}>
            <FaTrophy className={styles.trophy} />
            <h2>Winner Revealed!</h2>
            <p className={styles.winnerName}>{winner.userId}</p>
            <p className={styles.prizeName}>{winner.prizeName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerReveal;