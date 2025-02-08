import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: {
  roomId: string;
  roomMetadata: any;
}) => {
  const [message, setMessage] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(message);
  };
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={"Loading..."}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input w-[200px] bg-slate-950 text-slate-50"
        />
        <Button
          type="submit"
          className="bg-slate-950 text-slate-50"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
