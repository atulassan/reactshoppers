import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoutes = ({ user, component: Component, ...rest }) => {

    const auth = useSelector( state => state.auth );

    return <Route {...rest} component={(props)=> (
        rest.restricted ?
            ( user ?
                <Redirect to="/dashboard"/>
                :
                <Component {...props} user={user}/>
            )
        :
        <Component {...props} user={user}/>
    )}/>
};

export default PublicRoutes;