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
      👥 {userCount + 1} người đang ở đây.
    </div>
  );
}

function SomeoneIsTyping() {
  const someoneIsTyping = useOthers((others) =>
    others.some((other) => other.presence.isTyping)
  );
  return (
    <div className="text-sm text-gray-500">
      {someoneIsTyping && "✍ Ai đó đang ghi chú..."}
    </div>
  );
}

function RoomContent({ title }: { title: string }) {
  const [draft, setDraft] = useState("");
  const [flowerPick, setFlowerPick] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
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
    setLoadingAI(true);
    setDraft("");

    try {
      const response = await fetch("/api/getGenerateWish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) return;
      const data = await response.json();

      // Hiển thị từng ký tự từ từ
      let generatedText = "";
      for (const char of data.Wish[0]) {
        generatedText += char;
        setDraft(generatedText);
        await new Promise((res) => setTimeout(res, 50)); // Delay 50ms để tạo hiệu ứng gõ chữ
      }
    } catch (error) {
      console.error("Error fetching AI wish:", error);
    } finally {
      setLoadingAI(false);
    }
  }, []);

  return (
    <div className="container flex flex-col space-y-4 p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <WhoIsHere />
      <SomeoneIsTyping />

      <div className="flex space-x-2">
        {/* 
          // *NODE: LÀM THÊM HIỆU ỨNG WORD-BREAK
        */}
        <Input
          type="text"
          placeholder="🌸 Nhập lời hay ý đẹp..."
          value={draft}
          disabled={loadingAI}
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
          className="border border-gray-300 p-2 rounded-md break-words"
          style={{ wordBreak: "break-word" }} // Ngắt dòng tự động
        />
        <Button onClick={addWishByButton} disabled={loadingAI}>
          💖 Gửi
        </Button>
        <Button onClick={generateWish} disabled={loadingAI}>
          {loadingAI ? "🤖 Đang tạo..." : "✨ Nhờ AI giúp"}
        </Button>
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
