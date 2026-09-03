// src/pages/IndividualGiveaway.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCoins, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { currentUser } from '../data/giveawayData';
import { useGiveaway } from '../hooks/useGiveaway';
import { joinGiveaway as joinGiveawayApi } from '../services/api';
import { devLogin, getToken } from '../services/auth';
import { getDeviceHash } from '../utils/device';
import GiveawayLoader from '../components/GiveawayLoader/GiveawayLoader';
import styles from './IndividualGiveaway.module.css';

const IndividualGiveaway = () => {
  const { prizeId } = useParams();
  const { data, loading } = useGiveaway();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [joining, setJoining] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [joinError, setJoinError] = useState(null);
  const [liveBalance, setLiveBalance] = useState(null);

  useEffect(() => {
    const ensureLoggedIn = async () => {
      if (!getToken()) {
        await devLogin(currentUser.id);
      }
    };
    ensureLoggedIn();
  }, []);

  if (loading) {
    return <GiveawayLoader />;
  }

  const prize = data?.prizes?.find(
    (p) => String(p.id).toLowerCase() === String(prizeId).toLowerCase()
  );

  if (!prize) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>
            <h2>Giveaway Not Found</h2>
            <Link to="/giveaway" className={styles.backBtn}>
              <FaArrowLeft /> Back to Giveaways
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userBalance = liveBalance !== null ? liveBalance : (currentUser.balance[prize.currency] || 0);
  const hasSufficientBalance = userBalance >= prize.entryFee;

  const handleJoinClick = () => {
    if (!currentUser.isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setJoinError(null);
    setShowConfirmModal(true);
  };

  const handleConfirmJoin = async () => {
    setJoining(true);
    setJoinError(null);

    try {
      let token = getToken();
      if (!token) {
        const loginRes = await devLogin(currentUser.id);
        token = loginRes?.token;
      }

      if (!token) {
        setJoinError('Could not authenticate. Please try again.');
        setJoining(false);
        return;
      }

      const giveawayId = prize.giveawayId || data?.current?._id;
      const prizeMongoId = prize._id || prize.id;
      const isValidMongoId = (val) => /^[a-f0-9]{24}$/i.test(String(val || ''));

      if (!isValidMongoId(giveawayId) || !isValidMongoId(prizeMongoId)) {
        setJoinError('This prize isn\'t linked to a live giveaway on the backend yet, so it can\'t be joined right now.');
        setJoining(false);
        return;
      }

      const deviceHash = getDeviceHash();

      const result = await joinGiveawayApi(giveawayId, prizeMongoId, token, deviceHash);

      if (!result) {
        setJoinError('Network error. Please try again.');
        setJoining(false);
        return;
      }

      if (result.message && result.message.toLowerCase().includes('insufficient')) {
        setJoinError(result.message);
        setJoining(false);
        return;
      }

      if (result.message && result.message.toLowerCase().includes('already')) {
        setAlreadyJoined(true);
        setShowConfirmModal(false);
        setJoining(false);
        return;
      }

      if (result.participation || result.newBalance !== undefined) {
        if (result.newBalance !== undefined) setLiveBalance(result.newBalance);
        setJoinSuccess(true);
        setAlreadyJoined(true);
        setShowConfirmModal(false);
      } else {
        setJoinError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setJoinError('Something went wrong. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/giveaway" className={styles.backNav}>
          <FaArrowLeft /> Giveaway Home
        </Link>

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>EXCLUSIVE GIVEAWAY</span>
            <h1 className={styles.title}>Win an {prize.name}</h1>
            <p className={styles.description}>{prize.description}</p>
            <span className={styles.statusBadge}>GIVEAWAY LIVE</span>
          </div>
          <div className={styles.heroImage}>
            <img src={prize.image} alt={prize.name} />
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Winners:</span>
            <span className={styles.infoValue}>{prize.winnerCount}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Participants:</span>
            <span className={styles.infoValue}>{prize.participants}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Ends in:</span>
            <span className={styles.infoValue}>{prize.remainingTime}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Entry Fee:</span>
            <span className={styles.infoValue}>
              <FaCoins /> {prize.entryFee} {prize.currency}
            </span>
          </div>
        </div>

        <div className={styles.balanceCard}>
          <div className={styles.balanceRow}>
            <span>Your Balance:</span>
            <span className={styles.balanceAmount}>{userBalance} {prize.currency}</span>
          </div>
          <div className={styles.balanceRow}>
            <span>Entry Fee:</span>
            <span>{prize.entryFee} {prize.currency}</span>
          </div>

          {hasSufficientBalance ? (
            <div className={styles.successMsg}>
              <FaCheckCircle /> You have enough {prize.currency}
            </div>
          ) : (
            <div className={styles.errorMsg}>
              <FaExclamationTriangle /> Insufficient {prize.currency}. You need {prize.entryFee - userBalance} more {prize.currency} to participate.
            </div>
          )}
        </div>

        {joinError && (
          <div className={styles.errorMsg} style={{ marginBottom: '12px' }}>
            <FaExclamationTriangle /> {joinError}
          </div>
        )}

        {alreadyJoined ? (
          <div className={styles.alreadyJoined}>
            <FaCheckCircle /> You're Already Participating
            <p>Your entry has already been recorded.</p>
          </div>
        ) : hasSufficientBalance ? (
          <button className={styles.joinBtn} onClick={handleJoinClick}>
            Join Giveaway - {prize.entryFee} {prize.currency}
          </button>
        ) : (
          <button className={styles.earnBtn}>
            Earn More {prize.currency}
          </button>
        )}

        <section className={styles.howItWorks}>
          <h2>How This Giveaway Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}><span className={styles.stepNum}>01</span><p>Review the giveaway</p></div>
            <div className={styles.step}><span className={styles.stepNum}>02</span><p>Check your eligibility</p></div>
            <div className={styles.step}><span className={styles.stepNum}>03</span><p>Pay the required entry amount</p></div>
            <div className={styles.step}><span className={styles.stepNum}>04</span><p>Your participation is recorded</p></div>
            <div className={styles.step}><span className={styles.stepNum}>05</span><p>Wait until the giveaway ends</p></div>
            <div className={styles.step}><span className={styles.stepNum}>06</span><p>Winner is selected</p></div>
            <div className={styles.step}><span className={styles.stepNum}>07</span><p>Winner claims the prize</p></div>
          </div>
        </section>

        <section className={styles.terms}>
          <h2>Terms & Conditions</h2>
          <ul>
            <li>Eligibility: Must be a registered VELOOP user.</li>
            <li>Entry Requirement: {prize.entryFee} {prize.currency} required.</li>
            <li>Participation: One entry per user per giveaway.</li>
            <li>Winner Selection: Random and transparent selection process.</li>
            <li>Claim Period: Winners must claim within 7 days.</li>
            <li>Disqualification: Fraudulent activity leads to disqualification.</li>
          </ul>
        </section>
      </div>

      {showConfirmModal && (
        <div className={styles.modalOverlay} onClick={() => setShowConfirmModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Participation</h3>
            <p>{prize.name}</p>
            <div className={styles.modalInfo}>
              <span>Entry Fee: {prize.entryFee} {prize.currency}</span>
              <span>Your Balance: {userBalance} {prize.currency}</span>
              <span>After Joining: {userBalance - prize.entryFee} {prize.currency}</span>
            </div>
            <p className={styles.modalNote}>
              By continuing, you confirm that you have reviewed the giveaway rules and terms.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className={styles.confirmBtn} onClick={handleConfirmJoin} disabled={joining}>
                {joining ? 'Joining...' : 'Confirm & Join'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLoginModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Login Required</h3>
            <p>Please login to your VELOOP Rewards account before participating in this giveaway.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowLoginModal(false)}>Close</button>
              <button className={styles.confirmBtn}>Login</button>
            </div>
          </div>
        </div>
      )}

      {joinSuccess && (
        <div className={styles.modalOverlay} onClick={() => setJoinSuccess(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <FaCheckCircle className={styles.successIcon} />
            <h3>You're In!</h3>
            <p>Your participation for the {prize.name} giveaway has been successfully recorded.</p>
            <p>Entry Fee: {prize.entryFee} {prize.currency}</p>
            <p>Good luck!</p>
            <button className={styles.closeModalBtn} onClick={() => setJoinSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualGiveaway;