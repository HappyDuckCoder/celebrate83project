import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/action/room.action";
import React from "react";

//  !BUGG: FIX BUG AWAIT PARAMS THIS PAGE

const Classes = async ({ params: { id } }: { params: { id: string } }) => {
  const room = await getDocument({
    roomId: id,
  });

  if (!room) return <div>không tìm thấy phòng này</div>;

  return (
    <main className="flex h-screen w-[75%] flex-col pt-24">
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
