"use client";

import { motion } from "framer-motion";
import { AlignJustify, Lock, Plus, X } from "lucide-react";
import { useState } from "react";

// List of predefined rooms
const rooms = [
    { id: 1, name: "Zuyfus" },
    { id: 2, name: "Duy Phu" },
    { id: 3, name: "Zyfu" },
    { id: 4, name: "DyPhu" },
    { id: 5, name: "D5Phu" },
    { id: 6, name: "D6Phu" },
];

export default function RightSidebar() {
    const [isOpen, setIsOpen] = useState(true); // State for sidebar visibility
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null); // State for selected room modal
    const [showModal, setShowModal] = useState(false); // State for room creation modal

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 p-3 rounded-full transition-all shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center justify-center w-12 h-12"
            >
                {isOpen ? <X size={28} /> : <AlignJustify size={28} />}
            </button>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? "0%" : "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-0 right-0 h-full w-72 bg-transparent backdrop-blur-md shadow-2xl z-40 p-4 flex flex-col border-l border-gray-300"
            >
                <h2 className="text-2xl font-semibold text-center mb-4 mt-12 text-white">
                    Room List
                </h2>

                {/* Search Bar & Add Room Button */}
                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search id rooms..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                    />
                    {/* Button to trigger room creation modal */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-12 h-10 flex items-center justify-center rounded-full bg-[#ff3333] text-white hover:bg-[#AD00AD] transition"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                {/* Room List */}
                <ul className="mt-6 space-y-4">
                    {rooms.map((room) => (
                        <li
                            key={room.id}
                            onClick={() => setSelectedRoom(room.name)}
                            className="flex justify-between items-center p-3 bg-gray-900 bg-opacity-30 rounded-lg cursor-pointer hover:bg-opacity-50 transition-all text-white"
                        >
                            <span className="font-medium">{room.name}</span>
                            <Lock size={18} className="text-white opacity-80" />
                        </li>
                    ))}
                </ul>
            </motion.aside>

            {/* Room Join Modal */}
            {selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                        <h3 className="text-xl font-semibold mb-4">
                            Join Room
                        </h3>
                        <p className="text-lg font-medium pb-3">
                            {selectedRoom}
                        </p>
                        <input
                            type="password"
                            placeholder="Enter room password"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            onClick={() => setSelectedRoom(null)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                        >
                            Join
                        </button>
                        <button
                            onClick={() => setSelectedRoom(null)}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Room Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                        <h3 className="text-xl font-semibold mb-4">
                            Create New Room
                        </h3>
                        <input
                            type="text"
                            placeholder="Enter room name"
                            className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
