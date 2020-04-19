import socketIOClient from 'socket.io-client';
import { Users, SocketResponse } from '../utils/types';
const backendEndpoint = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4001/US';

interface Socket {
    on(event: string, callback: (data: { users?: Users; id?: string }) => void): void;
    off(event: string, callback: (data: object) => void): void;
    emit(event: string, data: object): void;
}

class CoupSocket {
    private static instance: CoupSocket;

    static getInstance(): CoupSocket {
        if (!CoupSocket.instance) {
            CoupSocket.instance = new CoupSocket();
        }
        return CoupSocket.instance;
    }

    socket: Socket;
    constructor() {
        const userId = localStorage.getItem('userId') || '';
        this.socket = socketIOClient(backendEndpoint, { query: `userId=${userId}` });
    }

    emit(eventType: string, data: object = {}): void {
        this.socket.emit(eventType, data);
    }

    on(eventType: string, cb: (data: SocketResponse) => void): void {
        this.socket.on(eventType, cb);
    }

    off(eventType: string, cb: (data: SocketResponse) => void): void {
        console.log('off method called for: ', eventType);
        this.socket.off(eventType, cb);
    }
}

export default CoupSocket.getInstance();
