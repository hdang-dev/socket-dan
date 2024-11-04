/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Menu } from "../menu";
import { Outlet, useLocation } from "react-router-dom";
import { socketService as socket } from "../socket";
import { AppBackground, RoomBackground, MenuBackground } from "./SubComponents";
import { User } from "../interfaces";

export function AppLayout() {
  const { state, dispatch } = useContext(Context);
  const { you, room, display } = state;
  const location = useLocation();


  // const getRoomInfo = () => {
  //   const data = location.pathname === "/" ? ["global", "global"] : location.pathname.split("/").slice(1);
  //   const roomType = data[0];
  //   const roomId = data[1];
  //   return { roomType, roomId };
  // };

  // const initUser = () => {
  //   socket.getId((socketId) => {
  //     console.log('Your id is: ', socketId);
  //     // dispatch({ type: "INIT_USER", user: { name: "User #" + socketId.slice(0, 6), id: socketId } });

  //   });
  // };

  // const joinRoom = (roomId: string) => {
  // if (room.id) socket.leaveRoom(room.id);
  // socket.joinRoom(room.id);
  // socket.sendData(room.id, "new-user-join", you);
  // socket.receiveData<User>("new-user-join", (user) => {
  //   // dispatch({ type: "ADD_USER", user });
  //   console.log('New user join: ', user.id);
  //   socket.sendData(user.id, "existed-user", you);
  // });
  // socket.receiveData<User>("existed-user", (user) => {
  //   // dispatch({ type: "ADD_USER", user })
  //   console.log('A user was in this room: ', user.id);
  // });

  // socket.receiveData<User>("user-leave", (user) => {
  //   // dispatch({ type: "REMOVE_USER", user })
  //   console.log('A user leave this room: ', user.id);
  // });
  // socket.userDisconnect(id => {
  //   console.log('A user disconnect: ', id);
  // });
  // };

  // Init user
  useEffect(() => {
    socket.getId((id) => dispatch({ type: "INIT_USER", you: { id, name: "User #" + id.slice(0, 6) } }));
  }, []);

  // Join room whener path changes
  useEffect(() => {
    if (you) {
      const [roomType, roomId] = location.pathname === "/" ? ["global", "global"] : location.pathname.split("/").slice(1);
      const systemUser: User = { name: "System", id: "system" };
      const usersInRoom: User[] = roomId === 'global' ? [systemUser, you] : [you];

      if (room?.id) {
        socket.leaveRoom(room.id);
      }
      dispatch({ type: "CHANGE_ROOM", room: { type: roomType, id: roomId, users: usersInRoom } });
      socket.joinRoom(roomId);

    }
  }, [you?.id, location]);

  useEffect(() => {


    // socket.leaveRoom(prevRoom);

    // socket.receiveData("test", (text) => console.log(text));

    // socket.onDisconnect(() => socket.sendData(room.id, "test", "i leave"));

    // socket.receiveData<User>("user-leave", (user) => dispatch({ type: "REMOVE_USER", user }));
    // socket.onDisconnect(() => socket.sendData(roomId, "user-leave", you));
    return () => {
      // socket.sendData(room.id, "user-leave", you);
      // socket.sendData(room.id, "test", "i leave");
    };
  }, []);

  useEffect(() => {
    // if (socketReady) {
    //   const [roomType, roomId] = location.pathname === "/" ? ["global", "global"] : location.pathname.split("/").slice(1);
    //   const systemUser = { name: "System", id: "system" };
    //   if (roomType !== room.type || roomId !== room.id) {
    //     if (roomType === "global") {
    //       dispatch({ type: "CHANGE_ROOM", room: { type: roomType, id: roomId, users: [systemUser, you] } });
    //     } else {
    //       dispatch({ type: "CHANGE_ROOM", room: { type: roomType, id: roomId, users: [you] } });
    //     }
    //   }
    // }
  }, []);

  useEffect(() => {
    // if (room.id !== "") {
    // socket.joinRoom(room.id);
    // socket.sendData(room.id, "new-user-join", you);
    // socket.receiveData<User>("new-user-join", (user) => {
    //   // dispatch({ type: "ADD_USER", user });
    //   console.log('New user join: ', user.id);
    //   socket.sendData(user.id, "existed-user", you);
    // });
    // socket.receiveData<User>("existed-user", (user) => {
    //   // dispatch({ type: "ADD_USER", user })
    //   console.log('A user was in this room: ', user.id);
    // });

    // socket.receiveData<User>("user-leave", (user) => {
    //   // dispatch({ type: "REMOVE_USER", user })
    //   console.log('A user leave this room: ', user.id);
    // });
    // socket.userDisconnect(id => {
    //   console.log('A user disconnect: ', id);
    // });




    // socket.joinRoom(room.id);
    // socket.sendData(room.id, "new-user-join", you);
    // socket.receiveData<User>("new-user-join", (user) => {
    //   dispatch({ type: "ADD_USER", user });
    //   socket.sendData(user.id, "existed-user", you);
    // });
    // socket.receiveData("test", (text) => console.log(text));

    // socket.onDisconnect(() => socket.sendData(room.id, "test", "i leave"));

    // socket.receiveData<User>("existed-user", (user) => dispatch({ type: "ADD_USER", user }));
    // socket.onDisconnect(() => socket.sendData(roomId, "user-leave", you));
    // return () => {
    //   socket.sendData(room.id, "user-leave", you);
    // };
    // }
  }, []);


  console.log(state);

  return (
    <AppBackground>
      {/* Room content */}
      <div className={`w-full h-full transition-all duration-[1s] relative  ${display.menuVisible ? "opacity-0 -translate-x-full" : ""}`}>
        <RoomBackground>{you && <Outlet />}</RoomBackground>
      </div>

      {/* Menu */}
      <div className={`absolute inset-0 transition-all duration-[1s] ${display.menuVisible ? "" : "opacity-0 translate-x-full"}`}>
        <MenuBackground>
          {you && room && <Menu />}
        </MenuBackground>
      </div>

      {/* Menu button */}
      {you && (
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold outline-none"
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
          {/* {display.menuVisible ? "Back to Room" : `${room.type[0]?.toUpperCase()}${room.type.slice(1)} Room`} */}
        </button>
      )}
    </AppBackground>
  );
}
