import React, { useEffect, useState } from 'react'
import useChat from '../../hooks/useChat'
import { useAuth } from '../../providers/AuthProvider';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import useUsers from '../../hooks/useUsers';

export default function ChatPage() {

    const [selectedChat, setSelectedChat] = useState(null);

    const {
        handleOpenChatList, 
        conversationsList, 
        handleOpenConversation
    } = useChat();

    const {user} = useAuth();
    const {users} = useUsers();

    useEffect(() => {
        if(user?._id){
            handleOpenChatList(user._id)
            console.log('requesting chats for:', user._id);
            
        }
    }, [user?._id]);

  return (
    <Container maxWidth='lg' sx={{py:3, pb: {xs: 20, md: 3}}}>

        <Grid container spacing={3}>
            {/* Chats left side */}
            <Grid size={{xs: 12, md:4}}>
                {conversationsList.map((chat) => {
                    // const toUserId = users.find(u => u._id === chat.toUser)
                    const otherUserId = chat.fromUser === user._id ? chat.toUser : chat.fromUser
                    const otherUser = users.find(u => u._id === otherUserId)

                    return(
                        <Box key={chat._id}>
                            <Avatar
                                src={otherUser?.profilePicture}
                            />
                            <Typography>
                                {otherUser?.name}
                            </Typography>

                            <Button 
                                onClick={() => {
                                    setSelectedChat({
                                        conversationId: chat._id,
                                        otherUser: otherUser
                                    })
                                    handleOpenConversation(chat._id)
                                }}
                            >
                                Open
                            </Button>
                        </Box>
                    )
                })}
            </Grid>

            {/* chat messages - right side */}
            {selectedChat && (
                <Grid size={{md:8}}>
                    <Box
                        sx={{
                            position: {xs: 'fixed', md: 'sticky'},
                            top: {xs: 0, md: 90},
                            left: {xs: 0, md: 'auto'},
                            width: '100%',
                            height: {xs: '100vh', md: 'calc(100vh - 94px)'},
                            overflow: 'auto',
                            overscrollBehavior: 'contain',
                            bgcolor: {xs: 'background.default', md: 'transparent'},
                            zIndex: {xs: 1000, md: 'auto'},
                            p: {xs: 2, md:0},
                            flexDirection: 'column',
                            gap: 2,
                            
                            // hide scrollbar visually but keep it functional
                        }}
                    >
                    </Box>
                </Grid>
            )}
        </Grid>
    </Container>
  )
}
