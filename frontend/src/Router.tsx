import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Lobby from './components/lobby/Lobby';

import { AuthRoute, ProtectedRoute } from './utils/routeUtil';

const Router = (): ReactElement => (
    <Switch>
        <ProtectedRoute path="/lobby" component={Lobby} />
        <AuthRoute path="/" component={Home} />
        {/* <ProtectedRoute path="/rooms/:id" component={Home} /> */}
    </Switch>
);

export default Router;
