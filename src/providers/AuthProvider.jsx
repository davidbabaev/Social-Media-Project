import React, { createContext, useContext, useEffect, useState } from 'react'
import { followUnfollowUser, loginUser, registerUser, updateUser } from '../services/apiService';

const UseAuthCheck = createContext();

export function AuthProvider({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isUserLoaded , setIsUserLoaded] = useState(false)

    useEffect(() => {
        const savedLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

        if(savedLoggedInUser){
            setUser(savedLoggedInUser)
            setIsLoggedIn(true) 
        } else{
            setIsLoggedIn(false) 
        }
        setIsUserLoaded(true);
    }, [])

    useEffect(() => {
        if(!isUserLoaded) return;
        localStorage.setItem('loggedInUser', JSON.stringify(user))
    }, [user, isUserLoaded])


    const handleRegister = async (user) => {
        try{
            const response = await registerUser(user);
            localStorage.setItem('auth-token', response.token);
            setUser(response.safeUser);
            setIsLoggedIn(true);
            return{
                success: true,
                message: 'registered successfully'
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    const handleLogin = async (email, password) => {
        try{
            const response = await loginUser({email, password});
            localStorage.setItem('auth-token', response.token)
            setUser(response.safeUser)
            setIsLoggedIn(true);

            return{
                success: true,
                message: 'Logged in successfully'
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    const handleToggleFollow = async (userId) => {
        try{
            const response = await followUnfollowUser(userId);
            setUser(response)

            return{
                success: true,
                message: "Followed Successfully"
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false);
        setUser(null);
    }

    const editUser = async (userId, updatedFields) => {
        try{
            const response = await updateUser(userId, updatedFields);
            setUser(response);
            return{
                success: true,
                message: 'Edited Successfully'
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    
  return (
    <UseAuthCheck.Provider 
        value={{isLoggedIn, user, handleLogin, handleLogout, handleRegister, editUser, setUser, handleToggleFollow, isUserLoaded}}>
            {children}
    </UseAuthCheck.Provider>
  )
}

export function useAuth(){
    return useContext(UseAuthCheck)
}
