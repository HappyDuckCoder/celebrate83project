"use client";

import { useState } from "react";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
} from "@liveblocks/react/suspense";
import "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Loading from "./Loading";

function WhoIsHere() {
  const userCount = useOthers((others) => others.length);

  return (
    <div className="who_is_here">Đang có {userCount + 1} người đang ở đây</div>
  );
}

function SomeoneIsTyping() {
  const someoneIsTyping = useOthers((others) =>
    others.some((other) => other.presence.isTyping)
  );

  return (
    <div className="someone_is_typing">
      {someoneIsTyping ? "Ai đó đang ghi chú..." : ""}
    </div>
  );
}

function RoomContent() {
  const [draft, setDraft] = useState("");
  const updateMyPresence = useUpdateMyPresence();
  const wish = useStorage((root) => root.wish);

  const addWish = useMutation(({ storage }, text) => {
    storage.get("wish").push(new LiveObject({ text }));
  }, []);

  const deleteWish = useMutation(({ storage }, index) => {
    storage.get("wish").delete(index);
  }, []);

  return (
    <div className="container">
      <WhoIsHere />
      <SomeoneIsTyping />
      <Input
        type="text"
        placeholder="Lời chúc của bạn"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          updateMyPresence({ isTyping: true });
        }}
        onKeyDown={(e) => {
          if (draft && e.key === "Enter") {
            updateMyPresence({ isTyping: false });
            addWish(draft);
            setDraft("");
          }
        }}
        onBlur={() => updateMyPresence({ isTyping: false })}
      />

      {wish.map((todo, index) => {
        return (
          <div key={index} className="todo_container">
            <div className="todo">
              <span>{todo.text}</span>
            </div>
            <Button className="delete_button" onClick={() => deleteWish(index)}>
              ✕
            </Button>
          </div>
        );
      })}
    </div>
  );
}

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: {
  roomId: string;
  roomMetadata: any;
}) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        isTyping: false,
      }}
      initialStorage={{ wish: new LiveList([]) }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        <div>{roomMetadata.title}</div>
        <RoomContent />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
