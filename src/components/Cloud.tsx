import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Cloud = ({
  text,
  onClickFunction,
  imglink,
}: {
  text: string;
  onClickFunction: () => void;
  imglink: string;
}) => {
  return (
    <div
      className="flex items-center justify-center w-64 h-20 bg-no-repeat bg-contain transition-all duration-300 hover:brightness-75 hover:animate-[wiggle_0.5s_ease-in-out_infinite]"
      style={{ backgroundImage: `url('${imglink}')` }}
      onClick={onClickFunction}
    >
      <p className="text-lg font-semibold text-gray-700 hover:text-white transition-all duration-300 cursor-pointer">
        {text}
      </p>
    </div>
  );
};

export default Cloud;
