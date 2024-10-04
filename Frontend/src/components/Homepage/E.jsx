import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./E.css";
import earth from "F:/ECOSYNC/Ecosync/Frontend/src/assets/usd.png";

export default function E() {
    const navigate = useNavigate(); // Initialize navigate

    const handleButtonClick = () => {
        navigate("/map"); // Replace "/new-page" with the desired path
    };

    return (
        <div className="earth">
            {/* Background video */}
            <video className="background-video" autoPlay loop muted>
                <source src='Videos/BG.mp4' type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Earth image and content */}
            <img src={earth} className="hero-img" alt="Earth" />
            <p className="hero-subtitle">
                Discover our world
            </p>
            <button className="get-started-btn" onClick={handleButtonClick}>Get Started</button>
        </div>
    );
}
