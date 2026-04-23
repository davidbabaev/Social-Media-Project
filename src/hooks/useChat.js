import React, { useEffect, useState } from 'react'
import socket from '../services/socketService';
import { useAuth } from '../providers/AuthProvider';
import { getChats, getSingleChatMessages } from '../services/apiService';

function useChat(selectedConversationId) {
    const [conversationsList, setConversationsList] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

    const {user} = useAuth();

    const handleOpenChatList = async () => {
        try{
            const response = await getChats();
            setConversationsList(response);
        }   
        catch(err){
           console.log(err.message);
            
        }
    }

    const handleOpenConversation = async (id) => {
        try{
            const response = await getSingleChatMessages(id);
            setChatMessages(response);
        }   
        catch(err){
           console.log(err.message);
        }
    }

    const handleSendNewMessage = (message) => {
        socket.emit('send-message', message)
    }

    useEffect(() => {
        socket.on('receive-message', (newMessage) => {

            if(newMessage.conversationId === selectedConversationId){
                setChatMessages(prev => [...prev, newMessage])
            }
            handleOpenChatList();
        });

        return () => {
            socket.off('receive-message');
        }

    }, [user?._id, selectedConversationId]); // <- re-runs when the actual ID changes.

    return{
        handleOpenChatList, 
        handleOpenConversation, 
        handleSendNewMessage,
        conversationsList,
        chatMessages
    }
}

export default useChat;
