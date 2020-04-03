import React, { ReactElement, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import socket from '../../services/socket';
import { useHistory } from 'react-router-dom';

const useStyles = createUseStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 200,
    },
});

const CreateRoom = (): ReactElement => {
    const [state, setState] = useState({ name: '', password: '' });
    const { name, password } = state;

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        socket.on('system.add_room', data => {
            const { id } = data;
            console.log(data);
            history.push(`/rooms/${id}`);
        });
    }, []);

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        socket.emit('system.add_room', { roomName: name, password });
    };

    const handleChange = (e: ChangeEvent): void => {
        const { value, name } = e.currentTarget as HTMLInputElement;
        setState({ ...state, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <input
                autoComplete="off"
                type="text"
                value={name}
                onChange={handleChange}
                name="name"
                placeholder="Room Name"
            />
            <input
                type="password"
                value={password}
                onChange={handleChange}
                name="password"
                placeholder="Room Password"
            />
            <button type="submit">Create Room</button>
        </form>
    );
};

export default CreateRoom;
