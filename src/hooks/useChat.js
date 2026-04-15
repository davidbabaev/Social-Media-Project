import React, { useEffect, useState } from 'react'
import socket from '../services/socketService';

function useChat() {
    // states:
    // the chat list
    const [conversationsList, setConversationsList] = useState([]);
    // the chat window
    const [chatMessages, setChatMessages] = useState([]);


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
        socket.on('recieve-chats', (chats) => {
            // what state do you update here?
            setConversationsList(chats)
        });

        socket.on('recieve-messages', (messages) => {
            setChatMessages(messages)
        });

        socket.on('recieve-message', (newMessage) => {
            setChatMessages(prev => [...prev, newMessage])
        });

        return () => {
            socket.off('recieve-chats');
            socket.off('recieve-messages');
            socket.off('recieve-message');
        }
    }, []);

  return{
    handleOpenChatList, 
    handleOpenConversation, 
    handleSendNewMessage,
    conversationsList,
    chatMessages
}
}

export default useChat;
