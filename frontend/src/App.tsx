import socketIOClient from 'socket.io-client';
import React, { useState, useEffect, ReactElement } from 'react';
import logo from './logo.svg';
import './App.css';

interface ResponseType {
    connected: boolean;
}

const App = (): ReactElement => {
    const [response, setResponse] = useState({ connected: false });
    const [endpoint] = useState(process.env.REACT_APP_BACKEND_URL || 'http://localhost:4001/US');

    useEffect(() => {
        const socket = socketIOClient(endpoint);
        socket.on('connection', (data: ResponseType) => {
            setResponse(data);
        });
    }, [endpoint]);

    return response.connected ? (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    ) : (
        <>Sorry No Connection</>
    );
};

export default App;
