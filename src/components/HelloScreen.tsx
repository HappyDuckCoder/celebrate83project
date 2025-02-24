"use client";

import React from "react";
import Lottie from "lottie-react";
import helloAnimation from "../../public/json/flower.json";

const HelloScreen = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center">
        <Lottie
          animationData={helloAnimation}
          loop
          className="w-40 h-40 md:w-64 md:h-64"
        />
      </div>
    </div>
  );
};

export default HelloScreen;
