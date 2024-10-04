import Footer from "../Footer/Footer";
import "./About.css";
import logo from 'F:/ECOSYNC/Ecosync/Frontend/src/assets/usd.png';

export default function About() {
  return (
    <div className="about">
      <div className="about-container">
        {/* ECOSYNC/Ecosync logo */}
        <div className="logo-section">
          <img src={logo} className="logo-img" alt="ECOSYNC/Ecosync Logo" />
        </div>

        {/* About Us section */}
        <div className="center-section">
            <h3>About Us</h3>
            <Footer className="footer" />
        </div>

        {/* BUET ASTRONOVA Section */}
        <div className="astronova-section">
          <h1 className="astronova-text">BUET ASTRONOVA</h1>
        </div>
      </div>

      
    </div>
  );
}
