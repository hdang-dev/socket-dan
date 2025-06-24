export type TUser = {
  id: string;
  name: string;
};

export type TRoom = {
  id: string;
  type: string;
};

export type TInRoomInfo = {
  room: TRoom;
  users: TUser[];
};
