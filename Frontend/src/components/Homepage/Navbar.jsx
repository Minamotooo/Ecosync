import "./Navbar.css";
import mainlogo from "D:/ECOSYNC/Frontend/src/assets/usd.png";
export default function Map() {
  return (
    <div>
      <header className="navbar--container">
        <div>
          <img className="logooo" src={mainlogo}/>
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
