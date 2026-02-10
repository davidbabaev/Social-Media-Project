import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useCardsProvider } from "../providers/CardsProvider";

function useLikedCards() {

    const [userWithLikedCards, setUserWithLikedCards] = useState([]);
    const [cardWithLikedUsers, setCardWithLikedUsers] = useState([]);
    const {user} = useAuth();

    const currentUserStorageKey = user ? `likedCardsOf_${user.userId + ' - ' + user.name}` : null; 

    // handle user object, 
    // cards get into the array of his liked cards 
    const handleUserLikeCard = useCallback((likedCard) => {

        setUserWithLikedCards((prev) => {
            const include = prev.some(cardL => cardL.userId === likedCard.userId)

            if(!include){
                return [...prev, likedCard]
            }
            else{
                return prev.filter(likedC => likedC.cardId !== prev.cardId)
            }
        })
    }, [])
    console.log(userWithLikedCards);
    
    
    // handle user object, 
    // cards filtered out of the array of his liked cards 
    const handleUserUnlikeCard = useCallback((user) => {

    }, [])

    // handle card that save user that liked that card
    // card object that add new user that liked that card
    const handleCardLikeByUser = useCallback((card) => {
        
    }, []) 
    
    // handle card that filter out user that unlike that card
    // card object that filter out user that unliked that card
    const handleCardUnlikeByUser = useCallback((card) => {

    }, []) 

    // set in the localStorga if exist
    useEffect(() => {
        if(!currentUserStorageKey) return

        const savedLikedCards = JSON.parse(localStorage.getItem(currentUserStorageKey))

        if(savedLikedCards){
            setUserWithLikedCards(savedLikedCards)
        }

    }, [currentUserStorageKey])

    useEffect(() => {
        if(!currentUserStorageKey) return;

        localStorage.setItem(currentUserStorageKey, JSON.stringify(userWithLikedCards))
    }, [userWithLikedCards, currentUserStorageKey])

    return {
        handleUserLikeCard, 
        handleUserUnlikeCard, 
        handleCardLikeByUser,
        handleCardUnlikeByUser
    };
}

export default useLikedCards;