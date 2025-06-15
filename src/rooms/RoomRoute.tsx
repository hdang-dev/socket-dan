import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
import { Context } from "../store";
import { ChatRoom } from "./ChatRoom";
import { CallRoom } from "./CallRoom";

export function RoomRoute() {
  const { state, dispatch } = useContext(Context);
  const { you } = state;
  const roomType = useParams().roomType!;
  const roomId = useParams().roomId!;
  const [message, setMessage] = useState("Connecting ...");
  const [isInRoom, setIsInRoom] = useState(false);
  const getRoomElement = () => {
    switch (roomType) {
      case "call":
        return <CallRoom />;
      default:
        return <ChatRoom />;
    }
  };

  useEffect(() => {
    socket.joinRoom(roomType, roomId, (status) => {
      if (status) {
        setIsInRoom(true);
        dispatch({ type: "JOIN_ROOM", roomType, roomId });
      } else {
        setMessage("Room is at capacity. Please join / create new room.");
      }
    });
    return () => {
      setIsInRoom(false);
      setMessage("Connecting ...");
    };
  }, [roomId]);

  useEffect(() => {
    if (isInRoom) {
      // console.log('join room ', roomType, roomId);
      // console.log('on in-room events here');
      socket.getUsers(roomId, (users) => {
        const others = users.filter((user) => user.id !== you.id);
        dispatch({ type: "ADD_USERS", users: others });
      });
      const offUserJoin = socket.onUserJoin((user) => {
        console.log("on join, user = ", user);
        dispatch({ type: "ADD_USERS", users: [user] });
      });
      const offUserLeave = socket.onUserLeave((userId) => {
        dispatch({ type: "REMOVE_USER", userId });
      });
      const offChangeName = socket.onChangeOtherName((user) => {
        console.log("on change name, user = ", user);

        dispatch({ type: "CHANGE_OTHER_NAME", user });
      });

      return () => {
        // console.log('off in-room events here');
        // console.log('leave room ', roomType, roomId);
        // console.log('-------------------------------------');
        offUserJoin();
        offUserLeave();
        offChangeName();
        socket.leaveRoom(roomId);
      };
    }
  }, [isInRoom]);

  return isInRoom ? getRoomElement() : <div className="w-full h-full grid place-items-center">{message}</div>;
}
