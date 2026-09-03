// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BottomNav from './components/BottomNav/BottomNav';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/HomePage';
import GiveawaysPage from './pages/GiveawaysPage';
import IndividualGiveaway from './pages/IndividualGiveaway';
import TasksPage from './pages/TasksPage';
import WinnersPage from './pages/WinnersPage';
import EarnPage from './pages/EarnPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      {/* Resets window scroll to top on every route change - without this,
          navigating away from a page scrolled halfway down (e.g. Home) opens
          the next page still scrolled to the same offset. */}
      <ScrollToTop />
      <div className="app-wrapper">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/giveaway" element={<GiveawaysPage />} />
            <Route path="/giveaway/:prizeId" element={<IndividualGiveaway />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/winners" element={<WinnersPage />} />
            <Route path="/earn" element={<EarnPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;