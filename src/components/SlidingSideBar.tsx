"use client";

import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import CollaborativeRoom from "./CollaborativeRoom";

export default function SlidingSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const masterRoomId =
        process.env.NEXT_PUBLIC_MASTER_ROOM_ID || "mWu2Vaq7Mn9QFKeHV7sqU";

    const RoomMetadataOfMasterRoom = {
        title: "Master Room",
        userEmail: "prto2802@gmail.com",
        creatorId: "duckilot",
        backgroundImage: "./png/bg.png",
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-0 left-24 transform -translate-x-1/2 px-6 py-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-t-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                initial={{ y: "100%" }}
                animate={{ y: isOpen ? -"66%" : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                <Plus size={36} />
            </motion.button>

            {/* Sidebar */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: isOpen ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed bottom-0 transform -translate-x-1/2 w-[70%] h-2/3 bg-white rounded-t-2xl shadow-xl flex flex-col z-50"
            >
                {/* Viền ngoài có hiệu ứng gradient di chuyển */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-move rounded-t-2xl p-[3px]">
                    {/* Lớp nền trong của sidebar */}
                    <div className="w-full h-full bg-white rounded-t-2xl p-4 flex flex-col">
                        {/* Header Sidebar với nút đóng */}
                        <div className="flex justify-end items-center">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Nội dung Sidebar */}
                        <div className="flex-grow overflow-auto text-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 text-center">
                                Nhập lời chúc của bạn ở đây nè
                                <span className="ml-2 text-lg font-semibold text-pink-600 text-center">
                                    🌸 Chúc mừng 8/3 nhé 🌸
                                </span>
                            </h2>
                            <div className="flex">
                                <CollaborativeRoom
                                    roomId={masterRoomId}
                                    roomMetadata={RoomMetadataOfMasterRoom}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
