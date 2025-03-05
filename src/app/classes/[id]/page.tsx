"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/action/room.action";
import HelloScreen from "@/components/HelloScreen";

const Classes = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);

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
      <CollaborativeRoom roomId={room.id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
