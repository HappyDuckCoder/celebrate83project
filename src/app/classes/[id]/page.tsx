import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/action/room.action";
import React from "react";

//  *TODO: FIX BUG AWAIT PARAMS THIS PAGE

const Classes = async ({ params: { id } }: SearchParamProps) => {
  const room = await getDocument({
    roomId: id,
  });

  if (!room) return <div>room not found</div>;

  return (
    <main>
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
