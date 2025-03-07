"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { TiDeleteOutline } from "react-icons/ti";

const getRandomPosition = () => ({
    x: Math.random() * window.innerWidth * 0.8,
    y: Math.random() * window.innerHeight * 0.8,
});

const DraggableWrapper = ({
    children,
    position,
    onDrag,
}: {
    children: React.ReactNode;
    position: { x: number; y: number };
    onDrag?: (e: DraggableEvent, data: DraggableData) => void;
}) => {
    const nodeRef = useRef<HTMLDivElement>(null!);

    return (
        <Draggable nodeRef={nodeRef} position={position} onDrag={onDrag}>
            <div ref={nodeRef} className="absolute">
                {children}
            </div>
        </Draggable>
    );
};

const FloatingWishes = ({
    wishes,
    onDelete,
}: {
    wishes: { text: string; imgIndex: number }[];
    onDelete: (index: number) => void;
}) => {
    const [mounted, setMounted] = useState(false);
    const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setPositions((prev) => {
            if (wishes.length > prev.length) {
                const newPositions = Array.from(
                    { length: wishes.length - prev.length },
                    getRandomPosition
                );
                return [...prev, ...newPositions];
            }
            return prev.slice(0, wishes.length);
        });
    }, [wishes.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleIndexes([Math.floor(Math.random() * wishes.length)]);
        }, 3000);

        return () => clearInterval(interval);
    }, [wishes.length]);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {wishes.map((wish, index) => (
                    <DraggableWrapper
                        key={index}
                        position={positions[index]}
                        onDrag={(e, data) => {
                            setPositions((prev) => {
                                const newPositions = [...prev];
                                newPositions[index] = { x: data.x, y: data.y };
                                return newPositions;
                            });
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                                duration: 1.5,
                                type: "spring",
                                stiffness: 50,
                                damping: 10,
                                delay: index * 0.1,
                            }}
                            className="p-3 rounded-lg flex items-center space-x-2 pointer-events-auto cursor-pointer relative z-1"
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            {/* Ảnh hoa */}
                            <Avatar className="animate-[custom-spin_5s_linear_infinite]">
                                <AvatarImage
                                    src={`/png/flower${wish.imgIndex}.png`}
                                    alt={`Flower ${wish.imgIndex}`}
                                    className="pointer-events-none  "
                                />
                                <AvatarFallback>🌸</AvatarFallback>
                            </Avatar>
                            {hoverIndex === index && (
                                <div
                                    className="absolute top-2 right-1 bg-white rounded-full flex items-center justify-center text-black transition-all cursor-pointer"
                                    onClick={() => onDelete(index)}
                                >
                                    <TiDeleteOutline
                                        size={16}
                                        className="text-black"
                                    />
                                </div>
                            )}
                            {/* Lời chúc xuất hiện khi hover */}
                            {(hoverIndex === index ||
                                visibleIndexes.includes(index)) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute w-64 z-0 font-serif left-full ml-2 px-3 py-1 bg-white shadow-lg rounded-md text-gray-700 text-sm"
                                >
                                    {wish.text}
                                </motion.div>
                            )}
                        </motion.div>
                    </DraggableWrapper>
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
};

export default FloatingWishes;
