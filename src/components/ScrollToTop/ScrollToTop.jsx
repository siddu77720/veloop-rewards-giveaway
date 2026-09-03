// src/components/ScrollToTop/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does NOT reset scroll position on navigation by default
 * (unlike a traditional multi-page site). Without this, clicking a link
 * while scrolled 60% down the homepage opens the next page still scrolled
 * 60% down, because the browser just keeps the same window scroll offset.
 *
 * Render this once, inside <Router>, above/alongside <Routes>. It has no
 * visible output - it just watches the URL and scrolls back to the top
 * every time the pathname changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;