"use client";

import { getRoomBackground } from "@/lib/action/room.action";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const params = useParams();
  const roomId = params.id as string;

  useEffect(() => {
    if (!roomId) return;

    const fetchBackground = async () => {
      const bgUrl = (await getRoomBackground(roomId)) as string;
      if (bgUrl) setBackgroundImage(bgUrl);
    };

    fetchBackground();
  }, [roomId]);
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
