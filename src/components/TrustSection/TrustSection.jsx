// src/components/TrustSection/TrustSection.jsx
import { FaShieldAlt, FaLock, FaUsers, FaEye } from 'react-icons/fa';
import { useInView } from '../../hooks/useInView';
import styles from './TrustSection.module.css';

const TrustSection = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  const trustPoints = [
    {
      icon: <FaEye />,
      title: '100% Transparent',
      description: 'Giveaway rules are clearly displayed.',
      tone: 'purple',
    },
    {
      icon: <FaLock />,
      title: 'Secure',
      description: 'User information is handled responsibly.',
      tone: 'gold',
    },
    {
      icon: <FaUsers />,
      title: 'Fair Participation',
      description: 'Participation rules are clearly explained.',
      tone: 'pink',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Reward Transparency',
      description: 'Prize information is clearly displayed.',
      tone: 'green',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isInView ? styles.inView : ''}`}
    >
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>Why Trust VELOOP Rewards?</h2>
        <p className={styles.subtitle}>Built on transparency, security and fair play.</p>
      </div>

      <div className={styles.grid}>
        {trustPoints.map((point, index) => (
          <div
            key={index}
            className={`${styles.trustCard} ${styles[point.tone]}`}
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <span className={styles.cardShine} aria-hidden="true"></span>
            <div className={styles.iconWrapper}>
              <span className={styles.iconRing} aria-hidden="true"></span>
              {point.icon}
            </div>
            <h3 className={styles.cardTitle}>{point.title}</h3>
            <p className={styles.cardDesc}>{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;