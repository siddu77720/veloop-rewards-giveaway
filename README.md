
## Component Architecture

Each UI component lives in its own folder with a `.jsx` file and a scoped `.module.css` file (e.g. `components/PrizeCard/PrizeCard.jsx` + `PrizeCard.module.css`), keeping styles isolated per component.

## Responsive Design

Layouts adapt across desktop, tablet, and mobile breakpoints using CSS Modules and a mobile bottom navigation bar for small screens.

## Animation Details

Scroll-triggered reveal animations (via `useInView` hook), countdown ticking animation, and winner reveal/slider transitions.

## Mock Data Structure

Sample giveaway/prize data used for local development lives in `src/data/giveawayData.js`, mirroring the shape returned by the backend API.

## Future Backend Integration

The backend is already integrated (this is a full-stack app) — future enhancements could include real payment/entry-purchase flows, admin dashboard UI, and automated winner selection.


## Live Demo

https://veloop-app.vercel.app/