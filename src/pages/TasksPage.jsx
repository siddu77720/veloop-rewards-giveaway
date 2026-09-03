// src/pages/TasksPage.jsx
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import clipboardImage from '../assets/clipboard.png';
import ticketImage from '../assets/ticket.png';
import giftboxImage from '../assets/giftbox.png';
import megaphoneImage from '../assets/megaphone.png';
import styles from './TasksPage.module.css';

const TasksPage = () => {
  const tasks = [
    {
      id: 1,
      icon: clipboardImage,
      title: "Complete Daily Task",
      description: "Complete your daily check-in task.",
      reward: "+50 Entries"
    },
    {
      id: 2,
      icon: ticketImage,
      title: "Earn Entries",
      description: "Watch a video to earn bonus entries.",
      reward: "+20 Entries"
    },
    {
      id: 3,
      icon: giftboxImage,
      title: "Participate & Get Lucky",
      description: "Join a giveaway to get lucky.",
      reward: "+100 Entries"
    },
    {
      id: 4,
      icon: megaphoneImage,
      title: "Share & Earn",
      description: "Share the platform to earn entries.",
      reward: "+30 Entries"
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backBtn}>
          <FaArrowLeft /> Home
        </Link>
        
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <img src={clipboardImage} alt="Tasks" className={styles.iconImage} width={60} height={60} decoding="async" />
          </div>
          <h1 className={styles.title}>Tasks</h1>
          <p className={styles.subtitle}>Complete tasks here to earn more entries.</p>
        </div>
        
        <div className={styles.tasksList}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskIcon}>
                <img src={task.icon} alt={task.title} className={styles.taskImage} decoding="async" />
              </div>
              <div className={styles.taskInfo}>
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <p className={styles.taskDesc}>{task.description}</p>
                <span className={styles.taskReward}>{task.reward}</span>
              </div>
              <button className={styles.taskBtn}>Complete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;