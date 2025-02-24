"use client";

import React, { useState, useEffect } from "react";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getCurrentUser } from "@/lib/action/user.action";
import { createDocument, getDocuments } from "@/lib/action/room.action";
import { useRouter } from "next/navigation";
import RoomControls from "@/components/RoomControl";
import HelloScreen from "@/components/HelloScreen";

const masterRoomId =
  process.env.NEXT_PUBLIC_MASTER_ROOM_ID || "mWu2Vaq7Mn9QFKeHV7sqU";

const RoomMetadataOfMasterRoom = {
  title: "Master Room",
  userEmail: "prto2802@gmail.com",
  creatorId: "duckilot",
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
  const [isLoading, setIsLoading] = useState(true); // Thêm state để kiểm soát loading
  const [nameGarden, setNameGarden] = useState<string>("");
  const [idGarden, setIdGarden] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Hiển thị HelloScreen trong 2.5s trước khi vào trang chính
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateRoom = async () => {
    if (!nameGarden.trim()) {
      setError("Tên phòng không được để trống!");
      return;
    }
    setLoading(true);

    try {
      const user_ = await getCurrentUser();
      if (!user_) {
        setError("Bạn chưa đăng nhập!");
        setLoading(false);
        return;
      }

      const roomsData: RoomData = await getDocuments();

      if (roomsData && Array.isArray(roomsData.data)) {
        const existingRoom = roomsData.data.find(
          (roomdata: Room) => roomdata.metadata.userEmail === user_.email
        );

        if (existingRoom) {
          setError("Bạn đã có một phòng rồi!");
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
      setError("Đã có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!idGarden.trim()) {
      setError("ID phòng không được để trống!");
      return;
    }

    router.push(`/classes/${idGarden}`);
  };

  if (isLoading) {
    return <HelloScreen />;
  }

  return (
    <main className="flex h-full flex-col items-center pt-16">
      <RoomControls
        nameGarden={nameGarden}
        setNameGarden={setNameGarden}
        idGarden={idGarden}
        setIdGarden={setIdGarden}
        handleCreateRoom={handleCreateRoom}
        handleJoinRoom={handleJoinRoom}
        loading={loading}
      />

      {/* Popup lỗi */}
      {error && (
        <div className="absolute top-10 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-white font-bold"
          >
            ✖
          </button>
        </div>
      )}

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
      </div>
    </main>
  );
};

export default Home;
