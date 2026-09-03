// src/components/PrizeClaimModal/PrizeClaimModal.jsx
import { useState } from 'react';
import {
  FaTimes, FaCheckCircle, FaHourglassHalf, FaTruck, FaExclamationTriangle,
  FaGift, FaUser, FaPhone, FaMapMarkerAlt, FaCity, FaMapPin, FaEnvelope
} from 'react-icons/fa';
import { submitClaim } from '../../services/api';
import { getToken } from '../../services/auth';
import styles from './PrizeClaimModal.module.css';

// winner prop: { id / _id, prizeName, claimType }
const PrizeClaimModal = ({ prize, winner, onClose }) => {
  const [claimState, setClaimState] = useState('not_submitted');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '', city: '', state: '', pin: '', email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const winnerId = winner?._id || winner?.id;
    if (!winnerId) {
      setErrorMsg('Winner record not found. Please refresh and try again.');
      setSubmitting(false);
      return;
    }

    const token = getToken();
    const result = await submitClaim(winnerId, { claimType: prize?.claimType || 'PHYSICAL', ...formData }, token);

    setSubmitting(false);

    if (!result) {
      setErrorMsg('Network error. Please try again.');
      return;
    }
    if (result.message && !result._id) {
      setErrorMsg(result.message);
      return;
    }

    setClaimState('submitted');
  };

  const getStateContent = () => {
    switch (claimState) {
      case 'submitted':
        return { icon: <FaCheckCircle className={styles.successIcon} />, title: 'Claim Submitted', message: 'Our team will process your prize and reach out to you shortly.', closeText: 'Close', tone: 'success' };
      case 'processing':
        return { icon: <FaHourglassHalf className={styles.processingIcon} />, title: 'Prize Verification In Progress', message: 'We are verifying your claim details. This usually takes 24-48 hours.', closeText: 'Close', tone: 'processing' };
      case 'completed':
        return { icon: <FaTruck className={styles.completedIcon} />, title: 'Prize Delivered', message: 'Congratulations! Your prize has been shipped successfully.', closeText: 'Close', tone: 'success' };
      case 'expired':
        return { icon: <FaExclamationTriangle className={styles.expiredIcon} />, title: 'Claim Window Expired', message: 'Unfortunately, your claim window has expired. Please contact support if you believe this is an error.', closeText: 'Close', tone: 'expired' };
      default:
        return null;
    }
  };

  const stateContent = getStateContent();

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}><FaTimes /></button>

        {claimState === 'not_submitted' && (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.headerIconWrap}>
                <div className={styles.headerGlow}></div>
                <FaGift className={styles.headerIcon} />
              </div>
              <span className={styles.headerBadge}>PRIZE CLAIM</span>
              <h2>Claim Your Prize</h2>
              <p>You won <strong>{prize?.name}</strong>! Fill in your details below.</p>
            </div>

            {errorMsg && (
              <div className={styles.inlineError}>
                <FaExclamationTriangle /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className={styles.inputWrapper}>
                <FaPhone className={styles.inputIcon} />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className={styles.inputWrapper}>
                <FaMapMarkerAlt className={styles.inputIcon} />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <FaCity className={styles.inputIcon} />
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                </div>
                <div className={styles.inputWrapper}>
                  <FaMapMarkerAlt className={styles.inputIcon} />
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                </div>
                <div className={styles.inputWrapper}>
                  <FaMapPin className={styles.inputIcon} />
                  <input type="text" name="pin" placeholder="PIN" value={formData.pin} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Claim'}
              </button>
              <p className={styles.secureNote}>🔒 Your information is encrypted and only used to deliver your prize.</p>
            </form>
          </>
        )}

        {stateContent && (
          <div className={styles.stateContent}>
            <div className={`${styles.stateIconWrap} ${styles[stateContent.tone]}`}>
              {stateContent.icon}
            </div>
            <h2>{stateContent.title}</h2>
            <p>{stateContent.message}</p>
            <button className={styles.closeModalBtn} onClick={onClose}>{stateContent.closeText}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrizeClaimModal;