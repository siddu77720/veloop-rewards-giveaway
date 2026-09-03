// src/components/BottomNav/BottomNav.jsx
import { FaHome, FaTasks, FaPlus, FaCoins, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { id: 'home', icon: <FaHome />, label: 'Home', path: '/' },
    { id: 'tasks', icon: <FaTasks />, label: 'Tasks', path: '/tasks' },
    { id: 'plus', icon: <FaPlus />, label: '', path: '/giveaway', isCenter: true },
    { id: 'earn', icon: <FaCoins />, label: 'Earn', path: '/earn' },
    { id: 'profile', icon: <FaUser />, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.id} 
            to={item.path} 
            className={`${styles.navItem} ${item.isCenter ? styles.centerBtn : ''} ${isActive ? styles.active : ''}`}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            {!item.isCenter && <span className={styles.label}>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;