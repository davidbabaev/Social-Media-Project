import { useParams } from 'react-router-dom'
import { useCardsProvider } from '../providers/CardsProvider';
import useAllUsers from '../hooks/useAllUsers';
import { useAuth } from '../providers/AuthProvider';
import useFavoriteCards from '../hooks/useFavoriteCards';
import CardsComments from '../components/CardsComments';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLikedCards from '../hooks/useLikedCards';
import LoginPopup from '../components/LoginPopup';
import useCommentsCards from '../hooks/useCommentsCards';

export default function CardDetailsPage() {

    const {id} = useParams();
    const {registeredCards} = useCardsProvider()
    const {favoriteCards, handleFavoriteCards} = useFavoriteCards();
    const {allUsers} = useAllUsers();
    const {user} = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    function onClose(){
        setIsOpen(false)
    }
    const {addComment, countComments, removeComment} = useCommentsCards();
    const navigate = useNavigate();

    const {toggleLike, isLikeByMe, getLikeCount} = useLikedCards()

    const currentCard = registeredCards.find((card) => card.cardId === id);
    
        if(!currentCard){
            return <p>Loading..</p>
        }
    
    const creator = allUsers.find((userC) => userC.userId === currentCard.userId)
    
  return (
    <div>
        <div style={{
            border: 'solid black 1px', 
            padding: '20px', 
            borderRadius: '20px', 
            margin: '20px 0px'
            }} key={currentCard.cardId}>

            <h2>{currentCard.title}</h2>
            <img src={currentCard.img} style={{
                width: '100%',
                borderRadius: '20px'
            }}/>
            <p>{currentCard.text}</p>
            <hr />
            <div style={{
                display: 'flex', 
                flexDirection: 'row', 
                gap: '10px'
                }}>
                <img 
                    style={{
                        width: '6%', 
                        height: '6%', 
                        borderRadius: '50%', 
                        marginTop: '4px',
                        cursor: 'pointer'
                    }} 
                        src={creator?.photo || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                    onClick={() => navigate(`/userprofile/${creator.userId}`)}    
                />
                <p>
                    <span
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate(`/userprofile/${creator.userId}`)}
                    >
                        {creator?.name} {creator?.lastName}
                    </span>
                </p>
                <p>|</p>
                <p>Created at: {new Date(currentCard.createdAt).toLocaleDateString()}</p>
                <p>|</p>
                {!currentCard.category ? (<p>Category: Don't Have Yet</p>) : (<p>Category: {currentCard.category}</p>)}
                <p>|</p>
                <p>{getLikeCount(currentCard.cardId)} likes</p>
                <p>|</p>
                <p>{countComments(currentCard.cardId)} comments</p>
                <p>|</p>

                <div>
                    {user ? (
                        <button onClick={() => toggleLike(currentCard.cardId)}>
                            {isLikeByMe(currentCard.cardId) ? "Unlike" : "Like"}
                        </button>
                    ):(
                        <button onClick={() => setIsOpen(true)}>Like</button>
                    )}

                    {user ? (
                        <div>
                            {favoriteCards.some(c => c.cardId === currentCard.cardId) ? (
                                <button onClick={() => handleFavoriteCards(currentCard)}>Remove From Favorite</button>
                            ) : (
                                <button onClick={() => handleFavoriteCards(currentCard)}>Add To Favorites</button>
                            )}
                        </div>
                        ) : (
                            <button onClick={() => setIsOpen(true)}>Add to favorites</button>
                    )}
                </div>
            </div>
            <div>
                { currentCard.cardId && (  
                    <CardsComments
                        card = {currentCard}
                        allUsers={allUsers}
                        addComment={addComment}
                        removeComment = {removeComment}
                    />
                )}
            </div>

            {  isOpen && (
                <LoginPopup
                    onClose = {onClose}
                />
            )}
                
        </div>

    </div>
  )
}
