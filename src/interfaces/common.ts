export type User = {
  id: string;
  name: string;
};

export type Room = {
  type: null | "global" | "chat" | "call";
  id: string;
  users: User[];
};
