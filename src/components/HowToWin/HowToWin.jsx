// src/components/HowToWin/HowToWin.jsx
import { FaArrowRight } from 'react-icons/fa';
import clipboardImage from '../../assets/clipboard.png';
import ticketImage from '../../assets/ticket.png';
import giftboxImage from '../../assets/giftbox.png';
import trophyImage from '../../assets/trophy.png';
import { useInView } from '../../hooks/useInView';
import styles from './HowToWin.module.css';

const HowToWin = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  const steps = [
    {
      id: 1,
      image: clipboardImage,
      title: 'Complete Tasks',
    },
    {
      id: 2,
      image: ticketImage,
      title: 'Earn Entries',
    },
    {
      id: 3,
      image: giftboxImage,
      title: 'Participate & Get Lucky',
    },
    {
      id: 4,
      image: trophyImage,
      title: 'Win Rewards',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isInView ? styles.inView : ''}`}
    >
      <div className={styles.titleWrap}>
        <span className={styles.eyebrow}>Simple &amp; Fair</span>
        <h2 className={styles.title}>How to Win?</h2>
      </div>

      {/* Animated connector line behind the steps (desktop only) */}
      <div className={styles.trackLine} aria-hidden="true">
        <div className={styles.trackFill}></div>
      </div>

      <div className={styles.stepsGrid}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={styles.stepWrapper}
            style={{ '--delay': `${index * 0.12}s` }}
          >
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.id}</span>

              <div className={styles.stepIcon}>
                <span className={styles.stepIconGlow} aria-hidden="true"></span>
                <img
                  src={step.image}
                  alt={step.title}
                  className={styles.stepImage}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className={styles.stepTitle}>{step.title}</h3>
            </div>

            {/* Arrow - sirf desktop par dikhega */}
            {index < steps.length - 1 && (
              <div className={styles.arrowIcon} aria-hidden="true">
                <FaArrowRight />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToWin;