export type User = {
  id?: string;
  name: string;
};

export type Room = {
  type: string;
  id: string;
  users: User[];
};
