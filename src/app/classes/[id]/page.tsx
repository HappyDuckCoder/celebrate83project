import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/action/room.action";
import { getClerkUsers } from "@/lib/action/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Classes = async ({ params }: { params: { id: string } }) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");

  // Lấy email của user
  const userEmail = clerkUser.primaryEmailAddress?.emailAddress;
  if (!userEmail) return <div>Lỗi: Không tìm thấy email của bạn.</div>;

  // Lấy thông tin phòng
  const room = await getDocument({
    roomId: params.id,
    userEmail: userEmail,
  });

  if (!room) return <div>Không có phòng này</div>;

  return (
    <main className="flex h-screen w-[75%] flex-col pt-24">
      <CollaborativeRoom roomId={room.id} roomMetadata={room.metadata} />
    </main>
  );
};

export default Classes;
