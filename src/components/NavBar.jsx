import { useThemeContext } from '../providers/ThemeProvider';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useNotifications from '../hooks/useNotifications';
import Notifications from './Notifications';
import { AppBar, Avatar, Badge, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import ExploreIcon from '@mui/icons-material/Explore'
import PeopleIcon from '@mui/icons-material/People'
import AddBoxIcon from '@mui/icons-material/AddBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfileSettingsPopup from './ProfileSettingsPopup';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CreateCardModal from './CreateCardModal';

export default function NavBar() {

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileAvaterOpen, setIsProfileAvaterOpen] = useState(false);
    const {darkMode, handleToggle} = useThemeContext();
    const {isLoggedIn, user} = useAuth();
    const ref = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        notifications,
        handleDeleteNotification,
        unreadCount,
        handleMarkAsRead
      } = useNotifications();

    useEffect(() => {  
        const handler = (e) => {
            if(ref.current && !ref.current.contains(e.target)){
                setIsNotificationsOpen(false)
            }

            if(profileRef.current && !profileRef.current.contains(e.target)){
                setIsProfileAvaterOpen(false)
            }
        }
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    }, [])

    const navLinkSx = (path) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        px: 2,
        py: 1,
        color: location.pathname === path ? 'primary.main' : 'text.secondary',
        borderBottom: location.pathname === path ? '2px solid' : '2px solid transparent',
        borderColor: location.pathname === path ? 'primary.main' : 'transparent',
    })

  return (
    
    <AppBar 
        position='sticky'
        sx={{
            bgcolor: 'background.paper',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
        }}
    >
        <Container maxWidth="lg">
            <Toolbar disableGutters>
                <Box 
                    onClick={() => navigate('/')} 
                    sx={{cursor: 'pointer', mr: 4}}
                >
                    <img src="/src/assets/mirage_logo.svg" height='36' alt='mirage'/>
                </Box>

                <Box sx={{display: 'flex', flex: '1'}}>
                    <Box
                        onClick={() => navigate('/')}
                        sx={navLinkSx('/')}
                        >
                        <HomeIcon fontSize='small'/>
                        <Typography variant='caption'>Feed</Typography>
                    </Box>

                    <Box
                        onClick={() => navigate('/allusers')}
                        sx={navLinkSx('/allusers')}
                        >
                        <PeopleIcon fontSize='small'/>
                        <Typography variant='caption'>Users</Typography>
                    </Box>

                    <Box
                        onClick={() => navigate('/allcards')}
                        sx={navLinkSx('/allcards')}
                        >
                        <ExploreIcon fontSize='small'/>
                        <Typography variant='caption'>Explore Posts</Typography>
                    </Box>

                    {isLoggedIn && (
                        <Box
                            sx={navLinkSx('/createnewcard')}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <AddBoxIcon fontSize='small'/>
                            <Typography 
                                variant='caption'
                            >
                                Add Post
                            </Typography>
                        </Box>
                    )}
                </Box>

                {isModalOpen && (
                    <CreateCardModal
                        // onCardPosted={() => refreshFeed()}
                        onClose={() => setIsModalOpen(false)}
                        // mediaButton={mediaType}
                    />
                )}

                <Box
                    onClick={() => handleToggle()}
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.primary'
                        }
                    }}
                >
                    {
                        darkMode ? (
                            <LightModeIcon/>
                        ) : (
                            <DarkModeIcon/>
                        )
                    }
                </Box>

                {isLoggedIn ? (
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Box ref={ref} style={{position: 'relative'}}>
                                <IconButton
                                    onClick ={async() => {
                                    setIsNotificationsOpen(!isNotificationsOpen)
                                    if(!isNotificationsOpen){
                                        await handleMarkAsRead()   
                                    }
                                    }} 
                                >
                                    <Badge badgeContent={unreadCount}>
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>

                                {isNotificationsOpen && (
                                    <Notifications 
                                        countValue = {unreadCount}
                                        notificationsValue = {notifications}
                                        handleDeleteNotificationValue = {handleDeleteNotification}
                                    />
                                )}  
                            </Box>
                        </Box>

                        <Box ref={profileRef} position={'relative'}>
                            <Avatar
                                sx={{cursor: 'pointer'}} 
                                src={user?.profilePicture}
                                onClick={() => setIsProfileAvaterOpen(!isProfileAvaterOpen)}
                                />

                            {isProfileAvaterOpen && (
                                <ProfileSettingsPopup/>
                            )}
                        </Box>
                    </Box>
                ): (
                    <Box>
                        <Button variant="outlined" onClick={() => navigate('/login')}>login</Button>
                        <Button variant="outlined" onClick={() => navigate('/registered')}>Register</Button>
                    </Box>
                )}


            </Toolbar>
        </Container>
    </AppBar>

  )
}
