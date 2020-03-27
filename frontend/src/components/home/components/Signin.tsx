import React, { ReactElement, useState, ChangeEvent } from 'react';
import coupSocket from '../../../services/socket';

const Signin = (): ReactElement => {
    const [username, setUsername] = useState('');

    const handleChange = (e: ChangeEvent): void => {
        const { value } = e.currentTarget as HTMLInputElement;
        setUsername(value);
    };

    const handleSubmit = (): void => {
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
