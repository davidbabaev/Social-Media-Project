import React, { useEffect } from 'react'
import useChat from '../../hooks/useChat'
import { useAuth } from '../../providers/AuthProvider';
import { Avatar, Box, Button, Typography } from '@mui/material';
import useUsers from '../../hooks/useUsers';

export default function ChatPage() {

    const {handleOpenChatList, conversationsList, handleOpenConversation} = useChat();
    const {user} = useAuth();
    const {users} = useUsers();

    useEffect(() => {
        handleOpenChatList(user._id)
    }, [])

  return (
    <Box>
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

                    <Button onClick={() => handleOpenConversation()}></Button>
                </Box>
            )
        })}
    </Box>
  )
}
