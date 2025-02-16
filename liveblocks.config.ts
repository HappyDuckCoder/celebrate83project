import type { LiveList, LiveObject } from "@liveblocks/client";

type Wish = {
  text: string;
  imgIndex: number;
};

declare global {
  interface Liveblocks {
    // Each user's Presence, for room.getPresence, room.subscribe("others"), etc.
    Presence: {
      isTyping: boolean;
    };
    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      wish: LiveList<LiveObject<Wish>>;
    };
  }
}
