"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getDocuments } from "@/lib/action/room.action";
import { getCurrentUser } from "@/lib/action/user.action";

export default function JoinRoomButton() {
    const [roomId, setRoomId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkUserAndRoom = async () => {
            const user = await getCurrentUser();
            if (!user) return;

            const roomsData = await getDocuments();
            if (roomsData && Array.isArray(roomsData.data)) {
                const existingRoom = roomsData.data.find(
                    (room: Room) => room.metadata.userEmail === user.email
                );
                if (existingRoom) {
                    setRoomId(existingRoom.id);
                }
            }
        };

        checkUserAndRoom();
    }, []);

    const handleJoinRoom = () => {
        if (roomId) {
            router.push(`/classes/${roomId}`);
        }
    };

    if (!roomId) return null; 

    return (
        <Button
            onClick={handleJoinRoom}
            className="bg-pink-300 hover:bg-pink-400 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
            Gia nhập phòng
        </Button>
    );
}
