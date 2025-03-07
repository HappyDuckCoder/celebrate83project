"use client";

import React from "react";
import LoginButton from "./LoginButton";
import RoomAction from "./RoomAction";
import { PlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import JoinRoomButton from "./JoinRoomButton";

const RoomControls = ({
  nameGarden,
  setNameGarden,
  idGarden,
  setIdGarden,
  handleCreateRoom,
  handleJoinRoom,
  loading,
}: {
  nameGarden: string;
  setNameGarden: React.Dispatch<React.SetStateAction<string>>;
  idGarden: string;
  setIdGarden: React.Dispatch<React.SetStateAction<string>>;
  handleCreateRoom: () => void;
  handleJoinRoom: () => void;
  loading: boolean;
}) => {
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-4 p-5">
      <LoginButton />

      {/* Tạo phòng */}
      <RoomAction
        label="Tạo"
        placeholder="Nhập tên phòng"
        icon={PlusIcon}
        color="bg-blue-600"
        value={nameGarden}
        setValue={setNameGarden}
        handleAction={handleCreateRoom}
        loading={loading}
      />

      {/* Tham gia phòng */}
      <RoomAction
        label="Tham gia"
        placeholder="Nhập mã phòng"
        icon={ArrowRightOnRectangleIcon}
        color="bg-green-600"
        value={idGarden}
        setValue={setIdGarden}
        handleAction={handleJoinRoom}
      />
      <JoinRoomButton/>
    </div>
  );
};

export default RoomControls;
