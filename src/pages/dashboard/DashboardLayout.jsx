import React, { useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import SelectedPage from './SelectedPage'
import ProfileSection from './ProfileSection'
import MyCardsSection from './MyCardsSection'
import FavoriteCards from './FavoriteCards'
import useFollowUser from '../../hooks/useFollowUser'
import { useAuth } from '../../providers/AuthProvider'
import { useCardsProvider } from '../../providers/CardsProvider'
import { Avatar, Box, Button, Container, Paper, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../../components/ConfirmationDialog'
import useUsers from '../../hooks/useUsers'

export default function DashboardLayout() {

    const {user, handleLogout} = useAuth();
    const {handleDeleteUser, getUsers} = useUsers();  
    const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const onLogOut = () => {
        handleLogout();
        navigate('/login');
    }
      

    const {getFollowersCount} = useFollowUser();
    const {registeredCards, refreshFeed, fetchCards} = useCardsProvider();
    const postsAmount = registeredCards.filter((card) => card.userId === user._id).length

    if(!user){
        return <p>Loading..</p>
    }

    return (
        <Container maxWidth='lg'>

            <Paper
                elevation={0}
                sx={{
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    my:2,
                    borderRadius: 4,
                }}
            >
                {/* Cover Image */}
                <Box
                    sx={{
                        width: '100%',
                        height: 230,
                        borderRadius: 4,
                        backgroundImage: `url(${user?.coverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}       
                />

                <Box 
                    sx={{
                        mb:1,
                        display: 'flex',
                    }} 
                    onClick={() => navigate(`/profiledashboard/${user?._id}/following`)}
                >
                    <Avatar
                        src={user?.profilePicture}
                        sx={{
                            mt: '-100px', 
                            width: 180,
                            height: 180,
                            mx:3,
                            border: '4px solid',
                            borderColor: 'background.paper',
                            cursor: 'pointer',
                        }}
                    />

                    {/* Stats row */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'start',
                        gap: 3,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        mr: 2
                    }}>
                        <Box 
                            textAlign='center'
                            onClick={() => navigate(`/profiledashboard/${user?._id}/followers`)}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <Typography 
                                fontWeight={600}
                                fontSize={16}
                            >
                                {getFollowersCount(user?._id)}
                            </Typography>

                            <Typography 
                                fontSize={16}
                                color='text.secondary'
                            >
                                followers
                            </Typography>
                        </Box>

                        <Box 
                            textAlign='center'
                            onClick={() => navigate(`/profiledashboard/${user?._id}/following`)}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <Typography 
                                fontWeight={600}
                                fontSize={16}
                            >
                                {(user?.following || []).length}
                            </Typography>

                            <Typography 
                                fontSize={16}
                                color='text.secondary'
                            >
                                following
                            </Typography>
                        </Box>

                        <Box 
                            textAlign='center'
                            onClick={() => navigate(`/profiledashboard/${user?._id}/profilemain`)}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <Typography 
                                fontWeight={600}
                                fontSize={16}
                            >
                                {postsAmount}
                            </Typography>

                            <Typography 
                                fontSize={16}
                                color='text.secondary'
                            >
                                posts
                            </Typography>
                        </Box>
                    </Box>

                </Box>
                
                <Box sx={{display: 'flex', justifyContent: 'space-between', pr:2 }}>
                    {/* Name, Job, Location */}
                    <Box sx={{mx: 3, mb:2}}>
                        <Typography 
                            fontWeight={600} 
                            fontSize={25}
                            onClick={() => navigate(`/profiledashboard/${user?._id}/profilemain`)}
                            sx={{cursor: 'pointer'}}
                        >
                            {user?.name} {user?.lastName}
                        </Typography>

                        <Typography 
                            fontSize={13} 
                            color='text.secondaty' 
                            sx={{mb: -0.5}}
                        >
                            {user?.job}
                        </Typography>

                        <Typography fontSize={12} color='text.disabled'>
                            {user?.address.country}, {user?.address.city}
                        </Typography>
                    </Box>
                    
                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

                        {editMode === false && (
                            <Button 
                                variant='contained'
                                size='small'
                                sx={{borderRadius: 5, px: 2, py:1, fontSize: 12}}
                                endIcon={<EditIcon/>}
                                onClick={() => setEditMode(true)}
                                
                            >
                                Edit Profile
                            </Button>
                        )}
                        
                        {!user.isAdmin && (
                            <Button 
                                variant='outlined'
                                color='error'
                                size='small'
                                sx={{borderRadius: 5, px: 2, py:1, fontSize: 12}}
                                endIcon={<DeleteIcon/>}
                                onClick={() => setConfirmDeleteUser(user)}
                            >
                                Delete Profile
                            </Button>
                        )}
                    </Box>
                </Box>

            </Paper>

            <Tabs sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
                value={location.pathname}
            >
                <Tab 
                    label='Profile' 
                    value='/dashboard/myprofile'
                    onClick={() => navigate('/dashboard/myprofile')}
                    />

                <Tab 
                    label='My Posts'
                    value='/dashboard/mycards'
                    onClick={() => navigate('/dashboard/mycards')}
                    />

                <Tab 
                    label='Favorite Users' 
                    value='/dashboard/myfavorites'
                    onClick={() => navigate('/dashboard/myfavorites')}
                    />

                <Tab 
                    label='Favorite Posts' 
                    value='/dashboard/myfavoritescards'
                    onClick={() => navigate('/dashboard/myfavoritescards')}
                />
            </Tabs>

            <Routes>
                <Route path='/myprofile' element={<ProfileSection
                    editMode = {editMode} // flase by default
                    onEditMode={() => setEditMode(true)}
                    onCloseEdit={() => setEditMode(false)}
                />}/>
                <Route path='/mycards' element={<MyCardsSection/>}/>
                <Route path='/myfavorites' element={<SelectedPage/>}/>
                <Route path='/myfavoritescards' element={<FavoriteCards/>}/>
            </Routes>

            {confirmDeleteUser && (
                <ConfirmationDialog
                    message={`Delete user ${confirmDeleteUser.name} ${confirmDeleteUser.lastName}?`}
                    onClose={() => setConfirmDeleteUser(null)}
                    onConfirm={async () => {
                        await handleDeleteUser(confirmDeleteUser._id);
                        await getUsers();
                        await fetchCards();
                        await refreshFeed();
                        setConfirmDeleteUser(null);
                        onLogOut();
                    }}
                />
            )}
        </Container>
    )
}
