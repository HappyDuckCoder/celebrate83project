"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { redirect } from "next/navigation";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createDocument = async () => {
  const roomId = nanoid();

  try {
    const metadata = {
      title: "Untitled",
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
