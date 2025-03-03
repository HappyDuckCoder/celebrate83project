"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Copy Link
      </button>
      <AnimatePresence>
        {copySuccess && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute w-max bottom-full left-1/2 transform -translate-x-1/2 mt-2 mb-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg"
          >
            ✅ Đã sao chép!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyRoomLink;
