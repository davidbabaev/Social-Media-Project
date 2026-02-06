import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export default function ProtectedRoute({children}) {

    const {isLoggedIn} = useAuth();

    if(isLoggedIn){
        // user logged in -> show the page
        return children
    }
    else{
        // if not logged in -> navigate to this page
        return <Navigate to={'/login'} />
    }
}
