import React, { useEffect, useState } from 'react'
import useChat from '../../hooks/useChat'
import { useAuth } from '../../providers/AuthProvider';
import { Avatar, Box, Button, Container, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import useUsers from '../../hooks/useUsers';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export default function ChatPage() {

    const [selectedChat, setSelectedChat] = useState(null);
    const [messageText, setMessageText] = useState('')

    const {
        handleOpenChatList, 
        handleOpenConversation,
        handleSendNewMessage,
        conversationsList, 
        chatMessages,
    } = useChat();

    const {user} = useAuth();
    const {users} = useUsers();

    useEffect(() => {
        if(user?._id){
            handleOpenChatList(user._id)
            console.log('requesting chats for:', user._id);
            
        }
    }, [user?._id]);

    const [searchParams] = useSearchParams();
    const toUserId = searchParams.get('to')

    useEffect(() => {
        if(!toUserId){
            return;
        }

        const conversation = conversationsList.find(c => 
            (c.fromUser === user._id && c.toUser === toUserId) ||
            (c.fromUser === toUserId && c.toUser === user._id)
        )

        if(conversation){
            const otherUserTo = users.find(u => u._id === toUserId)

            setSelectedChat({
                conversationId: conversation._id,
                otherUser: otherUserTo
            })

            handleOpenConversation(conversation._id)
        }
        else{
            const otherNewUserTo = users.find(u => u._id === toUserId);
            // console.log('toUserId from URL:', toUserId)
            // console.log('users array length:', users.length)
            // console.log('found other user:', otherNewUserTo)

            setSelectedChat({
                conversationId: null,
                otherUser: otherNewUserTo
            })
        }

    }, [toUserId, conversationsList, user, users])

  return (
    <Container maxWidth='lg' sx={{py:3, pb: {xs: 20, md: 3}}}>

        <Grid container spacing={3}>
            {/* Chats left side */}
            <Grid size={{xs: 12, md:4}}>
                <Paper
                    elevation={0}
                    sx={{
                        border: '0.5px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        overflow: 'hidden',
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >

                    {/* Header with title + search */}
                    <Box sx={{
                        p: 2,
                        borderBottom: '0.5px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography fontWeight={500} fontSize={18} mb={1.5}>
                            Messages
                        </Typography>
                        <TextField
                            fullWidth
                            size='small'
                            placeholder='Search chat'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchIcon fontSize='small'/>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 5,
                                    fontSize: 13,
                                    bgcolor: 'action.hover'
                                }
                            }}
                        />
                    </Box>


                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto'
                    }}>
                        {/* conversation list */}
                        {conversationsList.map((chat) => {
                            // const toUserId = users.find(u => u._id === chat.toUser)
                            const otherUserId = chat.fromUser === user._id ? chat.toUser : chat.fromUser
                            const otherUser = users.find(u => u._id === otherUserId)
                            const isActive = selectedChat?.conversationId === chat._id;

                            return(
                                <Box key={chat._id}>
                                    <Avatar
                                        src={otherUser?.profilePicture}
                                    />
                                    <Typography>
                                        {otherUser?.name} {otherUser?.lastName}
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
                    </Box>
                </Paper>
            </Grid>

            {/* chat messages - right side */}
            {selectedChat && (
                <Grid size={{md:8}}>
                    <Box
                        sx={{
                            border: '2px dashed red',
                            height: '80vh',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Top: header with the other user's name */}
                        <Box sx={{border: '1px dashed blue', p: 2}}>
                            HEADER — chatting with: {selectedChat.otherUser?.name}
                        </Box>

                        {/* Middle: scrollable list of messages */}
                        <Box sx={{border: '1px dashed green', flex: 1, p: 2, overflowY: 'auto'}}>
                            {chatMessages.map((message) => (
                                <Box key={message._id}>
                                    <Typography>{message.text}</Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Bottom: text input + send button */}
                        <Box sx={{border: '1px dashed orange', p: 2, display: 'flex', gap: 1}}>
                            <TextField
                                fullWidth
                                size='small'
                                placeholder='Write a message...'
                                onChange={(e) => setMessageText(e.target.value)}
                                value={messageText}
                            />
                            <Button 
                                variant='contained'
                                onClick={() => {
                                    handleSendNewMessage({
                                        text: messageText,
                                        toUser: selectedChat.otherUser._id
                                    },
                                    user._id
                                )
                                    setMessageText('')
                                    setTimeout(() => {
                                        handleOpenChatList(user._id)
                                    }, 300)
                                }}
                            >
                                SEND
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            )}
        </Grid>
    </Container>
  )
}
