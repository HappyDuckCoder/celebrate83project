import { getCurrentUser } from "@/lib/action/user.action";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import {
    RoomProvider,
    useMutation,
    useOthers,
    useStorage,
    useUpdateMyPresence,
} from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";
import AIbox from "./AIbox";
import CopyRoomLink from "./CopyRoomLink";
import EdgeStoreButton from "./EdgeStoreButton";
import FloatingWishes from "./FloatingWish";
import Loading from "./Loading";
import PickFlower from "./PickFlower";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

function RoomCreator({ creator, roomid }: { creator: string; roomid: string }) {
  return (
    <div className="p-6 ">
      {/* Hiệu ứng bokeh 8/3 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-16 h-16 bg-pink-300 opacity-30 rounded-full top-4 left-8 animate-pulse"></div>
        <div className="absolute w-20 h-20 bg-pink-200 opacity-40 rounded-full bottom-6 right-10 animate-bounce"></div>
        <div className="absolute w-12 h-12 bg-pink-400 opacity-50 rounded-full top-10 right-16 animate-ping"></div>
      </div>

      <h2 className="text-xl font-semibold text-pink-700 text-center">
        👑 Trưởng phòng: <span className="text-pink-600">{creator}</span>
      </h2>

      {/* Nút upload với hiệu ứng đẹp */}
      <div className="mt-6">
        <EdgeStoreButton roomid={roomid} />
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
    const [curUser, setCurUser] = useState("");
    const updateMyPresence = useUpdateMyPresence();
    const wish = useStorage((root) => root.wish);

    const deleteWish = useMutation(({ storage }, index) => {
        storage.get("wish").delete(index);
    }, []);

    const addWish = useMutation(({ storage }, text, imgIndex) => {
        storage.get("wish").push(new LiveObject({ text, imgIndex }));
    }, []);

    const addWishByButton = () => {
        if (!draft) return;
        addWish(draft, flowerPick);
        setDraft("");
    };

    useEffect(() => {
        const getCurrentUserEmail = async () => {
            const user = await getCurrentUser();
            if (user) {
                setCurUser(user.email);
            } else {
                setCurUser("");
            }
        };

        getCurrentUserEmail();
    }, []);

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
                backgroundImage: `url(${currentlink})`,
                backgroundSize: "cover",
            }}
        >
            <div className="container flex flex-col space-y-4 p-4 max-w-lg mx-auto items-center">
                {title !== masterRoomTitle && (
                    <>
                        {/* Nút Copy góc trên bên phải */}
                        <div className="absolute top-4 right-4">
                            <CopyRoomLink />
                        </div>

                        {/* Hiển thị tên chủ phòng + component đổi background (góc trên bên trái) */}
                        {creator === curUser && (
                            <div className="absolute top-4 left-4">
                                <RoomCreator
                                    creator={creator}
                                    roomid={roomId}
                                />
                            </div>
                        )}

                        {/* Tiêu đề phòng */}
                        <div className="flex flex-col items-center w-full">
                            <h2 className="text-2xl font-semibold">{title}</h2>
                        </div>
                    </>
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
                        className="border border-gray-300 p-2 rounded-md break-words w-full"
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
                <PickFlower
                    flowerPick={flowerPick}
                    setFlowerPick={setFlowerPick}
                />
                <FloatingWishes
                    wishes={wish.map((w) => ({
                        text: w.text,
                        imgIndex: w.imgIndex,
                    }))}
                    onDelete={deleteWish}
                />
            </div>
            {/* Hiển thị danh sách lời chúc từ AI */}
            {selectedWish.length > 0 && (
                <div className="flex flex-col gap-4 justify-center items-center">
                    <h3 className="text-lg font-semibold">
                        🌟 Bạn muốn chọn lời chúc nào nè
                    </h3>

                    <div className="grid lg:grid-cols-2 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-2 gap-5">
                        {selectedWish.map((item, index) => (
                            <AIbox
                                key={index}
                                item={item}
                                setDraft={setDraft}
                            />
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
            <div className="flex flex-col h-full w-full justify-center items-center">
            <ClientSideSuspense fallback={<Loading />}>
                <RoomContent
                    roomId={roomId}
                    title={roomMetadata.title}
                    creator={roomMetadata.userEmail}
                    currentlink={roomMetadata.backgroundImage}
                />
            </ClientSideSuspense>
            </div>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
