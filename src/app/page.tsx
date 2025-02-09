"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/action/room.action";
import Cloud from "@/components/Cloud";

const Home = () => {
  const router = useRouter();
  const handleCreateRoom = async () => {
    try {
      const room = await createDocument();
      if (room) router.push(`/classes/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetRooms = () => {
    router.push("/classes");
  };

  return (
    <main className="flex h-screen flex-col items-center pt-24">
      <div className="text-center">
        <h1
          className="text-2xl font-bold"
          style={{
            fontFamily: "Kalam, cursive",
          }}
        >
          HAPPY VIETNAMESE WOMEN'S DAY
        </h1>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "JejuHallasan, cursive" }}
        >
          23CLC02
        </h2>
        <div className="mt-4 flex gap-12 justify-center">
          <Cloud
            text="Tạo vượt hoa"
            imglink={"/png/cloudright.png"}
            onClickFunction={handleCreateRoom}
            isCreateRoom={true}
          />
          <Cloud
            text="Xem các vượt hoa"
            imglink={"/png/cloudleft.png"}
            onClickFunction={handleGetRooms}
            isCreateRoom={false}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
