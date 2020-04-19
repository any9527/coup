import React, { useState, useEffect, ReactElement } from 'react';

import coupSocket from '../../services/socket';
import { Users } from '../../utils/types';

const Room = (props: {
    match: {
        params: {
            id: string;
        };
    };
}): ReactElement => {
    const [users, setUsers] = useState<Users | undefined>([]);

    useEffect(() => {
        console.log('useEffect in Room called');
        const eventType = 'system.get_room';
        const cb = (data: { users?: Users }): void => {
            console.log('users in room:', data.users);
            setUsers(data.users);
        };
        coupSocket.emit(eventType, { roomId: props.match.params.id });
        coupSocket.on(eventType, cb);
        return (): void => coupSocket.off(eventType, cb);
    }, [props.match.params.id]);

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
