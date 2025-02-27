"use client";
import * as React from "react";
import { useEdgeStore } from "../lib/edgestore";
import { Button } from "./ui/button";

export default function EdgeStoreButton({
  link,
  setLink,
}: {
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(
    null
  );
  const [uploading, setUploading] = React.useState(false);
  const { edgestore } = useEdgeStore();

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => setUploadProgress(progress),
      });
      console.log("Upload success:", res);
      // alert("Tải lên thành công! 🎉");
      setLink(res.url);
    } catch (error) {
      console.error("Upload failed:", error);
      //   alert("Tải lên thất bại! 😢");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded-lg"
      />
      {uploadProgress !== null && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Đang tải lên..." : "Tải lên"}
      </Button>
    </div>
  );
}
