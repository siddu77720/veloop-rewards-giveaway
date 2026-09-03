// src/components/WinnerSlider/WinnerSlider.jsx
import { useState, useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa';
import styles from './WinnerSlider.module.css';

const messages = [
  "VE****21 won an iPhone 15 Pro!",
  "VE****83 won an Apple Watch!",
  "VE****54 won AirPods Pro!",
  "VE****92 won an Amazon Gift Card!"
];

const WinnerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Winner Announcements</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.slide}>
          <FaTrophy className={styles.icon} />
          <p className={styles.message}>{messages[currentIndex]}</p>
        </div>
        <div className={styles.dots}>
          {messages.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WinnerSlider;