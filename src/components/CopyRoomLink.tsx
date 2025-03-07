"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";

const CopyRoomLink = () => {
  const pathname = usePathname();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    const fullUrl = window.location.origin + pathname;
    const textArea = document.createElement("textarea");
    textArea.value = fullUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopyLink}
        className="flex mb-1 items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md transition duration-300 hover:scale-105 hover:shadow-lg hover:from-pink-600 hover:to-red-600"
      >
        <Copy className="w-5 h-5" />
      </button>
      <AnimatePresence>
        {copySuccess && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-max right-1/3 transform translate-x-1/2 mb-2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg shadow-lg"
          >
            ✅ Đã sao chép link!!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyRoomLink;
