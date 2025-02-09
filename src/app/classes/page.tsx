"use client";

import { deleteDocument, getDocuments } from "@/lib/action/room.action";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Room = {
  type: string;
  id: string;
  createdAt: Date;
  metadata: {
    title: string;
  };
};

const ClassesPage = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null); // Lưu ID phòng đang xóa

  // Lấy danh sách phòng
  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDocuments();
      //   console.log(response);

      if (response && Array.isArray(response.data)) {
        setRooms(response.data);
      } else {
        setError("Dữ liệu trả về không hợp lệ.");
      }
    } catch (error) {
      setError("Lỗi khi tải danh sách phòng.");
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Xóa phòng
  const handleDeleteRoom = async (roomId: string) => {
    try {
      await deleteDocument({ roomId });

      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    } catch (error) {
      console.error("Lỗi khi xóa phòng:", error);
    } finally {
      setDeletingRoomId(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Vườn hoa của các lớp</h1>

      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : rooms.length === 0 ? (
        <p className="text-gray-500">Không có phòng nào</p>
      ) : (
        <ul className="space-y-3">
          {rooms.map((room) => (
            <li
              key={room.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
              onClick={() => {
                router.push(`/classes/${room.id}`);
              }}
            >
              <span className="font-semibold">
                {room.metadata.title || room.id}
              </span>
              <button
                onClick={() => handleDeleteRoom(room.id)}
                className={`px-3 py-1 text-white rounded-md transition ${
                  deletingRoomId === room.id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={deletingRoomId === room.id}
              >
                {deletingRoomId === room.id ? "Đang xóa..." : "Xóa"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassesPage;
