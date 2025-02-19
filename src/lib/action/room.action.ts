"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createDocument = async ({
  title,
  userId,
  userEmail,
  isPrivate,
}: {
  title: string;
  userId: string;
  userEmail: string;
  isPrivate: boolean;
}) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      userEmail,
      title,
    };

    const usersAccesses: RoomAccesses = isPrivate
      ? { [userEmail]: ["room:write"] }
      : {
          [userEmail]: ["room:write"],
          "*": ["room:read", "room:presence:write"],
        };
    // Nếu public, mọi người đều có quyền đọc và presence

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:read", "room:presence:write"],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.error(`Error happened while creating a room: ${error}`);
    throw error;
  }
};

export const getDocument = async ({
  roomId,
  userEmail,
}: {
  roomId: string;
  userEmail: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userEmail);

    // *NOTE: DEBUGGING
    console.log("is access: ", hasAccess);
    console.log(room);

    if (!hasAccess) {
      throw new Error("You do not have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};

export const getDocuments = async () => {
  try {
    const rooms = await liveblocks.getRooms();

    revalidatePath("/");

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happened while getting rooms: ${error}`);
  }
};

export const deleteDocument = async ({ roomId }: { roomId: string }) => {
  try {
    await liveblocks.deleteRoom(roomId);
  } catch (error) {
    console.log(`Error happened while deleting a room: ${error}`);
  }
};
