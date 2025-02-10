"use client";

import { useState } from "react";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
} from "@liveblocks/react/suspense";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { Input } from "./ui/input";
import Loading from "./Loading";
import FloatingWishes from "./FloatingWish";
import PickFlower from "./PickFlower";

function WhoIsHere() {
  const userCount = useOthers((others) => others.length);
  return (
    <div className="text-sm text-gray-500">
      Đang có {userCount + 1} người trong phòng này.
    </div>
  );
}

function SomeoneIsTyping() {
  const someoneIsTyping = useOthers((others) =>
    others.some((other) => other.presence.isTyping)
  );

  return (
    <div className="text-sm text-gray-500">
      {someoneIsTyping ? "Ai đó đang ghi chú..." : ""}
    </div>
  );
}

function RoomContent({ title }: { title: string }) {
  const [draft, setDraft] = useState("");
  const [flowerPick, setFlowerPick] = useState(1);
  const updateMyPresence = useUpdateMyPresence();
  const wish = useStorage((root) => root.wish);

  console.log(wish);

  const addWish = useMutation(({ storage }, text, imgIndex) => {
    storage.get("wish").push(new LiveObject({ text, imgIndex }));
  }, []);

  const deleteWish = useMutation(({ storage }, index) => {
    storage.get("wish").delete(index);
  }, []);

  return (
    <div className="container flex flex-col space-y-4 p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <WhoIsHere />
      <SomeoneIsTyping />

      <Input
        type="text"
        placeholder="Lời hay ý đẹp"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          updateMyPresence({ isTyping: true });
        }}
        onKeyDown={(e) => {
          if (draft && e.key === "Enter") {
            updateMyPresence({ isTyping: false });
            addWish(draft, flowerPick);
            setDraft("");
          }
        }}
        onBlur={() => updateMyPresence({ isTyping: false })}
        className="border border-gray-300 p-2 rounded-md"
      />

      <PickFlower flowerPick={flowerPick} setFlowerPick={setFlowerPick} />

      <FloatingWishes
        wishes={wish.map((w) => ({ text: w.text, imgIndex: w.imgIndex }))}
        onDelete={deleteWish}
      />
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
        <RoomContent title={roomMetadata.title} />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
