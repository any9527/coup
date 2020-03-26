import React, { ReactElement } from 'react';
import Header from './components/Header';
import Signin from './components/Signin';

const Home = (): ReactElement => {
    return (
        <div>
            <Header />
            <Signin />
        </div>
    );
};

export default Home;
