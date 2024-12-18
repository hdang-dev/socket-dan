import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { Context } from "../context";
import { useParams } from "react-router-dom";

interface RoomWrapperProps {
    roomType: string;
    children: React.ReactNode;
}

export function RoomWrapper({ roomType, children }: RoomWrapperProps) {
    const { dispatch } = useContext(Context);
    const [overCapacity, setOverCapacity] = useState(false);
    const roomId = useParams().roomId!;

    // useEffect(() => {
    //     let joinStatus = false;
    //     socket.joinRoom(roomType, roomId, (status) => {
    //         joinStatus = status;
    //         if (joinStatus) {
    //             socket.onUserJoin((user) => {
    //                 dispatch({ type: "ADD_USERS", users: [user] });
    //             });
    //             socket.onUserLeave((userId) => {
    //                 dispatch({ type: "REMOVE_USER", userId });
    //             });
    //             socket.onChangeName((user) => {
    //                 dispatch({ type: "CHANGE_OTHER_NAME", user });
    //             });
    //         } else {
    //             setOverCapacity(true);
    //         }
    //     });
    //     return () => {
    //         if (joinStatus) {
    //             socket.leaveRoom(roomId);
    //             console.log('=====================');
    //         }
    //     };
    // }, [roomId]);

    return overCapacity ? <div>Nope!</div> : <>{children}</>;
}