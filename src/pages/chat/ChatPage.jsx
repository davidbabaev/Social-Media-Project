import React, { useEffect, useRef, useState } from 'react'
import useChat from '../../hooks/useChat'
import { useAuth } from '../../providers/AuthProvider';
import { Avatar, Box, Button, Container, Grid, IconButton, InputAdornment, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material';
import useUsers from '../../hooks/useUsers';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import getTimeAgo from '../../utils/getTimeAgo';
import MessageIcon from '@mui/icons-material/Message';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import getMessageTime from '../../utils/getMessageTime';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ChatPage() {

    const [selectedChat, setSelectedChat] = useState(null);
    const [messageText, setMessageText] = useState('')

    const {
        handleOpenChatList, 
        handleOpenConversation,
        handleSendNewMessage,
        conversationsList, 
        chatMessages,
        handleDeleteChat
    } = useChat(selectedChat?.conversationId);

    const navigate = useNavigate();

    const {user} = useAuth();
    const {users} = useUsers();

    const [anchorEl, setAnchorEl] = useState(null);

    // open the menu - store the clicked element
    const handleOpen = (e) => setAnchorEl(e.currentTarget);

    // close the menu - clear the element
    // the menu is open when anchorEl is not null
    const handleClose = () => setAnchorEl(null);


    // chat display settings
    const [isChatReady, setIsChatReady] = useState(false)
    const messageContainerRef = useRef(null);
    const messageEndRef = useRef(null);

    useEffect(() => {
        if(chatMessages.length === 0) return;

        // jump to bottom (still invisible because isChatReady is false)
        messageEndRef.current?.scrollIntoView({behavior: 'auto'})

        // wait one paint frame, then reveal
        requestAnimationFrame(() => {
            setIsChatReady(true)
        })

    }, [chatMessages])

    useEffect(() => {
        setMessageText('');
    }, [selectedChat?.conversationId])

/*     useEffect(() => {
        const container = messageContainerRef.current;
        if(!container) return;

        // how far from the bottom is the user right now?
        const distanceFromBottom =
            container.scrollHeight - container.scrollTop - container.clientHeight;

            // if they're within 150px of the bottom, auto-scroll
            // otherwise leave them alone (they're reading old messages)
            if(distanceFromBottom  < 800){
                messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
            }
            
        }, [chatMessages,]) */
        
/*         useEffect(() =>  {
            setTimeout(()=> {
                messageEndRef?.current?.scrollIntoView({behavior: 'auto'})
            }, 200)
        }, [selectedChat]) */

    useEffect(() => {
        if(user?._id){
            handleOpenChatList();
            console.log('requesting chats for:', user?._id);
            
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

            setIsChatReady(false);
            
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
                                <Box 
                                    key={chat._id}
                                    onClick={() => {
                                        setIsChatReady(false);
                                        setSelectedChat({
                                            conversationId: chat._id,
                                            otherUser: otherUser
                                        })
                                        handleOpenConversation(chat._id)
                                    }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        p: 1.5,
                                        cursor: 'pointer',
                                        bgcolor: isActive ? 'action.selected' : 'transparent',
                                        borderLeft: isActive ? '3px solid' : "3px solid transparent",
                                        borderLeftColor: isActive && 'primary.main',
                                        '&:hover': {bgcolor : isActive ? 'action.selected' : 'action.hover'}
                                    }}
                                >
                                    <Avatar
                                        src={otherUser?.profilePicture}
                                        sx={{
                                            width: 44,
                                            height: 44,
                                        }}
                                    />

                                    <Box sx={{flex: 1, minWidth: 0, flexWrap: 'nowrap'}}>
                                        <Typography>
                                            {otherUser?.name} {otherUser?.lastName}
                                        </Typography>
                                        <Typography
                                            fontSize={11} color='text.secondary'
                                        >
                                            last message here..
                                        </Typography>
                                    </Box>

                                    <Typography fontSize={11} color='text.secondary'>
                                        {getTimeAgo(chat.updatedAt)}
                                    </Typography>
                                </Box>
                            )
                        })}
                    </Box>
                </Paper>
            </Grid>

            {/* chat messages - right side */}
            <Grid size={{md:8}}>
                {selectedChat ? (
                        <Box
                            sx={{
                                height: '80vh',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid',
                                borderColor: 'divider',
                                // borderRadius: 3,
                            }}
                        >
                            {/* Top: header with the other user's name */}
                            <Box sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                p:2,
                                bgcolor: 'background.paper',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                            }}>
                                <Avatar
                                    src= {selectedChat.otherUser?.profilePicture}
                                    onClick={() => navigate(`/profiledashboard/${selectedChat.otherUser?._id}/profilemain`)}
                                    sx={{
                                        height: 48,
                                        width: 48,
                                        cursor: 'pointer'
                                    }}
                                />
                                <Box sx={{ flex: 1}}>
                                    <Typography>
                                        {selectedChat.otherUser?.name}
                                        {' '}
                                        {selectedChat.otherUser?.lastName}
                                    </Typography>
                                    <Typography fontSize={12} color='text.secondary'>
                                        {selectedChat.otherUser?.job}
                                        {' ' + '󠁯ㆍ' + ' '}
                                        {selectedChat.otherUser?.address.city}
                                    </Typography>
                                </Box>

                                <Box>
                                    <IconButton onClick={handleOpen}>
                                        <MoreHorizIcon/>
                                    </IconButton>
                                </Box>
                                
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        handleClose()
                                        navigate(`/profiledashboard/${selectedChat.otherUser?._id}/profilemain`)
                                    }}>
                                        <PersonIcon sx={{mr:1}}/> Profile
                                    </MenuItem>

                                    <MenuItem onClick={() => {
                                        handleClose();
                                        handleDeleteChat(selectedChat.conversationId)
                                        setSelectedChat(null)
                                    }}>
                                        <DeleteIcon sx={{mr:1}}/> Delete chat
                                    </MenuItem>
                                </Menu>

                            </Box>

                            {/* Middle: scrollable list of messages */}
                            <Box 
                                ref={messageContainerRef}
                                sx={{
                                    flex: 1, 
                                    p: 2, 
                                    overflowY: 'auto',
                                    visibility: isChatReady ? 'visible' : 'hidden'
                                }}
                            >
                                {chatMessages.map((message) => {

                                    const isSent = user._id === message.userId;
                            // isSent === true → purple bubble, right side, no avatar
                            // isSent === false → dark bubble, left side, with the other user's avatar
                                    
                                    return(
                                        <Box key={message._id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: isSent ? 'flex-end' : 'flex-start',
                                                alignItems: 'flex-end',
                                                gap: 1,
                                                mb: 1.5
                                            }}
                                        >
                                            {!isSent && (
                                                <Avatar
                                                    src={selectedChat.otherUser?.profilePicture}
                                                    sx={{
                                                        width: 32,
                                                        height: 32
                                                    }}
                                                />
                                            )}

                                            <Box
                                                sx={{
                                                    bgcolor: isSent ? 'primary.main' : 'action.hover',
                                                    color: isSent ? 'white' : 'text.primary',
                                                    px: 2,
                                                    py: 1.5,
                                                    borderRadius: 4,
                                                    maxWidth: '70%',
                                                    // the tail
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    borderBottomLeftRadius: isSent ? 15 : 3,
                                                    borderBottomRightRadius: !isSent ? 15 : 3,
                                                    wordBreak: 'break-word'
                                                }}
                                            >
                                                <Typography 
                                                    fontSize={15}
                                                    lineHeight={1.4}
                                                    sx={{
                                                        whiteSpace: 'pre-wrap'
                                                    }}
                                                >
                                                    {message.text}
                                                </Typography>

                                                <Typography
                                                    fontSize={12}
                                                    sx={{
                                                        alignSelf: 'flex-end',
                                                        color: isSent ? 'rgba(255, 255, 255, 0.69)' : 'text.secondary'
                                                    }}
                                                >
                                                    {getMessageTime(message.createdAt)}
                                                </Typography>
                                            </Box>
                                            
                                        </Box>
                                    )
                                })}
                                <IconButton 
                                    sx={{
                                        position: 'sticky', 
                                        bottom: 0
                                    }}>
                                    <KeyboardArrowDownIcon/>
                                </IconButton>
                                {/* invisble market at the bottom */}
                                <Box ref={messageEndRef}/>
                            </Box>

                            {/* Bottom: text input + send button */}
                            <Box 
                                sx={{
                                    p: 2, 
                                    display: 'flex', 
                                    gap: 1, 
                                    alignItems: 'end',
                                    borderTop: '0.5px solid',
                                    borderColor: 'divider'
                                }}
                            >
                                <ImageIcon sx={{color: 'text.secondary', mb: 1, cursor: 'pointer'}}/>
                                <VideocamIcon sx={{color: 'text.secondary', mb: 1, cursor: 'pointer'}}/>

                                <TextField
                                    fullWidth
                                    size='small'
                                    multiline
                                    maxRows={10}
                                    placeholder='Write a message...'
                                    onChange={(e) => setMessageText(e.target.value)}
                                    value={messageText}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter' && !e.shiftKey && messageText.trim()){
                                            e.preventDefault()
                                            handleSendNewMessage({
                                                text: messageText,
                                                toUser: selectedChat.otherUser._id
                                            })
                                                setMessageText('')
                                            }}
                                        }
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment 
                                                    position='start'
                                                    sx={{
                                                        alignSelf: 'flex-end',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <EmojiEmotionsIcon/>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 5,
                                            fontSize: 15,
                                            bgcolor: 'action.hover',
                                            '& fieldset': {border: 'none'}
                                        }
                                    }}
                                />
                                <IconButton 
                                    disabled={!messageText.trim()}
                                    onClick={() => {
                                        handleSendNewMessage({
                                            text: messageText,
                                            toUser: selectedChat.otherUser._id
                                        })
                                        setMessageText('')
                                    }}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        flexShrink: 0,
                                        '&:hover': {
                                            bgcolor: 'primary.dark'
                                        },
                                        '&.Mui-disabled': {bgcolor: 'action.disabledBackground'}
                                    }}
                                >
                                    <SendIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                ): (
                    <Box
                        sx={{
                            height: '80vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            p: 4
                        }}
                    >
                        <Box sx={{
                            borderRadius: '50%',
                            bgcolor: '#7F77DD20',
                            width: 90,
                            height: 90,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <MessageIcon sx={{
                                fontSize: 50,
                                color: 'primary.main'
                            }}/>    
                        </Box>
                        <Typography fontWeight={700} fontSize={20}>Your Messages</Typography>
                        <Typography 
                            fontSize={14} 
                            textAlign={'center'} 
                            maxWidth={320}
                            lineHeight={1.2}
                            color='text.secondary'
                        >
                            Select a conversation to start chatting, or message someone new from their profile.
                        </Typography>
                    </Box>
                )}
            </Grid>
        </Grid>
    </Container>
  )
}
