"use client";

import React, { useState, useEffect } from "react"; // Thêm useEffect
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, DoorOpen, Loader2 } from "lucide-react";
import LoginButton from "./LoginButton";

const RoomControls = ({
  nameGarden,
  setNameGarden,
  idGarden,
  setIdGarden,
  handleCreateRoom,
  handleJoinRoom,
  loading,
}: {
  nameGarden: string;
  setNameGarden: React.Dispatch<React.SetStateAction<string>>;
  idGarden: string;
  setIdGarden: React.Dispatch<React.SetStateAction<string>>;
  handleCreateRoom: () => void;
  handleJoinRoom: () => void;
  loading: boolean;
}) => {
  const [activeInput, setActiveInput] = useState<"create" | "join" | null>(
    null
  );
  const [showCreateTooltip, setShowCreateTooltip] = useState(true); // Hiển thị tooltip tạo phòng
  const [showJoinTooltip, setShowJoinTooltip] = useState(true); // Hiển thị tooltip tham gia phòng

  // Tự động ẩn tooltip sau 5 giây
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCreateTooltip(false);
      setShowJoinTooltip(false);
    }, 3000); // 5 giây

    return () => clearTimeout(timeout); // Dọn dẹp timeout khi component unmount
  }, []);

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-4 p-5">
      {/* Điều Khiển */}
      <div className="flex flex-col gap-4">
        <LoginButton />
        {/* Tạo Phòng */}
        <div className="flex items-center gap-3 relative group">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() =>
              setActiveInput(activeInput === "create" ? null : "create")
            }
          >
            <PlusCircle className="w-10 h-10 text-white hover:scale-110 transition-transform duration-200 border-2 bg-blue-600 rounded-full p-1" />
          </div>
          {/* Tooltip hiển thị trên icon */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 top-[-40px] z-10 ${
              showCreateTooltip ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100 transition-opacity duration-300 text-sm bg-white px-3 py-1 min-w-[160px] text-center rounded-xl shadow-md border border-gray-200 pointer-events-none`}
          >
            ☁️ Nhấp để tạo phòng mới
          </span>

          {activeInput === "create" && (
            <div className="absolute left-12 flex gap-3 items-center">
              <Input
                className="p-3 w-48 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Nhập tên phòng"
                value={nameGarden}
                onChange={(e) => setNameGarden(e.target.value)}
              />
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all"
                onClick={handleCreateRoom}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Tạo"}
              </Button>
            </div>
          )}
        </div>

        {/* Tham Gia Phòng */}
        <div className="flex items-center gap-3 relative group">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() =>
              setActiveInput(activeInput === "join" ? null : "join")
            }
          >
            <DoorOpen className="w-10 h-10 text-white hover:scale-110 transition-transform duration-200 border-2 bg-green-600 rounded-full p-1" />
          </div>

          {/* Tooltip hiển thị trên icon */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 top-[-40px] z-10 ${
              showJoinTooltip ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100 transition-opacity duration-300 text-sm bg-white px-3 py-1 min-w-[160px] text-center rounded-xl shadow-md border border-gray-200 pointer-events-none`}
          >
            ☁️ Nhấp để tham gia phòng
          </span>

          {activeInput === "join" && (
            <div className="absolute left-12 flex gap-3 items-center">
              <Input
                className="p-3 w-48 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Nhập mã phòng"
                value={idGarden}
                onChange={(e) => setIdGarden(e.target.value)}
              />
              <Button
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all"
                onClick={handleJoinRoom}
              >
                Tham gia
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomControls;
