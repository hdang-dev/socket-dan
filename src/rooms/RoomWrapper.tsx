import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { socket } from "../socket";
import { useNavigate, useParams } from "react-router-dom";

interface RoomWrapperProps {
  roomType: string;
  children: React.ReactNode;
}

export function RoomWrapper({ roomType, children }: RoomWrapperProps) {
  const { state, dispatch } = useContext(Context);
  const { you } = state;
  const roomId = useParams().roomId!;
  const [processText, setProcessText] = useState("Requesting to join room ...");

  useEffect(() => {}, []);

  return <>{children}</>;
}
