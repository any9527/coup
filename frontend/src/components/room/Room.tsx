import React, { useState, useEffect, ReactElement } from 'react';
import CSS from 'csstype';

import coupSocket from '../../services/socket';
import { User, Users, SocketResponse } from '../../utils/types';

const userStatusStyle: CSS.Properties = {
    marginLeft: '5px',
    border: '1px solid #111',
    borderRadius: '3px',
    fontSize: '10px',
    padding: '2px',
};

const Room = (props: {
    match: {
        params: {
            id: string;
        };
    };
}): ReactElement => {
    const [users, setUsers] = useState<Users | undefined>([]);
    const [status, setStatus] = useState<string>('');
    const [creatorId, setCreatorId] = useState<string>('');
    const myId = localStorage.getItem('userId');

    useEffect(() => {
        console.log('useEffect in Room called');
        const cb = (data: SocketResponse): void => {
            if (data.status) setStatus(data.status);
            if (data.users) setUsers(data.users);
            if (data.creatorId) setCreatorId(data.creatorId);
        };
        coupSocket.emit('system.get_room', { roomId: props.match.params.id });
        coupSocket.on('system.get_room', cb);

        return (): void => coupSocket.off('system.get_room', cb);
    }, [props.match.params.id]);

    useEffect(() => {
        const cb = (data: SocketResponse): void => {
            console.log('data:', data);
            if (data.status) setStatus(data.status);
            if (data.users) setUsers(data.users);
        };
        coupSocket.on('room.game_started', cb);
        return (): void => coupSocket.off('room.game_started', cb);
    });

    const startGame = (): void => {
        console.log('start game to do');
        coupSocket.emit('room.start_game');
    };

    const showUser = (user: User): ReactElement => {
        if (status === 'pending') {
            const showStartGame = creatorId === myId && user.id === myId;
            return (
                <>
                    {user.name}
                    {showStartGame ? (
                        <button onClick={startGame}>Start Game</button>
                    ) : (
                        <span style={userStatusStyle}>{user.status}</span>
                    )}
                </>
            );
        }
        if (status === 'playing') {
            const isSelf = user.id === myId;
            return (
                <>
                    {user.name}
                    <span style={userStatusStyle}>{isSelf ? user.cards.join(' ') : 'xxxxx xxxxx'}</span>
                    <span style={userStatusStyle}>{user.coins}</span>
                </>
            );
        }
        return <>Invalid room status</>;
    };

    return (
        <div>
            Active users in room:
            <ul>
                {users?.map(u => (
                    <li key={u.id}>{showUser(u)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Room;
