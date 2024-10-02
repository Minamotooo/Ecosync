import { useState } from 'react';
import './Sidebar.css';
import logo from '../assets/global-warming.png'; // Default image
import clickedLogo from '../assets/global-hover.png'; // Image to change when clicked

const Sidebar = () => {
  const [forestIcon, setForestIcon] = useState(logo);

  const handleForestChangeClick = () => {
    // Toggle between the default and clicked logo
    setForestIcon(prevIcon => (prevIcon === logo ? clickedLogo : logo));
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#forest-change" onClick={handleForestChangeClick}>
            <img className='icon' src={forestIcon} alt="Forest Change Icon" />
            <span className="text">Global Warming</span>
          </a>
        </li>
        <li>
        <a href="#forest-change" onClick={handleForestChangeClick}>
            <img className='icon' src={forestIcon} alt="Forest Change Icon" />
            <span className="text">Global Warming</span>
          </a>
        </li>
        <li>
          <a href="#land-use">
            <span className="icon">🌍</span>
            <span className="text">Land Use</span>
          </a>
        </li>
        <li>
          <a href="#climate">
            <span className="icon">🌡️</span>
            <span className="text">Climate</span>
          </a>
        </li>
        <li>
          <a href="#biodiversity">
            <span className="icon">🐾</span>
            <span className="text">Biodiversity</span>
          </a>
        </li>
        <li>
          <a href="#explore">
            <span className="icon">🧭</span>
            <span className="text">Explore</span>
          </a>
        </li>
        <li>
          <a href="#search">
            <span className="icon">🔍</span>
            <span className="text">Search</span>
          </a>
        </li>
        <li>
          <a href="#my-gfw">
            <span className="icon">👤</span>
            <span className="text">My GFW</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
