"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cloud from "@/components/Cloud";

const Home = () => {
  const router = useRouter();

  const handleGetRooms = () => {
    router.push("/classes");
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
          <Cloud
            text="Tạo vườn hoa"
            imglink={"/png/cloudright.png"}
            onClickFunction={() => {}}
            isCreateRoom={true}
          />
          <Cloud
            text="Xem các vườn hoa"
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
