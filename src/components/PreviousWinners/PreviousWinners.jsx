// src/components/PreviousWinners/PreviousWinners.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUser, FaTrophy } from 'react-icons/fa';
import styles from './PreviousWinners.module.css';

const PreviousWinners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Previous Winners</h2>
        <Link to="/winners" className={styles.viewAllBtn}>
          View All <FaArrowRight />
        </Link>
      </div>

      <div className={styles.winnersRow}>
        {winners.map((winner) => (
          <div key={winner.id} className={styles.winnerCard}>
            <div className={styles.userIcon}>
              <FaUser />
            </div>
            <span className={styles.winnerName}>{winner.name}</span>
            <span className={styles.winnerPrize}>
              <FaTrophy className={styles.trophyIcon} /> {winner.prize}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviousWinners;