// src/components/WinnersTabs/WinnersTabs.jsx
import { useState } from 'react';
import { FaTrophy, FaClock } from 'react-icons/fa';
import WinnerCard from '../WinnerCard/WinnerCard';
import PreviousWinnerCard from '../PreviousWinnerCard/PreviousWinnerCard';
import { winnerList, previousWinners, currentGiveaway } from '../../data/giveawayData';
import EmptyState from '../EmptyState/EmptyState';
import styles from './WinnersTabs.module.css';

const WinnersTabs = () => {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <section className={styles.section}>
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'current' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('current')}
        >
          <FaTrophy /> Winners
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'previous' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('previous')}
        >
          <FaClock /> Previous Winners
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'current' ? (
          currentGiveaway.status === 'active' ? (
            <div className={styles.noWinners}>
              <FaTrophy className={styles.noWinnersIcon} />
              <h3>Giveaway is still live</h3>
              <p>Winners will be announced after the giveaway ends.</p>
              <span className={styles.liveBadge}>Current Giveaway Status: LIVE</span>
            </div>
          ) : (
            <div className={styles.winnersGrid}>
              {winnerList.map((winner) => (
                <WinnerCard key={winner.id} winner={winner} />
              ))}
            </div>
          )
        ) : (
          previousWinners.length > 0 ? (
            <div className={styles.winnersGrid}>
              {previousWinners.map((winner) => (
                <PreviousWinnerCard key={winner.id} winner={winner} />
              ))}
            </div>
          ) : (
            <EmptyState title="No Previous Winners" description="Previous winners will appear here after a giveaway is completed." />
          )
        )}
      </div>
    </section>
  );
};

export default WinnersTabs;