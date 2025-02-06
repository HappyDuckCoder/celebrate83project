"use client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_SK!}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
