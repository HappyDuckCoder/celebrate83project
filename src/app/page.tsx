"use client";

import { createDocument, getDocuments } from "@/lib/action/room.action";
import { getCurrentUser } from "@/lib/action/user.action";
import { Lobster, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

import HelloScreen from "@/components/HelloScreen";
import RoomControls from "@/components/RoomControl";
import SlidingSidebar from "@/components/SlidingSideBar";
import { useBackground } from "./useContext/bgContext";

type Room = {
  type: string;
  id: string;
  createdAt: Date;
  metadata: {
    title: string;
    userEmail: string;
  };
};

type RoomData = {
  data: Room[];
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nameGarden, setNameGarden] = useState<string>("");
  const [idGarden, setIdGarden] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setBackgroundImage } = useBackground();
  const router = useRouter();

  // Hiển thị HelloScreen trong 2.5s trước khi vào trang chính
  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundImage("/png/bg.png");
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateRoom = async () => {
    if (!nameGarden.trim()) {
      setError("Tên phòng không được để trống!");
      return;
    }
    setLoading(true);

    try {
      const user_ = await getCurrentUser();
      if (!user_) {
        setError("Bạn chưa đăng nhập!");

        router.push("/sign-in");

        setLoading(false);
        return;
      }

      const roomsData: RoomData = await getDocuments();

      if (roomsData && Array.isArray(roomsData.data)) {
        const existingRoom = roomsData.data.find(
          (roomdata: Room) => roomdata.metadata.userEmail === user_.email
        );

        if (existingRoom) {
          setError("Bạn đã có một phòng rồi!");
          setLoading(false);
          return;
        }
      }

      const room = await createDocument({
        title: nameGarden,
        userId: user_.id,
        userEmail: user_.email,
        // default
        linkBackground: "",
      });

      if (room) {
        router.push(`/classes/${room.id}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phòng:", error);
      setError("Đã có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!idGarden.trim()) {
      setError("ID phòng không được để trống!");
      return;
    }

    router.push(`/classes/${idGarden}`);
  };

  if (isLoading) {
    return <HelloScreen />;
  }

  return (
    <main className="flex h-full flex-col items-center pt-16">
      <RoomControls
        nameGarden={nameGarden}
        setNameGarden={setNameGarden}
        idGarden={idGarden}
        setIdGarden={setIdGarden}
        handleCreateRoom={handleCreateRoom}
        handleJoinRoom={handleJoinRoom}
        loading={loading}
      />

      {/* Popup lỗi */}
      {error && (
        <div className="absolute top-10 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-white font-bold"
          >
            ✖
          </button>
        </div>
      )}

      <div className="text-center flex flex-col items-center relative box-border z-0 w-full space-y-3 mb-7">
        <h1
          className={`${lobster.className} font-normal text-5xl text-black my-5 mx-1 drop-shadow-custom rotate-[-3deg] skew-x-[-4deg]`}
        >
          Happy Women&apos;s Day
        </h1>
        <p
          className={`${poppins.className} font-medium text-xl drop-shadow-custom2 text-black`}
        >
          Chung tay tạo những bông hoa <br></br>chúc mừng ngày 8/3
        </p>
      </div>

      <SlidingSidebar />
    </main>
  );
};

export default Home;
