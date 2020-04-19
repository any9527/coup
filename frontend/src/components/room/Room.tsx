import React, { useState, useEffect, ReactElement } from 'react';

import coupSocket from '../../services/socket';

type Users = Array<{
    id: string;
    name: string;
}>;

const Room = (props: {
    match: {
        params: {
            id: string;
        };
    };
}): ReactElement => {
    const [users, setUsers] = useState<Users | undefined>([]);

    useEffect(() => {
        const eventType = 'system.get_room';
        console.log('roomId:', props.match.params.id);
        const cb = (data: { users?: Users }) => {
            console.log('users in room:', data.users);
            setUsers(data.users);
        };
        coupSocket.emit(eventType, { roomId: props.match.params.id });
        coupSocket.on(eventType, cb);
        return () => coupSocket.off(eventType, cb);
    }, []);

    return (
        <div>
            Active users in room:
            <ul>
                {users?.map(u => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Room;
