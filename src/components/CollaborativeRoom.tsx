"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: {
  roomId: string;
  roomMetadata: any;
}) => {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(message);
  };
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        <div>{roomMetadata.title}</div>
      </ClientSideSuspense>
    </RoomProvider>
    // <div>hey</div>
  );
};

export default CollaborativeRoom;
