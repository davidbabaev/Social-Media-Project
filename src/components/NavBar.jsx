import React, { useState } from 'react'
import { useThemeContext } from '../providers/ThemeProvider';
import { useAuth } from '../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAllUsers from '../hooks/useAllUsers';

export default function NavBar() {

    const {darkMode, handleToggle} = useThemeContext();
    const{handleLogout, isLoggedIn, user} = useAuth();
    const navigate = useNavigate();

    const {allUsers} = useAllUsers();

    const onLogOut = () => {
        handleLogout();
        navigate('/login');
    }

    const mystyle = {marginRight: '8px'}

    const loggeduser = allUsers.find((userL) => userL.userId === user?.userId)

  return (
    <div>
        {isLoggedIn && (<p>Logged In As: {user?.name} {loggeduser?.lastName}</p>)}
        
        <button onClick={handleToggle}>
            {darkMode ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button onClick={onLogOut}>
            logout
        </button>
        <nav>
            <Link style={mystyle} to={'/'}>Home</Link>
            <Link style={mystyle} to={'/login'}>login</Link>
            <Link style={mystyle} to={'/dashboard/myprofile'}>user dashboard</Link>
            <Link style={mystyle} to={'/registered'}>register</Link>
            <Link style={mystyle} to={'/allusers'}>all users</Link>
            <Link style={mystyle} to={'/createnewcard'}>create card</Link>
            <Link style={mystyle} to={'/allcards'}>all cards</Link>
            <button onClick={() => navigate('/dashboard/myfavorites')}>Selected</button>
        </nav>
    </div>
  )
}
