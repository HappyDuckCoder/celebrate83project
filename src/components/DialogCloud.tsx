import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  // AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/action/room.action";

const DialogCloud = ({ text }: { text: string }) => {
  const [userName, setUserName] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");

  const router = useRouter();
  const handleCreateRoom = async ({
    title,
    createUserName,
  }: {
    title: string;
    createUserName: string;
  }) => {
    try {
      const room = await createDocument({ title, createUserName });
      if (room) router.push(`/classes/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="relative text-lg font-semibold text-gray-700 hover:text-white transition-all duration-300 px-4 py-2">
          {text}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col gap-3">
            <AlertDialogTitle>Tạo vườn hoa</AlertDialogTitle>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Tên vườn">Tên vườn</Label>
              <Input
                type="Text"
                id="Tên vườn"
                placeholder="Tên vườn"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Tên của bạn">Tên của bạn</Label>
              <Input
                type="text"
                id="Tên của bạn"
                placeholder="Tên của bạn"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              onClick={() =>
                handleCreateRoom({ title, createUserName: userName })
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogCloud;
