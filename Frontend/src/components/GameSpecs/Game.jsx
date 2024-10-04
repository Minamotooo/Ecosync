import { ThreeDCardDemo } from "../Homepage/ThreeDCardDemo";
import { ThreeDCard2 } from "../Homepage/ThreeDCard2";
import { ThreeDCard3 } from "../Homepage/ThreeDCard3";
import Navbar from "F:/ECOSYNC/Ecosync/Frontend/src/components/Homepage/Navbar";
import "./Game.css";
import { ThreeDCard4 } from "../Homepage/ThreeDCard4";
import { ThreeDCard5 } from "../Homepage/ThreeDCard5";
import { ThreeDCard6 } from "../Homepage/ThreeDCard6";
import About from "../Homepage/About";
export default function Game() {
    return (
        <div className="game">
            <Navbar />
            <h1 className="game-title">Games</h1>
            <div className="game-container">
                <div className="game-card">
                    <ThreeDCardDemo />
                </div>
                <div className="game-card">
                    <ThreeDCard2 />
                </div>
                <div className="game-card">
                    <ThreeDCard3 />
                </div>
                <div className="game-card">
                    <ThreeDCard4 />
                </div>
                <div className="game-card">
                    <ThreeDCard5 />
                </div>
                <div className="game-card">
                    <ThreeDCard6 />
                </div>
            </div>
            <About className="game-footer"/>
        </div>
    );
}
