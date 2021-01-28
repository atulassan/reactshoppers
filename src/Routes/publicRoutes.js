import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoutes = ({ component: Component, ...otherProps }) => {

    const auth = useSelector( state => state.auth );

    return <Route {...otherProps} component={(props)=> (
        !auth.isLoggedIn ?
            <Component {...props} />
        :
            <Redirect to="/myaccount" />
    )} />
};

export default PublicRoutes;