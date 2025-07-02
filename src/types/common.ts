export type TUser = {
  id: string;
  name: string;
};

export type TRoom = {
  id: string;
  type: string;
  users: TUser[];
};

export type TTheme = {
  background: string;
  planet: string;
  animation: string;
  active: boolean;
};
