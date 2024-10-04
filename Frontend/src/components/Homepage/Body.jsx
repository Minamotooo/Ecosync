import './Body.css';

const Body = () => {
  return (
    <div className="hero-container">
      <video className="background-video" autoPlay loop muted>
        <source src="https://videos.pexels.com/video-files/10343918/10343918-hd_1920_1080_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1 className="hero-title">ECOSYNC/Ecosync</h1>
        <p className="hero-subtitle">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        <button className="get-started-btn">Get Started</button>
      </div>
    </div>
  );
};

export default Body;
