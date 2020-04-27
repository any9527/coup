export type User = {
    id: string;
    name: string;
};
export type Users = Array<User>;

export type Room = {
    id: string;
    name: string;
};

export type Rooms = Array<Room>;

export type SocketResponse = {
    users?: Users;
    rooms?: Rooms;
    id?: string;
    success?: boolean;
    roomId?: string;
};
