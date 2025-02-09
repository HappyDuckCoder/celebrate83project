import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const DialogCloud = ({
  text,
  onClickFunction,
}: {
  text: string;
  onClickFunction: () => void;
}) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="relative text-lg font-semibold text-gray-700 hover:text-white transition-all duration-300 px-4 py-2">
          {text}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tạo vườn hoa</AlertDialogTitle>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Tên vườn">Tên vườn</Label>
              <Input type="Tên vườn" id="Tên vườn" placeholder="Tên vườn" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Tên của bạn">Tên của bạn</Label>
              <Input
                type="Tên của bạn"
                id="Tên của bạn"
                placeholder="Tên của bạn"
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              onClick={onClickFunction}
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
