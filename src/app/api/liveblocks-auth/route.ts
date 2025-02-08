import { liveblocks } from "@/lib/liveblocks";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  // Get the current user from your database
  const id = "1";
  const user = {
    id,
    info: { id },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.id,
      groupIds: [],
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
