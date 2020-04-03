import React, { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import coupSocket from '../../services/socket';

type Users = string[];

const Lobby = (): ReactElement => {
    const [users, setUsers] = useState<Users | undefined>([]);

    useEffect(() => {
        // ask for users
        coupSocket.emit('system.get_users');
        coupSocket.on('system.get_users', data => {
            console.log('data', data);
            setUsers(data.users);
        });
    }, []);

    const handleLogout = (): void => {
        coupSocket.emit('system.log_out');
        localStorage.removeItem('username');
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
                    <li>{u}</li>
                ))}
            </ul>
        </div>
    );
};

export default Lobby;
