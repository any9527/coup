import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Lobby from './components/lobby/Lobby';
import Room from './components/room/Room';

import { AuthRoute, ProtectedRoute } from './utils/routeUtil';

const Router = (): ReactElement => (
    <Switch>
        <ProtectedRoute path="/lobby" component={Lobby} />
        <ProtectedRoute path="/rooms/:id" component={Room} />
        <AuthRoute path="/" component={Home} />
    </Switch>
);

export default Router;
