import React, { useState, useEffect, ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';

import coupSocket from '../../services/socket';
import CreateRoom from './CreateRoom';
import { Users, Rooms } from '../../utils/types';

const Lobby = (): ReactElement => {
    const [users, setUsers] = useState<Users | undefined>([]);
    const [rooms, setRooms] = useState<Rooms | undefined>([]);

    const history = useHistory();

    useEffect(() => {
        const eventType = 'system.get_users';
        const cb = (data: { users?: Users }): void => {
            console.log('data.users:', data.users);
            setUsers(data.users);
        };
        coupSocket.emit(eventType);
        coupSocket.on(eventType, cb);
        return (): void => coupSocket.off(eventType, cb);
    }, []);

    useEffect(() => {
        const eventType = 'system.get_rooms';
        const cb = (data: { rooms?: Rooms }): void => {
            console.log('data.rooms:', data.rooms);
            setRooms(data.rooms);
        };
        coupSocket.emit(eventType);
        coupSocket.on(eventType, cb);
        return (): void => coupSocket.off(eventType, cb);
    }, []);

    const handleLogout = (): void => {
        const userId = localStorage.getItem('userId');
        coupSocket.emit('system.log_out', { userId });
        localStorage.clear();
    };

    useEffect(() => {
        const eventType = 'room.add_user';
        const cb = (data: { roomId?: string }): void => {
            console.log('room add user result:', data);
            if (data.roomId) {
                history.push(`/rooms/${data.roomId}`);
            }
        };
        coupSocket.on(eventType, cb);
        return (): void => coupSocket.off(eventType, cb);
    }, [history]);

    const handleJoinRoom = (roomId: string): void => {
        const userId = localStorage.getItem('userId');
        coupSocket.emit('room.add_user', { roomId, userId });
    };

    return (
        <div>
            <div>
                <Link to="/">
                    <button onClick={handleLogout}>Log Out</button>
                </Link>
            </div>
            Active users:
            <ul>
                {users?.map(u => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
            Active rooms:
            <ul>
                {rooms?.map(r => (
                    <li key={r.id}>
                        {r.name}
                        <button
                            onClick={e => {
                                handleJoinRoom(r.id);
                            }}
                        >
                            Join
                        </button>
                    </li>
                ))}
            </ul>
            <CreateRoom />
        </div>
    );
};

export default Lobby;
