"use client";

import React, { createContext, useContext, useState } from "react";

type BackgroundContextType = {
  backgroundImage: string;
  setBackgroundImage: (url: string) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export const BackgroundProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backgroundImage, setBackgroundImage] = useState("/png/bg.png");

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      <div className="flex items-center justify-center w-screen h-full">
        {children}
      </div>
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
