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
    <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4">
      <h3 className="text-lg font-semibold text-center md:text-left">
        Thích hoa nào nè
      </h3>

      {/* Grid layout khi màn hình nhỏ */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:flex md:gap-4">
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
              className="hover:animate-[custom-spin_1s_linear_infinite]"
            />
            <AvatarFallback>🌸</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
};

export default PickFlower;
