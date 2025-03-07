"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDocument } from "@/lib/action/room.action";
import HelloScreen from "@/components/HelloScreen";
import SlidingSidebar from "@/components/SlidingSideBar";
import CopyRoomLink from "@/components/CopyRoomLink";
import BackToHome from "@/components/BackToHome";
import EdgeStoreButton from "@/components/EdgeStoreButton";
import { getCurrentUser } from "@/lib/action/user.action";
import { Lobster } from "next/font/google";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

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

const masterRoomTitle = "Master Room";
const Classes = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [curUser, setCurUser] = useState("");

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

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      const roomData = await getDocument({ roomId: id });

      if (!roomData) {
        alert("Không có phòng này!");
        router.push("/");
        return;
      }

      // ✅ Đảm bảo dữ liệu metadata có đầy đủ thuộc tính
      const completeMetadata: RoomMetadata = {
        title: roomData.metadata.title,
        userEmail: roomData.metadata.userEmail,
        creatorId: roomData.metadata.creatorId,
        backgroundImage: roomData.metadata.backgroundImage || "unknown",
      };

      setRoom({ ...roomData, metadata: completeMetadata });
    };

    fetchRoom();
  }, [id, router]);

  if (!room) return <HelloScreen />;

  return (
    <main className="flex flex-col justify-center items-center w-max h-max">
      {/* <CollaborativeRoom roomId={room.id} roomMetadata={room.metadata} /> */}

      {room.metadata.title !== masterRoomTitle && (
        <>
          {/* Nút Copy góc trên bên phải */}
          <div className="absolute top-4 right-4">
            <div className="flex space-x-2">
              <CopyRoomLink />
              <BackToHome />
            </div>
          </div>

          {/* Hiển thị tên chủ phòng + component đổi background (góc trên bên trái) */}
          {room.metadata.userEmail === curUser && (
            <div className="absolute top-4 left-4">
              <RoomCreator creator={room.metadata.userEmail} roomid={room.id} />
            </div>
          )}

          {/* Tiêu đề phòng */}
          <h1
            className={`${lobster.className}  font-normal text-5xl text-black my-3 mx-1 drop-shadow-custom rotate-[-3deg] skew-x-[-4deg]`}
          >
            {room.metadata.title}
          </h1>
        </>
      )}

      <SlidingSidebar roomId={room.id} RoomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
