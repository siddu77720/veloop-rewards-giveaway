// src/pages/HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTrophy, FaGift } from 'react-icons/fa';
import GiveawayHero from '../components/GiveawayHero/GiveawayHero';
import GiveawayStats from '../components/GiveawayStats/GiveawayStats';
import FeaturedGiveaways from '../components/FeaturedGiveaways/FeaturedGiveaways';
import EarnMoreEntries from '../components/EarnMoreEntries/EarnMoreEntries';
import WinnerAnnouncement from '../components/WinnerAnnouncement/WinnerAnnouncement';
import GiveawaysSection from '../components/GiveawaysSection/GiveawaysSection';
import HowToWin from '../components/HowToWin/HowToWin';
import GiveawayRules from '../components/GiveawayRules/GiveawayRules';
import FAQ from '../components/FAQ/FAQ';
import TrustSection from '../components/TrustSection/TrustSection';
import WinnerSlider from '../components/WinnerSlider/WinnerSlider';
import WinnersTabs from '../components/WinnersTabs/WinnersTabs';
import PrizeClaimModal from '../components/PrizeClaimModal/PrizeClaimModal';
import GiveawayLoader from '../components/GiveawayLoader/GiveawayLoader';
import ErrorState from '../components/ErrorState/ErrorState';
import WinnerReveal from '../components/WinnerReveal/WinnerReveal';
import { useGiveaway } from '../hooks/useGiveaway';
import { currentUser, winnerList } from '../data/giveawayData';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { data, loading, error } = useGiveaway();
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showWinnerReveal, setShowWinnerReveal] = useState(false);

  const isWinner = winnerList.find(winner => winner.userId === currentUser.id);
  const hasParticipated = currentUser.hasJoined;

  const handleClaimClick = () => {
    if (isWinner) {
      setSelectedPrize({ name: isWinner.prizeName, claimType: 'PHYSICAL' });
      setShowClaimModal(true);
    }
  };

  if (loading) {
    return <GiveawayLoader />;
  }

  if (error) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  if (!data || !data.current) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.upcomingState}>
            <h2>Next Giveaway</h2>
            <p>Starts In</p>
            <div className={styles.countdownBox}>
              <span>3</span>
              <span>Days</span>
            </div>
            <p>Get ready for another chance to win.</p>
            <Link to="/giveaway" className={styles.exploreBtn}>
              Explore Rewards <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GiveawayHero giveaway={data.current} />
        <GiveawayStats 
          stats={{
            totalGiveaways: 24,
            totalParticipants: typeof data.current.totalParticipants === 'number'
              ? `${data.current.totalParticipants.toLocaleString()}+`
              : (data.current.totalParticipants || '8.5K+'),
            prizesWon: "1.2K+",
          }} 
          endDate={data.current.endAt || data.current.endDate}
        />
        
        {/* Winner State - Congratulations Section */}
        {isWinner && (
          <div className={styles.winnerBanner}>
            <div className={styles.winnerGlow}></div>
            <div className={styles.confettiDot} style={{ left: '10%', top: '15%' }}></div>
            <div className={styles.confettiDot} style={{ left: '85%', top: '20%', animationDelay: '0.4s' }}></div>
            <div className={styles.confettiDot} style={{ left: '20%', top: '80%', animationDelay: '0.8s' }}></div>
            <div className={styles.confettiDot} style={{ left: '75%', top: '75%', animationDelay: '1.2s' }}></div>

            <div className={styles.trophyWrap}>
              <div className={styles.trophyGlow}></div>
              <FaTrophy className={styles.trophyIcon} />
            </div>

            <span className={styles.winnerTag}><FaGift /> YOU'RE A WINNER</span>
            <h3>Congratulations!</h3>
            <p>You won <span className={styles.prizeHighlight}>{isWinner.prizeName}</span>!</p>
            <button onClick={handleClaimClick} className={styles.claimBtn}>
              Claim Your Prize <FaArrowRight />
            </button>
          </div>
        )}

        {/* Non-Winner State */}
        {!isWinner && hasParticipated && (
          <div className={styles.nonWinnerBanner}>
            <h3>Thanks for participating!</h3>
            <p>Winners have been announced. Better luck next time!</p>
            <Link to="/giveaway" className={styles.exploreBtn}>
              Explore Next Giveaway <FaArrowRight />
            </Link>
          </div>
        )}

        <FeaturedGiveaways />
        <EarnMoreEntries />
        <WinnerAnnouncement />
        <WinnerSlider />
        <GiveawaysSection />
        <WinnersTabs />
        <HowToWin />
        <GiveawayRules />
        <FAQ />
        <TrustSection />
      </div>

      {showClaimModal && (
        <PrizeClaimModal 
          prize={selectedPrize}
          winner={isWinner}
          onClose={() => setShowClaimModal(false)} 
        />
      )}

      {showWinnerReveal && (
        <WinnerReveal winner={winnerList[0]} onClose={() => setShowWinnerReveal(false)} />
      )}
    </div>
  );
};

export default HomePage;