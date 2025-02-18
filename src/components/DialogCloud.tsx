import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/action/room.action";
import Select from "./ui/Select";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/lib/action/user.action";

const DialogCloud = ({ text }: { text: string }) => {
  const [gardenName, setGardenName] = React.useState<string>("");
  const [privacy, setPrivacy] = React.useState<string>("public");

  const clerkUser = getCurrentUser();

  console.log(clerkUser);

  // const handleCreateRoom = async ({
  //   title,
  //   clerkUser,
  //   isPrivate,
  // }: {
  //   title: string;
  //   createUserName: string;
  //   isPrivate: boolean;
  // }) => {
  //   try {
  //     const room = await createDocument({ title, clerkUser, isPrivate });
  //     if (room) router.push(`/classes/${room.id}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
              <Label htmlFor="gardenName">Tên vườn</Label>
              <Input
                type="text"
                id="gardenName"
                placeholder="Tên vườn"
                value={gardenName}
                onChange={(e) => setGardenName(e.target.value)}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="privacy">Quyền riêng tư</Label>
              <Select id="privacy" value={privacy} onValueChange={setPrivacy}>
                <option value="public">Công khai</option>
                <option value="private">Riêng tư</option>
              </Select>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              // onClick={() =>
              //   handleCreateRoom({
              //     title: gardenName,
              //     createUserName: userName,
              //     isPrivate: privacy === "private", // Convert to boolean
              //   })
              // }
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
