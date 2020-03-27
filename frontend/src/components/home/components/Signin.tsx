import React, { ReactElement, useState, ChangeEvent, FormEvent } from 'react';
import coupSocket from '../../../services/socket';
import { useHistory } from 'react-router-dom';

const Signin = (): ReactElement => {
    const [username, setUsername] = useState('');
    const history = useHistory();

    const handleChange = (e: ChangeEvent): void => {
        const { value } = e.currentTarget as HTMLInputElement;
        setUsername(value);
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        try {
            coupSocket.emit('system.add_user', { username });
            localStorage.setItem('username', username);
            history.push('/lobby');
        } catch (error) {
            throw error;
        }
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
