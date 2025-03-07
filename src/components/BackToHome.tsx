"use client";

import { BackwardIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackToHome = () => {
  const router = useRouter();
  const handleBackHome = () => {
    router.replace("/");
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleBackHome}
        className="flex mb-1 items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md transition duration-300 hover:scale-105 hover:shadow-lg hover:from-pink-600 hover:to-red-600"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default BackToHome;
