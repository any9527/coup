export type Card = 'Assassin' | 'Captain' | 'Ambassador' | 'Duke' | 'Contessa';
export type Cards = Array<Card>;

export type User = {
    id: string;
    name: string;
    status: string;
    coins: number;
    cards: Cards;
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
    creatorId?: string;
    status?: string;
    cards: Cards;
    coins: number;
};
