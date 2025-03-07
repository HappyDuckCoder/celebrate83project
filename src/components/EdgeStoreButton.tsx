import * as React from "react";
import { useBackground } from "../app/useContext/bgContext";
import { useEdgeStore } from "../lib/edgestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, ImagePlus } from "lucide-react";
import { UpdateBackground } from "@/lib/action/room.action";

export default function EdgeStoreButton({ roomid }: { roomid: string }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(
    null
  );
  const [uploading, setUploading] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const { edgestore } = useEdgeStore();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const { setBackgroundImage } = useBackground();
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => setUploadProgress(progress),
      });

      await UpdateBackground({ roomId: roomid, link: res.url });
      setFile(null);
      setBackgroundImage(res.url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 relative">
      {/* Nút mở input */}
      <button
        className="w-12 h-12 flex items-center justify-center border-2 border-pink-400 bg-pink-300 text-white rounded-full p-2 transition-transform duration-200 hover:scale-110"
        onClick={() => setActive(!active)}
      >
        <ImagePlus className="w-8 h-8" />
      </button>

      {/* Chọn file */}
      {active && (
        <div className="flex flex-wrap gap-3 items-center mt-2 sm:mt-0">
          {/* Hiển thị tên file */}
          <Input
            className="p-3 w-48 rounded-lg border border-pink-400 focus:ring-2 focus:outline-none transition-all"
            placeholder="Chọn file ảnh"
            value={file?.name || ""}
            readOnly
          />
          {/* Nút chọn file */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <Button
            className="w-28 h-12 bg-pink-400 text-white rounded-xl flex items-center justify-center hover:bg-pink-500 transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            📁
          </Button>
          {/* Nút tải lên */}
          <Button
            className="w-28 h-12 bg-pink-400 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-pink-500 transition-all"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Tải lên"
            )}
          </Button>
        </div>
      )}

      {/* Thanh tiến trình Upload */}
      {uploadProgress !== null && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-pink-500 h-2 rounded-full transition-all"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
