import React, { useState } from 'react'
import { loginUser, registerUser } from './apiSeviceRecall';

export default function RecallLoginRegister() {

    const [user, setUser] = useState('');

    
    const handleLogin = async (data) => {
        try{
            // response 
            const response = await loginUser(data)
            localStorage.setItem('auth-token', response.token)
            setUser(response.safeUser)
            loggedInUser(true)

            return{
                success: true,
                message: "user logged-in successfully"
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    const handleRegister = async (data) => {
        try{

            const response = await registerUser(data)
            localStorage.setItem('auth-token', response.token)
            setUser(response.safeUser)
            isLoggedIn(true)
            
            return{
                success: true,
                message: "register successfully"
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }





    


  return {}
}
