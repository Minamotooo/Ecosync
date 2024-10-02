import "./Menu.css";
import i from "../assets/info.png";
import mainlogo from "../assets/main-logo.png";
export default function Map() {
  return (
    <div>
      <header className="navbar--container">
        <div>
          <img className="logo" src={mainlogo}/>
        </div>
        <nav className="nav--Menu">
          <a className="navItem">Map</a>
          <a className="navItem">Games</a>
          <a className="navItem">Help</a>
          <a className="navItem">About Us</a>
        </nav>
      </header>
    </div>
  );
}
