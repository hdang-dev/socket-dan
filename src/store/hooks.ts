import { useContext } from "react";
import { StoreContext } from "./provider";
import { TRoom, TUser } from "../types/common";

export const useStore = () => {
  const { state, setState } = useContext(StoreContext);
  const { profile, room, theme } = state;

  const initProfile = (profile: TUser) => {
    setState({ ...state, profile });
  };

  const joinRoom = (room: TRoom) => {
    setState({ ...state, room });
  };

  const leaveRoom = () => {
    setState({ ...state, room: null });
  };

  const addUser = (user: TUser) => {
    setState({ ...state, room: { ...state.room!, users: [...state.room!.users, user] } });
  };

  const removeUser = (userId: string) => {
    const filteredUsers = state.room!.users.filter((user) => user.id !== userId);
    setState({ ...state, room: { ...state.room!, users: filteredUsers } });
  };

  const updateUserName = (user: TUser) => {
    const index = room!.users.findIndex((inRoomUser) => inRoomUser.id === user.id);
    const newUsers = [...room!.users.slice(0, index), user, ...room!.users.slice(index + 1)];
    setState({ ...state, room: { ...room!, users: newUsers } });

    if (user.id === profile?.id) {
      setState({ ...state, profile: user });
    }
  };

  const setThemeActive = (active: boolean) => {
    setState({ ...state, theme: { ...theme, active } });
  };

  const setBackground = (background: string) => {
    setState({ ...state, theme: { ...theme, background } });
  };

  const setPlanet = (planet: string, animation: string) => {
    setState({ ...state, theme: { ...theme, planet, animation } });
  };

  return {
    profile,
    room,
    theme,
    initProfile,
    joinRoom,
    leaveRoom,
    addUser,
    removeUser,
    updateUserName,
    setThemeActive,
    setBackground,
    setPlanet,
  };
};
