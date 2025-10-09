import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/portfolio/:id" element={<PortfolioPage />} />
    </Routes>
  );
}

export default App;
