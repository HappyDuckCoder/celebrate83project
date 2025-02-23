"use client";

import React, { useState } from "react";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/action/user.action";
import { createDocument, getDocuments } from "@/lib/action/room.action";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const masterRoomId =
  process.env.NEXT_PUBLIC_MASTER_ROOM_ID || "mWu2Vaq7Mn9QFKeHV7sqU";

const RoomMetadataOfMasterRoom = {
  creatorId: "duckilot",
  email: "prto2802@gmail.com",
  title: "Master Room",
};

type Room = {
  type: string;
  id: string;
  createdAt: Date;
  metadata: {
    title: string;
    userEmail: string;
  };
};

type RoomData = {
  data: Room[];
};

const Home = () => {
  const [nameGarden, setNameGarden] = useState<string>("");
  const [idGarden, setIdGarden] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    if (!nameGarden.trim()) {
      alert("Tên phòng không được để trống!");
      return;
    }

    setLoading(true);

    try {
      const user_ = await getCurrentUser();
      if (!user_) {
        alert("Bạn chưa đăng nhập!");
        setLoading(false);
        return;
      }

      const roomsData: RoomData = await getDocuments();

      if (roomsData && Array.isArray(roomsData.data)) {
        const existingRoom = roomsData.data.find(
          (roomdata: Room) => roomdata.metadata.userEmail === user_.email
        );

        if (existingRoom) {
          alert("Bạn đã có một phòng rồi!");
          setLoading(false);
          return;
        }
      }

      const room = await createDocument({
        title: nameGarden,
        userId: user_.id,
        userEmail: user_.email,
      });

      if (room) {
        router.push(`/classes/${room.id}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phòng:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!idGarden.trim()) {
      alert("ID phòng không được từ trONGL!");
      return;
    }

    router.push(`/classes/${idGarden}`);
  };

  return (
    <main className="flex h-screen flex-col items-center pt-24">
      <div className="text-center">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "Kalam, cursive" }}
        >
          HAPPY VIETNAMESE WOMEN&apos;S DAY
        </h1>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "JejuHallasan, cursive" }}
        >
          23CLC02
        </h2>

        <div className="mt-4 flex gap-12 justify-center items-center">
          <CollaborativeRoom
            roomId={masterRoomId}
            roomMetadata={RoomMetadataOfMasterRoom}
          />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex gap-4 justify-center">
            <Input
              placeholder="Nhập tên phòng"
              value={nameGarden}
              onChange={(e) => setNameGarden(e.target.value)}
            />
            <Button onClick={handleCreateRoom} disabled={loading}>
              {loading ? "Đang tạo phòng..." : "Tạo phòng mới"}
            </Button>
          </div>

          <div className="flex gap-4 justify-center">
            <Input
              placeholder="Nhập mã phòng"
              value={idGarden}
              onChange={(e) => setIdGarden(e.target.value)}
            />
            <Button onClick={handleJoinRoom}>Tham gia phòng</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
