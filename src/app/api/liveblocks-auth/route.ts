import { liveblocks } from "@/lib/liveblocks";

export async function POST() {
  // *TODO: MODIFY THIS USER CREATE LOGIC
  const id = "1";
  const user = {
    id,
    info: { id },
  };

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.id,
      groupIds: [],
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
