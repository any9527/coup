import React, { ReactElement, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import coupSocket from '../../../services/socket';
import { useHistory } from 'react-router-dom';

const Signin = (): ReactElement => {
    const [username, setUsername] = useState('');
    const history = useHistory();

    const handleChange = (e: ChangeEvent): void => {
        const { value } = e.currentTarget as HTMLInputElement;
        setUsername(value);
    };

    useEffect(() => {
        const eventType = 'system.add_user';
        const cb = (data: { id?: string }): void => {
            console.log('system.add_user:', data.id);
            if (data.id) {
                localStorage.setItem('username', username);
                localStorage.setItem('userId', data.id);
                history.push('/lobby');
            }
        };
        coupSocket.on(eventType, cb);
        return (): void => coupSocket.off(eventType, cb);
    }, [history, username]);

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        coupSocket.emit('system.add_user', { username });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={handleChange} />
                <button>Enter the arena</button>
            </form>
        </div>
    );
};

export default Signin;
