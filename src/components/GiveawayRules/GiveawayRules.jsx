// src/components/GiveawayRules/GiveawayRules.jsx
import {
  FaUserCheck,
  FaTicketAlt,
  FaRandom,
  FaClock,
  FaBan,
  FaCheckCircle,
} from 'react-icons/fa';
import { giveawayRules } from '../../data/giveawayData';
import { useInView } from '../../hooks/useInView';
import styles from './GiveawayRules.module.css';

// Each rule string in giveawayData.js is written as "Label: description."
// We split it here into a title + description, and pick a themed icon that
// matches the label so every rule is visually distinct instead of repeating
// the same checkmark four times.
const ICONS_BY_KEYWORD = [
  { match: /eligib/i, icon: FaUserCheck, tone: 'purple' },
  { match: /particip/i, icon: FaTicketAlt, tone: 'gold' },
  { match: /winner|selection/i, icon: FaRandom, tone: 'pink' },
  { match: /claim/i, icon: FaClock, tone: 'green' },
  { match: /disqualif/i, icon: FaBan, tone: 'red' },
];

const parseRule = (rule) => {
  const separatorIndex = rule.indexOf(':');
  if (separatorIndex === -1) {
    return { title: rule, description: '' };
  }
  return {
    title: rule.slice(0, separatorIndex).trim(),
    description: rule.slice(separatorIndex + 1).trim(),
  };
};

const getIconMeta = (title) => {
  const found = ICONS_BY_KEYWORD.find((entry) => entry.match.test(title));
  return found || { icon: FaCheckCircle, tone: 'purple' };
};

const GiveawayRules = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isInView ? styles.inView : ''}`}
    >
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Giveaway Rules &amp; Guidelines</h2>
        <span className={styles.readBadge}>
          <span className={styles.readDot}></span>
          Please read carefully
        </span>
      </div>

      <div className={styles.rulesList}>
        <span className={styles.scanLine} aria-hidden="true"></span>

        {giveawayRules.map((rule, index) => {
          const { title, description } = parseRule(rule);
          const { icon: Icon, tone } = getIconMeta(title);

          return (
            <div
              key={index}
              className={styles.ruleItem}
              style={{ '--delay': `${index * 0.08}s` }}
            >
              <span className={`${styles.ruleIconWrap} ${styles[tone]}`}>
                <Icon className={styles.ruleIcon} />
              </span>
              <div className={styles.ruleTextWrap}>
                <h3 className={styles.ruleTitle}>{title}</h3>
                {description && <p className={styles.ruleText}>{description}</p>}
              </div>
              <span className={styles.ruleIndex}>{String(index + 1).padStart(2, '0')}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GiveawayRules;