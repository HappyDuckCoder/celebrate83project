"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import { Button } from "./ui/button";
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
  onDrag?: (e: any, data: { x: number; y: number }) => void;
}) => {
  const nodeRef = useRef(null);

  // !BUGG: FIX NODEREF HERE

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
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              className="p-3 rounded-lg flex items-center space-x-2 pointer-events-auto cursor-move relative"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Ảnh hoa */}
              {/*
                // !BUGG: FIX IMAGE DRAG HERE
              */}
              <Avatar className="border-none">
                <AvatarImage
                  src={`/png/flower${wish.imgIndex}.png`}
                  alt={`Flower ${wish.imgIndex}`}
                />
                <AvatarFallback>🌸</AvatarFallback>
              </Avatar>

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
                  className="absolute left-full ml-2 px-3 py-1 bg-white shadow-lg rounded-md text-gray-700 text-sm"
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
