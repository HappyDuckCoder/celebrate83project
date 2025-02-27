import React from "react";

const AIbox = ({
  item,
  setDraft,
}: {
  item: string;
  setDraft: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className="p-4 bg-pink-100 shadow-md rounded-xl cursor-pointer hover:bg-pink-200 transition-all 
      flex items-center justify-center text-center border border-pink-300"
      onClick={() => setDraft(item)}
    >
      <p className="text-pink-700 font-medium">{item}</p>
    </div>
  );
};

export default AIbox;
