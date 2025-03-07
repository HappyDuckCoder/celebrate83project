"use client";

import { getDocuments } from "@/lib/action/room.action";
import React, { useEffect, useState } from "react";

const RevealRoom = () => {
  const [roomId, setRoomId] = useState("");

  const revealId = async () => {
    const rooms = await getDocuments();

    console.log(rooms);
  };

  useEffect(() => {
    revealId();
  }, []);

  return <div>RevealRoom</div>;
};

export default RevealRoom;
