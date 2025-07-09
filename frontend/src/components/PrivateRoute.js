import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
    const token = localStorage.getItem('token');
    return token ? <Route {...rest} element={Element} /> : <Navigate to="/login" />;
}

export default PrivateRoute;