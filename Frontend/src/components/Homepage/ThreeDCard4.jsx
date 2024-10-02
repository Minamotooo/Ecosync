import React from "react";
import Cascade from "D:/ECOSYNC/Frontend/src/assets/Ocean_Odyssey.jpg";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function ThreeDCard4() {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-gray-300 border w-auto sm:w-[30rem] h-auto rounded-xl p-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        
        <CardItem translateZ={100} className="w-full mt-2 relative">
          <img
            src={Cascade}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />

          {/* Overlay with description */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
          <p className="text-white text-center text-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Climate Cascade - A Beautiful Flow of Nature</p>
          </div>
        </CardItem>

        <div className="flex justify-between items-center mt-6">
          {/* Add any extra content if needed */}
        </div>
      </CardBody>
    </CardContainer>
  );
}
