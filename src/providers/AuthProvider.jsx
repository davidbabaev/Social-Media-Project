import React, { createContext, useContext, useEffect, useState } from 'react'
import { followUnfollowUser, loginUser, registerUser, updateUser, getSingleUser } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';
// import { useCardsProvider } from './CardsProvider';

const UseAuthCheck = createContext();
// const {refreshFeed} = useCardsProvider();

export function AuthProvider({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isUserLoaded , setIsUserLoaded] = useState(false)

    useEffect(() => {
        const handleAuth = async () => {
            // NEW: check if google just redirected here with a token
            const params = new URLSearchParams(window.location.search);
            const googleToken = params.get('token')
    
            if(googleToken){
                // handle Google login
                localStorage.setItem('auth-token', googleToken);
                const decoded = jwtDecode(googleToken);
                const userGoogle = await getSingleUser(decoded.userId)
                setUser(userGoogle);
                console.log(userGoogle);
                
                setIsLoggedIn(true);
                window.history.replaceState({}, document.title, '/')
            }
            else{
                // existing code stays here exactly as it is
                const savedLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    
                if(savedLoggedInUser){
                    setUser(savedLoggedInUser)
                    setIsLoggedIn(true) 
                } else{
                    setIsLoggedIn(false) 
                }
            }
            setIsUserLoaded(true);
        }
        handleAuth();
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
