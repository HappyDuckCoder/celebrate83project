"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createDocument = async ({
  title,
  createUserName,
}: {
  title: string;
  createUserName: string;
}) => {
  const roomId = nanoid();

  try {
    const metadata = {
      title: title,
      creatorId: createUserName,
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
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
