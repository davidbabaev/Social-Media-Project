import { useThemeContext } from '../providers/ThemeProvider';
import { useAuth } from '../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useNotifications from '../hooks/useNotifications';
import Notifications from './Notifications';

export default function NavBar() {

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const {darkMode, handleToggle} = useThemeContext();
    const {handleLogout, isLoggedIn, user} = useAuth();
    const ref = useRef(null);
    const navigate = useNavigate();
    const {
        notifications,
        handleDeleteNotification,
        unreadCount,
        handleMarkAsRead
      } = useNotifications();

    const onLogOut = () => {
        handleLogout();
        navigate('/login');
    }

    useEffect(() => {  
        const handler = (e) => {
            if(ref.current && !ref.current.contains(e.target)){
                setIsNotificationsOpen(false)
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    }, [])

    const mystyle = {marginRight: '8px'}

  return (
    <div>
        {isLoggedIn && (<p>Logged In As: {user?.name} {user?.lastName}</p>)}
        
        <button onClick={handleToggle}>
            {darkMode ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button onClick={onLogOut}>
            logout
        </button>
            <nav style={{display: 'flex', alignItems: 'center'}}>
                <Link style={mystyle} to={'/'}>Feed</Link>
                {/* <Link style={mystyle} to={'/recall'}>Recall</Link> */}
                { !isLoggedIn && (
                    <>
                        <Link style={mystyle} to={'/login'}>login</Link>
                        <Link style={mystyle} to={'/registered'}>register</Link>
                    </>
                )}
                {user?.isAdmin && (<Link style={mystyle} to={`/admindashboard/overviewpanel`}>Admin Dashboard</Link>)}
                <Link style={mystyle} to={'/dashboard/myprofile'}>user dashboard</Link>
                <Link style={mystyle} to={'/allusers'}>all users</Link>
                <Link style={mystyle} to={'/createnewcard'}>create card</Link>
                <Link style={mystyle} to={'/allcards'}>all cards</Link>

                { isLoggedIn && (<div ref={ref} style={{position: 'relative'}}>
                    <button 
                        style={{padding: '8px', border: 'none', borderRadius: '10px', cursor: 'pointer'}}
                        onClick ={async() => {
                            setIsNotificationsOpen(!isNotificationsOpen)
                            if(!isNotificationsOpen){
                                await handleMarkAsRead()   
                            }
                        }} 
                    >
                        🔔{unreadCount > 0 && 
                        <span 
                            style={{
                                backgroundColor: 'red', 
                                padding: '5px', 
                                borderRadius: '100px', 
                                color: 'white',
                            }}>
                                {unreadCount}
                        </span>
                        }
                    </button>

                    {isNotificationsOpen && (
                        <Notifications 
                            countValue = {unreadCount}
                            notificationsValue = {notifications}
                            handleDeleteNotificationValue = {handleDeleteNotification}
                        />
                    )}
                </div>)}

                
                <button onClick={() => navigate('/dashboard/myfavorites')}>Selected</button>

            </nav>
    </div>
  )
}
