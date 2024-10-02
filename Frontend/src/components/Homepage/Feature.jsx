import { ThreeDCardDemo } from "./ThreeDCardDemo";
import { ThreeDCard2 } from "./ThreeDCard2"
import {ThreeDCard3 } from "./ThreeDCard3"
import New from "./New";
import New2 from "./New2";
import './Feature.css'

export default function Feature() {
    return (
        <div className="main" >
            <h3 className="feature-text">OUR FEATURES</h3>
        <div className="feature-container">
            <New />
            <New2 />
            {/* <ThreeDCardDemo />
            <ThreeDCard2 />
            <ThreeDCard3 /> */}
        </div>
        </div>
    )
}