import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';

const Router = (): ReactElement => (
    <Switch>
        {/* <Route path="/rooms/:id" /> */}
        <Route path="/" component={Home} />
    </Switch>
);

export default Router;
