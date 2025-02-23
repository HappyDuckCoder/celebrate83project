import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/action/room.action";
import React from "react";

const Classes = async ({ params }: { params: { id: string } }) => {
  // Lấy thông tin phòng
  const room = await getDocument({
    roomId: params.id,
  });

  if (!room) return <div>Không có phòng này</div>;

  return (
    <main className="flex h-screen w-[75%] flex-col pt-24">
      <CollaborativeRoom roomId={room.id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
