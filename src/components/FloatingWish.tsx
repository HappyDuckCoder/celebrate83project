"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import { DraggableEvent, DraggableData } from "react-draggable";
// import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
}: //   onDelete,
{
  wishes: { text: string; imgIndex: number }[];
  //   onDelete: (index: number) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Sync positions with wishes
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
              <Avatar className="hover:animate-[custom-spin_1s_linear_infinite]">
                <AvatarImage
                  src={`/png/flower${wish.imgIndex}.png`}
                  alt={`Flower ${wish.imgIndex}`}
                  className="pointer-events-none  "
                />
                <AvatarFallback>🌸</AvatarFallback>
              </Avatar>

              {
                // *NOTE: USE FOR DELETE WISH IF NEED
              }
              {/* <Button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                onClick={() => onDelete(index)}
              >
                ✕
              </Button> */}

              {/* Lời chúc xuất hiện khi hover */}
              {hoverIndex === index && (
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
