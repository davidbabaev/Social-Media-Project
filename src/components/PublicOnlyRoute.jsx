import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Navigate } from 'react-router-dom'

export default function PublicOnlyRoute({children}) {
  
    const {isLoggedIn, isUserLoaded} = useAuth()

    if(!isUserLoaded){
        return <p>Loading...</p>
    }

    if(isLoggedIn){
        return <Navigate to={'/'}/>
    }
    else{
        return children
    }
}
