// src/components/HowToParticipate/HowToParticipate.jsx
import { FaUserPlus, FaTasks, FaCoins, FaTrophy } from 'react-icons/fa';
import styles from './HowToParticipate.module.css';

const steps = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "Sign Up / Login",
    description: "Create your account or login to participate."
  },
  {
    id: 2,
    icon: <FaTasks />,
    title: "Complete Tasks",
    description: "Complete eligible activities to earn entries."
  },
  {
    id: 3,
    icon: <FaCoins />,
    title: "Earn Entries",
    description: "Collect entries for each eligible task."
  },
  {
    id: 4,
    icon: <FaTrophy />,
    title: "Win Rewards",
    description: "Wait for the giveaway to end and win big!"
  }
];

const HowToParticipate = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>How to Participate?</h2>
      
      <div className={styles.stepsGrid}>
        {steps.map((step) => (
          <div key={step.id} className={styles.stepCard}>
            <div className={styles.stepNumber}>0{step.id}</div>
            <div className={styles.iconWrapper}>
              {step.icon}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToParticipate;