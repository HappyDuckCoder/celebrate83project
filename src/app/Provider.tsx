"use client";

import Loading from "@/components/Loading";
import { getClerkUsers } from "@/lib/action/user.action";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
