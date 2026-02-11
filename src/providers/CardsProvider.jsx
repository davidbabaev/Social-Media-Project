import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';

const CardsContext = createContext();

export function CardsProvider({children}) {

const { user } = useAuth();

    // state for saving cards (register cards)
const [registeredCards, setRegisteredCards] = useState([]);

const generateID = () => {
    return new Date().getTime().toString() + Math.random().toString(36).substring(2,6)
} 

// useEffect on mount
useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('registeredCards'));

    if(saved){
        setRegisteredCards(saved);
    }
}, [])

// useEffect with dependency cards
useEffect(() => {
    localStorage.setItem('registeredCards', JSON.stringify(registeredCards))
}, [registeredCards])

const handleCardRegister = useCallback((title, text, img, category, like) => {
    // no dulicates check needed - genrateID() is always unique

    const newCard = {
        cardId: generateID(),
        title: title,
        text: text,
        img: img,
        category: category,
        userId: user.userId,
        userName: user.name,
        likedUsers: [],
        createdAt: new Date().toISOString()
    };

    setRegisteredCards( prev => [...prev, newCard]);

    return{
        success: true,
        message: 'new cards added'
    };

}, [registeredCards, user])

    const handleDeleteCard = (cardId) => {
        setRegisteredCards(registeredCards.filter(card => card.cardId !== cardId))
    }

    const handleEditCard = (cardId, newTitle, newText, newImg, newCategory) => {
        setRegisteredCards(registeredCards.map(card => {
            if(card.cardId === cardId){
                // this is the one we're editing - return updated version
                return{
                    ...card, //keep everything else (userId, userName, createdAt)
                    title: newTitle, //update title
                    text: newText, //udpate text
                    img: newImg, // update img
                    category: newCategory, // update category
                }
            } else{
                // not the one - return uchanged
                return card
            }
        }))
    }


    const handleToggleLike = (cardId, userId) => {
        setRegisteredCards(registeredCards.map((card) => {
            if(card.cardId === cardId){
                // protect against old cards that don't have likedUsers yet
                const currentLikes = card.likedUsers || [];
    
                // Handle Unlike:
                if(currentLikes.includes(userId)){
                    // userId is in the array -> remove it (unlike)
                    const updatedLikes = currentLikes.filter(id => id !== userId);
                    return {
                        ...card,
                        likedUsers: updatedLikes
                    };
                }
                // Handle Like:
                else{
                    // userId os NOT in the array -> add it (like)
                    const updatedLikes = [...currentLikes, userId];
                    return{
                        ...card,
                        likedUsers: updatedLikes
                    };
                }
            }
            else{
                return card;
            }
        }))
    }
    
  return (
    <CardsContext.Provider value={{registeredCards, handleCardRegister, handleDeleteCard, handleEditCard, handleToggleLike}}>
        {children}
    </CardsContext.Provider>
  )
}

export function useCardsProvider(){
    return useContext(CardsContext);
}
