"use client";

import { useState, useCallback } from "react";
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
import { Button } from "./ui/button";

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

  const addWish = useMutation(({ storage }, text, imgIndex) => {
    storage.get("wish").push(new LiveObject({ text, imgIndex }));
  }, []);

  const deleteWish = useMutation(({ storage }, index) => {
    storage.get("wish").delete(index);
  }, []);

  const addWishByButton = () => {
    if (!draft) return;
    addWish(draft, flowerPick);
    setDraft("");
  };

  const generateWish = useCallback(async () => {
    try {
      const response = await fetch("/api/getGenerateWish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) return;
      const data = await response.json();

      setDraft(data.Wish[0]); // Cập nhật state nhưng không ảnh hưởng đến render
    } catch (error) {
      console.error("Error fetching AI wish:", error);
    }
  }, []);

  return (
    <div className="container flex flex-col space-y-4 p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <WhoIsHere />
      <SomeoneIsTyping />

      <div className="flex space-x-2">
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
        <Button onClick={addWishByButton}>Khen đi</Button>
        <Button onClick={generateWish}>Nhờ AI giúp khum</Button>
      </div>

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
      initialPresence={{ isTyping: false }}
      initialStorage={{ wish: new LiveList([]) }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        <RoomContent title={roomMetadata.title} />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
