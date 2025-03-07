"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createDocument = async ({
  title,
  userId,
  userEmail,
  linkBackground,
}: {
  title: string;
  userId: string;
  userEmail: string;
  linkBackground: string;
}) => {
  const roomId = nanoid();

  try {
    const metadata = {
      title,
      creatorId: userId,
      userEmail,
      backgroundImage: linkBackground,
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.error(`Error happened while creating a room: ${error}`);
    throw error;
  }
};

export const getDocument = async ({ roomId }: { roomId: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

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

export const UpdateBackground = async ({
  roomId,
  link,
}: {
  roomId: string;
  link: string;
}) => {
  try {
    await liveblocks.updateRoom(roomId, {
      metadata: { backgroundImage: link },
    });
    console.log("Background updated successfully!");
  } catch (error) {
    console.log(`Error updating background: ${error}`);
  }
};

export const getRoomBackground = async (roomId: string) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    return room.metadata.backgroundImage || "";
  } catch (error) {
    console.error(`Error fetching background: ${error}`);
    return null;
  }
};
