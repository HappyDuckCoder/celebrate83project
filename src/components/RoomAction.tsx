import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const RoomAction = ({
  label,
  placeholder,
  icon: Icon,
  color,
  value,
  setValue,
  handleAction,
  loading = false,
}: {
  label: string;
  placeholder: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleAction: () => void;
  loading?: boolean;
}) => {
  const [active, setActive] = useState(false);

  // Xử lý khi nhấn Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value.trim() !== "" && !loading) {
      handleAction();
    }
  };

  return (
    <div className="flex items-center gap-3 relative group">
      {/* Icon Button */}
      <button
        className={`w-12 h-12 flex items-center justify-center border-2 ${color} rounded-full p-2 text-white transition-transform duration-200 hover:scale-110 focus:outline-none`}
        onClick={() => setActive(!active)}
      >
        <Icon className="w-8 h-8" />
      </button>

      {/* Input + Action Button */}
      {active && (
        <div className="absolute left-14 flex gap-3 items-center">
          <Input
            className="p-3 w-48 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition-all z-50"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown} // Bắt sự kiện Enter
          />
          <Button
            className={`w-28 h-12 ${color} text-white rounded-xl flex items-center justify-center gap-2 hover:opacity-90 z-50 transition-all`}
            onClick={handleAction}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomAction;
