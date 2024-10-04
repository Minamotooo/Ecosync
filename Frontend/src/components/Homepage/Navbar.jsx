import "./Navbar.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import mainlogo from "F:/ECOSYNC/Ecosync/Frontend/src/assets/usd.png"; // Adjust the path as necessary

export default function Navbar() {
  return (
    <div>
      <header className="navbar--container">
        <div>
          <Link to="/"> {/* Link to home page */}
            <img className="logooo" src={mainlogo} alt="Logo" />
          </Link>
        </div>
        <nav className="nav--Menu">
          <Link to="/map" className="navItem">Map</Link>
          <Link to="/games" className="navItem">Games</Link>
          <Link to="/help" className="navItem">Help</Link>
          <Link to="/about" className="navItem">About Us</Link>
        </nav>
      </header>
    </div>
  );
}
