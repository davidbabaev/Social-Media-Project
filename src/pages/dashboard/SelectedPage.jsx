import React from 'react'
import { useNavigate } from 'react-router-dom';
import useSelectedUsers from '../../hooks/useSelectedUsers';
import { Avatar, Box, Button, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useCardsProvider } from '../../providers/CardsProvider';
import useFollowUser from '../../hooks/useFollowUser';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';



export default function SelectedPage() {

    const {selectedUsers, handleRemoveUser} = useSelectedUsers()
    const {registeredCards} = useCardsProvider();
    const{getFollowersCount, toggleFollow, isFollowByMe} = useFollowUser();
    const {refreshFeed} = useCardsProvider();
    const navigate = useNavigate();

  return (


    <Container 
        maxWidth='lg' 
        sx={{
            display: 'flex', 
            flexWrap: 'wrap',
            py: 3, 
            gap: 2,
            width: '100%',
            justifyContent: 'center'
        }}
    >
        {!selectedUsers[0] && (<Typography color='text.secondary'>You didn't selected users yet</Typography>)}

        {selectedUsers.map((selected) => {
            const myCardsCount = registeredCards.filter(card => card.userId === selected?._id).length;

            return(
                <Paper 
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '0.5px solid',
                        borderColor: 'divider',
                        overflow: 'hidden',
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                        mb:2,
                    }}
                    key={selected._id}
                >
                    <Box sx={{position: 'relative'}}>
                        {/* Cover Image */}
                        <Box
                            sx={{
                                width: '100%',
                                height: 80,
                                backgroundImage: `url(${selected?.coverImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}       
                        />



                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                p:0.5,
                                '&:hover': {bgcolor: 'rgba(0,0,0,0.7)'}
                            }}
                            onClick={() => handleRemoveUser(selected)}
                        >
                            <CloseIcon fontSize='small'/>
                        </IconButton>

                    </Box>

                    <Box 
                        sx={{mt: '-40px', mb:1}} 
                        onClick={() => navigate(`/profiledashboard/${selected?._id}/profilemain`)}
                    >
                        <Avatar
                            src={selected?.profilePicture}
                            sx={{
                                width: 80,
                                height: 80,
                                border: '2px solid',
                                borderColor: 'background.paper',
                                margin: '0 auto',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                    
                    {/* Name, Job, Location */}
                    <Box sx={{px:2, pb:2}}>
                        <Typography 
                            fontWeight={600} 
                            fontSize={16}
                            onClick={() => navigate(`/profiledashboard/${selected?._id}/profilemain`)}
                            sx={{cursor: 'pointer'}}
                        >
                            {selected?.name} {selected?.lastName}
                        </Typography>

                        <Typography 
                            fontSize={13} 
                            color='text.secondaty' 
                            sx={{mb: -0.5}}
                        >
                            {selected?.job}
                        </Typography>

                        <Typography fontSize={12} color='text.disabled'>
                            {selected?.address.country}, {selected?.address.city}
                        </Typography>
                    </Box>

                    {/* Stats row */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 3,
                        px: 2,
                        pb: 2,
                        borderTop: '0.5px solid',
                        borderColor: 'divider',
                        pt: 2
                    }}>
                        <Box 
                            textAlign='center'
                            onClick={() => navigate(`/profiledashboard/${selected?._id}/followers`)}
                            sx={{cursor: 'pointer'}}
                        >
                            <Typography 
                                fontWeight={600}
                                fontSize={14}
                            >
                                {getFollowersCount(selected?._id)}
                            </Typography>

                            <Typography 
                                fontSize={13}
                                color='text.secondary'
                            >
                                followers
                            </Typography>
                        </Box>
                        <Box 
                            textAlign='center'
                            onClick={() => navigate(`/profiledashboard/${selected?._id}/following`)}
                            sx={{cursor: 'pointer'}}
                        >
                            <Typography 
                                fontWeight={600}
                                fontSize={14}
                            >
                                {(selected?.following || []).length}
                            </Typography>

                            <Typography 
                                fontSize={13}
                                color='text.secondary'
                            >
                                following
                            </Typography>
                        </Box>

                        <Box 
                            textAlign='center'
                            onClick={() => navigate(`/profiledashboard/${selected?._id}/profilemain`)}
                            sx={{cursor: 'pointer'}}
                        >
                            <Typography 
                                fontWeight={600}
                                fontSize={14}
                            >
                                {myCardsCount}
                            </Typography>

                            <Typography 
                                fontSize={13}
                                color='text.secondary'
                            >
                                posts
                            </Typography>
                        </Box>
                    </Box>

                    <Box px={2}>

                        <Button
                            size='small'
                            variant={isFollowByMe(selected._id) ? 'outlined' : 'outlined'}
                            startIcon={isFollowByMe(selected._id) ? <CheckIcon/> : <PersonAddIcon/>}
                            onClick={async () => {
                                await toggleFollow(selected._id)
                                await refreshFeed()
                            }}
                            fullWidth
                            sx={{
                                fontSize: 9, 
                                borderRadius: 5, 
                                py: 0.3,
                                '& .MuiButton-startIcon' : {mb: 0.2}, 
                                lineHeight: 0,
                                mb:2,
                            }}
                            color={isFollowByMe(selected._id) ? 'inherit' : 'primary'}
                        >
                            {isFollowByMe(selected._id) ? 'Following' : 'Follow'}
                        </Button>
                    </Box>
                </Paper>
            )
        })}
    </Container>
  )
}