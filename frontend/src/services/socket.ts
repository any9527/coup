import socketIOClient from 'socket.io-client';
const backendEndpoint = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4001/US';

interface Socket {
    on(event: string, callback: (data: object) => void): void;
    emit(event: string, data: object): void;
}

class CoupSocket {
    socket: Socket;
    constructor() {
        this.socket = socketIOClient(backendEndpoint);
    }

    emit(eventType: string, data: object): void {
        this.socket.emit(eventType, data);
    }
}

const coupSocket = new CoupSocket();
export default coupSocket;
