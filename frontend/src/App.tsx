import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const App = (): ReactElement => {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};

export default App;
