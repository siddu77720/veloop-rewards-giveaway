// src/components/GiveawayHero/GiveawayHero.jsx
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGift } from 'react-icons/fa';
import { currentGiveaway } from '../../data/giveawayData';
import styles from './GiveawayHero.module.css';

// FIX: this component received a `giveaway` prop from HomePage but ignored it,
// always rendering the static demo description/image even when the backend
// giveaway had loaded successfully. Now it prefers the live data and falls
// back to the static copy (only the description is backend-driven — heroImage
// stays local since the backend doesn't store a hero illustration asset).
const GiveawayHero = ({ giveaway }) => {
  const description = giveaway?.description || currentGiveaway.description;

  return (
    <div className={styles.hero}>
      <div className={styles.heroOverlay}></div>

      {/* Floating Sparkles */}
      <div className={styles.sparkle1}>✦</div>
      <div className={styles.sparkle2}>✦</div>
      <div className={styles.sparkle3}>✦</div>

      <div className={styles.content}>
        {/* Badge */}
        <div className={styles.badge}>
          <FaGift className={styles.badgeIcon} />
          EXCLUSIVE GIVEAWAY
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>
          Giveaway <span className={styles.gradientText}>Rewards</span>
        </h1>

        {/* Description */}
        <p className={styles.description}>
          {description}
        </p>

        {/* CTA Button - Link to /giveaway */}
        <Link to="/giveaway" className={styles.ctaButton}>
          Join Giveaway <FaArrowRight className={styles.ctaIcon} />
        </Link>

        {/* Social Proof - Users Icons + Text */}
        <div className={styles.socialProof}>
          <div className={styles.avatars}>
            <div className={styles.avatar}>A</div>
            <div className={styles.avatar}>R</div>
            <div className={styles.avatar}>S</div>
            <div className={styles.avatar}>+</div>
          </div>
          <span className={styles.socialText}>
            {typeof giveaway?.totalParticipants === 'number'
              ? `${giveaway.totalParticipants.toLocaleString()}+ `
              : `${giveaway?.totalParticipants || '8.5K+'} `}
            Users Participating
          </span>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className={styles.illustration}>
        <div className={styles.illustrationGlow}></div>
        {/* FIX (blur bug): the float animation now lives on this wrapper,
           while the drop-shadow filter stays on the <img> alone. Animating
           `transform` and `filter` on the *same* element forces the browser
           to re-rasterize the filter every frame at sub-pixel offsets, which
           is what made the hero image look soft/blurry while floating. */}
        <div className={styles.illustrationFloat}>
          <img
            src={currentGiveaway.heroImage}
            alt="Giveaway Rewards"
            className={styles.illustrationImage}
            width={900}
            height={600}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};

export default GiveawayHero;