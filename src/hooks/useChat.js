import React, { useEffect, useState } from 'react'
import socket from '../services/socketService';
import { useAuth } from '../providers/AuthProvider';

function useChat() {
    // states:
    // the chat list
    const [conversationsList, setConversationsList] = useState([]);
    // the chat window
    const [chatMessages, setChatMessages] = useState([]);

    const {user} = useAuth();

    // functions:
    // open the chat page
    const handleOpenChatList = (userId) => {
        socket.emit('get-chats', userId)
    }
    // click a conversation
    const handleOpenConversation = (conversationId) => {
        socket.emit('get-messages', conversationId)
    }
    // hit send on message
    const handleSendNewMessage = (message, userId) => {
        socket.emit('send-message', message, userId)
    }

    useEffect(() => {
        const userId = user?._id;

        if(userId){
            socket.emit('register-user', userId)
        }

        socket.on('recieve-messages', (messages) => {
            setChatMessages(messages)
        });

        socket.on('recieve-chats', (chats) => {
            // what state do you update here?
            console.log('received chats:', chats)
            setConversationsList(chats)
        });

        socket.on('recieve-message', (newMessage) => {
            setChatMessages(prev => [...prev, newMessage])
        });

        return () => {
            socket.off('recieve-chats');
            socket.off('recieve-messages');
            socket.off('recieve-message');
        }
    }, [user?._id]); // <- re-runs when the actual ID changes.

  return{
    handleOpenChatList, 
    handleOpenConversation, 
    handleSendNewMessage,
    conversationsList,
    chatMessages
  }
}

export default useChat;
