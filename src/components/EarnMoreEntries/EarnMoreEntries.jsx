// src/components/EarnMoreEntries/EarnMoreEntries.jsx
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import ticketImage from '../../assets/ticket.png'; // Ticket image import
import styles from './EarnMoreEntries.module.css';

const EarnMoreEntries = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        {/* Left Side - Ticket Icon (Transparent + Floating) */}
        <div className={styles.iconWrapper}>
          <img
            src={ticketImage}
            alt="Ticket"
            className={styles.ticketImage}
            width={56}
            height={56}
            decoding="async"
          />
        </div>

        {/* Middle - Text */}
        <div className={styles.textContent}>
          <h2 className={styles.title}>Earn More Entries</h2>
          <p className={styles.subtitle}>Complete simple tasks and earn more entries for your favorite giveaways.</p>
        </div>

        {/* Right Side - Explore Activities Button */}
        <div className={styles.buttonContainer}>
          <Link to="/tasks" className={styles.exploreBtn}>
            Explore Activities <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EarnMoreEntries;