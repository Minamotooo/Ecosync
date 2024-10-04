import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Cesium from "F:/ECOSYNC/Ecosync/Frontend/src/components/Cesium"; // Import your Cesium component
import Game from "./components/GameSpecs/Game";
import ClimateCascade from "./components/Games/ClimateCascade/ClimateCascade";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Main page */}
        <Route path="/map" element={<Cesium />} /> {/* Cesium page */}
        <Route path="/games" element={<Game />} /> {/* Cesium page */}
        <Route path="/climatecascade" element={<ClimateCascade />} />
      </Routes>
    </Router>
  );
}

export default App;
