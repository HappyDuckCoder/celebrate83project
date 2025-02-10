import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PickFlower = ({
  flowerPick,
  setFlowerPick,
}: {
  flowerPick: number;
  setFlowerPick: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-center">Thích hoa nào nè</h3>
      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Avatar
            key={i}
            className={`cursor-pointer transition-all duration-300 
              ${
                flowerPick === i
                  ? "border-4 border-pink-500 shadow-lg scale-110"
                  : "border-2 border-transparent"
              }`}
            onClick={() => setFlowerPick(i)}
          >
            <AvatarImage
              src={`/png/flower${i}.png`}
              alt={`Flower ${i}`}
              className="hover:animate-[wiggle_0.5s_ease-in-out_infinite]"
            />
            <AvatarFallback>🌸</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
};

export default PickFlower;
