"use server";

import { currentUser } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

export async function getCurrentUser() {
  const clerkUser = await currentUser();

  return parseStringify(clerkUser);
}
