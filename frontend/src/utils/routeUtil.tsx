import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: React.StatelessComponent<RouteComponentProps<any>> | React.StatelessComponent<any>;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export const ProtectedRoute = (props: PrivateRouteProps): React.ReactElement => {
    const username = localStorage.getItem('username');
    const { component: Component, ...rest }: PrivateRouteProps = props;
    const renderComponent: RenderComponent = props => {
        if (username) {
            return <Component {...props} />;
        }
        return <Redirect to="/" />;
    };
    return <Route {...rest} render={renderComponent} />;
};

export const AuthRoute = (props: PrivateRouteProps): React.ReactElement => {
    const username = localStorage.getItem('username');
    const { component: Component, ...rest }: PrivateRouteProps = props;
    const renderComponent: RenderComponent = props => {
        if (!username) {
            return <Component {...props} />;
        }
        return <Redirect to="/lobby" />;
    };
    return <Route {...rest} render={renderComponent} />;
};
