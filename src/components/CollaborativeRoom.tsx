import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import {
  RoomProvider,
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from "@liveblocks/react/suspense";
import { useCallback, useState } from "react";
import AIbox from "./AIbox";
import FloatingWishes from "./FloatingWish";
import Loading from "./Loading";
import PickFlower from "./PickFlower";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CopyRoomLink from "./CopyRoomLink";
import EdgeStoreButton from "./EdgeStoreButton";

const masterRoomTitle = "Master Room";

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
      {someoneIsTyping && "✍ Ai đó đang chúc..."}
    </div>
  );
}

function RoomCreator({
  creator,
  link,
  setLink,
  roomid,
}: {
  creator: string;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  roomid: string;
}) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-700">
        👑 Trưởng phòng: <span className="text-blue-600">{creator}</span>
      </h2>
      <div className="mt-4">
        <EdgeStoreButton link={link} setLink={setLink} roomid={roomid} />
      </div>
    </div>
  );
}

function RoomContent({
  roomId,
  title,
  creator,
  currentlink,
}: {
  roomId: string;
  title: string;
  creator: string;
  currentlink: string;
}) {
  const [draft, setDraft] = useState("");
  const [flowerPick, setFlowerPick] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedWish, setSelectedWish] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const updateMyPresence = useUpdateMyPresence();
  const wish = useStorage((root) => root.wish);

  const addWish = useMutation(({ storage }, text, imgIndex) => {
    storage.get("wish").push(new LiveObject({ text, imgIndex }));
  }, []);

  const addWishByButton = () => {
    if (!draft) return;
    addWish(draft, flowerPick);
    setDraft("");
  };

  const generateWish = useCallback(async () => {
    setLoadingAI(true);
    setDraft("");
    setSelectedWish([]); // Reset trước khi fetch mới

    try {
      const response = await fetch("/api/getGenerateWish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("API Error:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Dữ liệu từ API:", data);

      // Cập nhật danh sách lời chúc (đảm bảo data.Wish là mảng)
      setSelectedWish(data.Wish || []);

      console.log("selectedWish mới:", data.Wish);

      // Hiển thị từng ký tự lên input
      if (Array.isArray(data.Wish) && data.Wish.length > 0) {
        let generatedText = "";
        for (const char of data.Wish[0]) {
          generatedText += char;
          setDraft(generatedText);
          await new Promise((res) => setTimeout(res, 50));
        }
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoadingAI(false);
    }
  }, []);

  return (
    <div
      className="flex flex-col h-full justify-center items-center"
      style={{
        backgroundImage: link ? `url(${link})` : `url(${currentlink})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container flex flex-col space-y-4 p-4 max-w-lg mx-auto items-center">
        {title !== masterRoomTitle && (
          <div className="flex flex-col gap-4 items-center justify-between w-full">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <CopyRoomLink />
            <RoomCreator
              creator={creator}
              link={link}
              setLink={setLink}
              roomid={roomId}
            />
          </div>
        )}
        <WhoIsHere />
        <SomeoneIsTyping />
        <div className="flex space-x-2 items-center w-[80%]">
          <Input
            type="text"
            placeholder="🌸 Lời hay ý đẹp..."
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
            style={{ wordBreak: "break-word" }}
          />
          <Button onClick={addWishByButton} disabled={loadingAI}>
            💖 Gửi
          </Button>
        </div>
        <div>
          <Button onClick={generateWish} disabled={loadingAI}>
            {loadingAI ? "🤖 Đang tạo..." : "✨ Nhờ AI giúp"}
          </Button>
        </div>
        <PickFlower flowerPick={flowerPick} setFlowerPick={setFlowerPick} />
        <FloatingWishes
          wishes={wish.map((w) => ({ text: w.text, imgIndex: w.imgIndex }))}
        />
      </div>
      {/* Hiển thị danh sách lời chúc từ AI */}
      {selectedWish.length > 0 && (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h3 className="text-lg font-semibold">
            🌟 Bạn muốn chọn lời chúc nào nè
          </h3>

          <div className="grid grid-cols-2 grid-rows-2 gap-5">
            {selectedWish.map((item, index) => (
              <AIbox key={index} item={item} setDraft={setDraft} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: {
  roomId: string;
  roomMetadata: RoomMetadata;
}) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ isTyping: false }}
      initialStorage={{ wish: new LiveList([]) }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        <RoomContent
          roomId={roomId}
          title={roomMetadata.title}
          creator={roomMetadata.userEmail}
          currentlink={roomMetadata.backgroundImage}
        />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
