// src/components/Countdown/Countdown.jsx
import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Agar endDate invalid hai, toh 0 return karo
      if (!endDate || isNaN(new Date(endDate).getTime())) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const difference = new Date(endDate) - new Date();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const pad = (num) => num.toString().padStart(2, '0');

  return (
    <div className={styles.timer}>
      <span className={styles.timeValue}>{pad(timeLeft.days)}</span>
      <span className={styles.timeSeparator}>:</span>
      <span className={styles.timeValue}>{pad(timeLeft.hours)}</span>
      <span className={styles.timeSeparator}>:</span>
      <span className={styles.timeValue}>{pad(timeLeft.minutes)}</span>
      <span className={styles.timeSeparator}>:</span>
      <span className={styles.timeValue}>{pad(timeLeft.seconds)}</span>
    </div>
  );
};

export default Countdown;