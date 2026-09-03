// src/hooks/useInView.js
import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight scroll-reveal hook built on IntersectionObserver.
 * No extra dependency needed (project has no framer-motion installed) -
 * used by HowToWin, GiveawayRules and TrustSection to stagger their
 * entrance animation as the user scrolls the section into view.
 *
 * Usage:
 *   const [ref, isInView] = useInView({ threshold: 0.2 });
 *   <section ref={ref} className={isInView ? styles.inView : ''}>
 */
// Checked once at module load, not inside the effect - keeps the effect
// body free of a synchronous setState call (react-hooks/set-state-in-effect).
const supportsIntersectionObserver = typeof IntersectionObserver !== 'undefined';

export const useInView = ({ threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = {}) => {
  const ref = useRef(null);
  // Lazy initializer: environments without IntersectionObserver start
  // already "in view" so content isn't stuck hidden - no setState needed
  // inside the effect for that fallback path anymore.
  const [isInView, setIsInView] = useState(() => !supportsIntersectionObserver);

  useEffect(() => {
    if (!supportsIntersectionObserver) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
};

export default useInView;