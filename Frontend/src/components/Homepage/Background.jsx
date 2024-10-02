import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import Feature from "./Feature";

export default function Background() {
  return (
    <div className="relative h-[40rem] w-full rounded-md bg-white flex items-center justify-center">
      {/* BackgroundBeams with lower z-index */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams beamColor="#F0F0F0" lineColor="#00A3FF" />
      </div>

      {/* Feature with higher z-index to overlap BackgroundBeams */}
      <div className="relative z-1">
        <Feature />
      </div>
    </div>
  );
}
