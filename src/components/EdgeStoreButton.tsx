import { UpdateBackground } from "@/lib/action/room.action";
import { UploadCloud } from "lucide-react";
import * as React from "react";
import { useBackground } from "../app/useContext/bgContext";
import { useEdgeStore } from "../lib/edgestore";
import { Button } from "./ui/button";

export default function EdgeStoreButton({ roomid }: { roomid: string }) {
    const [file, setFile] = React.useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = React.useState<number | null>(
        null
    );
    const [uploading, setUploading] = React.useState(false);
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

            // Cập nhật background của phòng
            await UpdateBackground({ roomId: roomid, link: res.url });
            setBackgroundImage(res.url);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
            setUploadProgress(null);
            setFile(null);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            {/* Input file ẩn */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
            />

            {/* Icon chọn file */}
            <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            >
                <UploadCloud className="w-8 h-8 text-blue-500" />
            </button>

            {/* Hiển thị tên file sau khi chọn */}
            {file && <p className="text-sm text-gray-600">{file.name}</p>}

            {/* Hiển thị progress khi đang tải lên */}
            {uploadProgress !== null && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
            )}

            {/* Nút tải lên */}
            <Button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? "Đang tải lên..." : "Tải lên"}
            </Button>
        </div>
    );
}
