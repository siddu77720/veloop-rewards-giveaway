// src/pages/GiveawaysPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFire, FaClock, FaCoins, FaUsers, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useGiveaway } from '../hooks/useGiveaway';
import EmptyState from '../components/EmptyState/EmptyState';
import GiveawayLoader from '../components/GiveawayLoader/GiveawayLoader';
import styles from './GiveawaysPage.module.css';

const GiveawaysPage = () => {
  const { data, loading } = useGiveaway();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'hot', label: 'Hot' },
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'New' },
    { id: 'ending', label: 'Ending Soon' }
  ];

  if (loading) {
    return <GiveawayLoader />;
  }

  const prizes = data?.prizes || [];

  // Position-based tagging (1st prize = Hot, last = Trending, rest = New) —
  // this used to be hardcoded to specific static ids (PRIZE-001..004), which
  // silently broke once prizes came from the backend with real Mongo _ids.
  const filteredPrizes = prizes.filter((prize, index) => {
    if (searchTerm && !prize.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (activeFilter === 'hot') return index === 0;
    if (activeFilter === 'trending') return index === 1;
    if (activeFilter === 'new') return index === 2;
    if (activeFilter === 'ending') return index === prizes.length - 1;

    return true;
  });

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Back Button */}
        <Link to="/" className={styles.backBtn}>
          <FaArrowLeft /> Home
        </Link>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.heading}>Giveaways</h1>
          <p className={styles.subtitle}>Explore exciting giveaways and enter for a chance to win amazing rewards.</p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search giveaways..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className={styles.filterChips}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filterChip} ${activeFilter === filter.id ? styles.activeChip : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.id === 'hot' && <FaFire />}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Giveaway Cards Grid */}
        {filteredPrizes.length > 0 ? (
          <div className={styles.giveawaysGrid}>
            {filteredPrizes.map((prize, index) => (
              <Link to={`/giveaway/${String(prize.id).toLowerCase()}`} key={prize.id} className={styles.card}>
                {/* Reward Image */}
                <div className={styles.cardImageWrapper}>
                  <div className={styles.imageGlow}></div>
                  <div className={styles.cardBadge}>
                    {index === 0 ? (
                      <span className={styles.hotBadge}><FaFire /> HOT</span>
                    ) : index === filteredPrizes.length - 1 ? (
                      <span className={styles.trendingBadge}>TRENDING</span>
                    ) : (
                      <span className={styles.newBadge}>NEW</span>
                    )}
                  </div>
                  <img src={prize.image} alt={prize.name} className={styles.cardImage} />
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{prize.name}</h3>
                    <span className={styles.prizeValue}>
                      <FaCoins /> {prize.entryFee} {prize.currency}
                    </span>
                  </div>

                  {/* Entries */}
                  <div className={styles.entryInfo}>
                    <FaUsers className={styles.entryIcon} />
                    <span>{prize.participants} Entries</span>
                  </div>

                  {/* Progress Bar */}
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '78%' }}></div>
                  </div>
                  <span className={styles.progressText}>78% Filled</span>

                  {/* Countdown */}
                  <div className={styles.countdown}>
                    <FaClock className={styles.countdownIcon} />
                    <span>Ends in {prize.remainingTime}</span>
                  </div>

                  {/* Join Now CTA */}
                  <button className={styles.joinBtn}>
                    Join Now <FaArrowRight />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No Giveaways Found" description="Try searching with a different keyword or filter." />
        )}
      </div>
    </div>
  );
};

export default GiveawaysPage;