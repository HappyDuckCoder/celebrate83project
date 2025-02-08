import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/action/room.action";
import React from "react";

const Classes = async ({ params: { id } }: { params: { id: string } }) => {
  const room = await getDocument({
    roomId: id,
  });

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
