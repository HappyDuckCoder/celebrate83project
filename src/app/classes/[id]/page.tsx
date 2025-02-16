import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/action/room.action";
import React, { use } from "react";

const Classes = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const room = use(getDocument({ roomId: id }));

  if (!room) return <div>Không tìm thấy phòng này</div>;

  return (
    <main className="flex h-screen w-[75%] flex-col pt-24">
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
