"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/action/room.action";

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

  return (
    <main>
      <div>
        <h1>HAPPY VIETNAMESE WOMEN'S DAY</h1>
        <h1>23CLC02</h1>
        <div>
          <Button onClick={handleCreateRoom}>Tạo vườn hoa</Button>
          <Button>Trồng hoa</Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
