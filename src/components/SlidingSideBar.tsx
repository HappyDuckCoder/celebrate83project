"use client";

import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import CollaborativeRoom from "./CollaborativeRoom";

export default function SlidingSidebar({
  roomId,
  isCreator,
}: {
  roomId: string;
  RoomMetadata: RoomMetadata;
  isCreator: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-0 md:left-24 left-5 transform -translate-x-1/2 px-6 py-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-t-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
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
        className="fixed bottom-0 transform -translate-x-1/2 w-[70%] h-2/3 bg-white bg-opacity-50 rounded-t-2xl shadow-xl flex flex-col z-50"
      >
        {/* Lớp nền trong của sidebar */}
        <div className="relative h-full p-4 rounded-t-2xl border-4 border-purple-500 flex flex-col">
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
            </h2>
            <span className="mt-2 text-lg font-semibold text-pink-600 text-center justify-center flex">
              🌸 Chúc mừng 8/3 nhé 🌸
            </span>
            <div className="flex">
              <CollaborativeRoom
                roomId={roomId}
                SetOpenBar={setIsOpen}
                isCreator={isCreator}
              />
            </div>
            {/* </div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
