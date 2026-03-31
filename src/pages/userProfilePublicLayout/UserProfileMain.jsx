import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useUsers from '../../hooks/useUsers';
import { useCardsProvider } from '../../providers/CardsProvider';
import { useAuth } from '../../providers/AuthProvider';
import useCommentsCards from '../../hooks/useCommentsCards';
import useLikedCards from '../../hooks/useLikedCards';
import useFavoriteCards from '../../hooks/useFavoriteCards';
import CardsComments from '../../components/CardsComments';
import LoginPopup from '../../components/LoginPopup';
import getTimeAgo from '../../utils/getTimeAgo';
import MediaDisplay from '../../components/MediaDisplay';

export default function UserProfileMain() {

  const {id} = useParams();
  const {users} = useUsers();
  const {registeredCards} = useCardsProvider();
  const {user} = useAuth();
  const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    function onClose(){
        setIsOpen(false)
    }

    // addidng window scroll 0
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [isCommentOpen, setIsCommentOpen] = useState(null);
    const {addComment, countComments, removeComment} = useCommentsCards();    
    const {toggleLike, isLikeByMe, getLikeCount} = useLikedCards()
    const {favoriteCards, handleFavoriteCards} = useFavoriteCards();

    const userProfile = users.find(u => u._id === id);

    if(!userProfile){
      return <p>Loading..</p>
    }

    const userCards = registeredCards.filter(uCard => uCard.userId === userProfile._id).sort((a,b) => b.createdAt.localeCompare(a.createdAt))

return (
  <div>
      <div>      
      {userCards.map((card) => {
            const creator = users.find(user => user._id === card.userId);
      
            return(
                <div style={{
                    border: 'solid black 1px', 
                    padding: '20px', 
                    borderRadius: '20px', 
                    margin: '20px 0px'
                    }} key={card._id}>
      
                    <h2><span style={{cursor: 'pointer'}} onClick={() => navigate(`/carddetails/${card._id}`)}>{card.title}</span></h2>
                    <p>{card.content}</p>
                    <MediaDisplay
                        mediaUrl={card.mediaUrl}
                        mediaType={card.mediaType}
                        style={{width: '90%', borderRadius: '20px'}}
                    />
                    <hr />
                    <div style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        gap: '10px',
                        }}>
                        <img 
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                border: '2px, solid, white',
                                objectFit: 'cover',
                                cursor: 'pointer',
                            }} 
                                src={creator?.profilePicture || 'https://cdn.pixabay.com/profilePicture/2023/02/18/11/00/icon-7797704_640.png'}
                            onClick={() => navigate(`/profiledashboard/${creator._id}/profilemain`)}    
                        />
                        <p>
                            <span
                                style={{cursor: 'pointer'}}
                                onClick={() => navigate(`/profiledashboard/${creator._id}/profilemain`)}
                            >
                                {creator?.name} {creator?.lastName}
                            </span>
                        </p>
                        <p>|</p>
                        <p
                        style={{
                            color: 'gray', 
                            fontSize:'13px', 
                        }}
                        >{getTimeAgo(card.createdAt)}</p>
                        <p>|</p>
                        {!card.category ? (<p>Category: Don't Have Yet</p>) : (<p>Category: {card.category}</p>)}
                        <p>|</p>
                        <p>{getLikeCount(card._id)} likes</p>
                        <p>|</p>
                        <p>{countComments(card._id)} comments</p>
                        <p>|</p>
      
                            <div>
                                {user ? (
                                    <button onClick={() => toggleLike(card._id)}>
                                        {isLikeByMe(card._id) ? "Unlike" : "Like"}
                                    </button>
                                ):(
                                    <button onClick={() => setIsOpen(true)}>Like</button>
                                )}
      
                                {user ? (
                                    <div>
                                        {favoriteCards.some(c => c._id === card._id) ? (
                                            <button onClick={() => handleFavoriteCards(card)}>Remove From Favorite</button>
                                        ) : (
                                            <button onClick={() => handleFavoriteCards(card)}>Add To Favorites</button>
                                        )}
                                    </div>
                                    ) : (
                                        <button onClick={() => setIsOpen(true)}>Add to favorites</button>
                                    )}
      
                                {user ? (
                                    <button onClick={() => {
                                        if(isCommentOpen === card._id){
                                            setIsCommentOpen(null)
                                        } else{
                                            setIsCommentOpen(card._id)
                                        }
                                    }}>add new comment</button>
                                ): (
                                    <button onClick={() => setIsOpen(true)}>add new comment</button>
                                )}
      
                                <button onClick={() => navigate(`/carddetails/${card._id}`)}>Show Card Details</button>    
                            </div>
                    </div>
                    <div>
                        {
                        isCommentOpen === card._id &&(  
                            <CardsComments
                                card = {card}
                                users={users}
                                addComment={addComment}
                                removeComment = {removeComment}
                            />
                        )}
                    </div>
                </div>
            )
            
        })}
            
        {  isOpen && (
            <LoginPopup
                onClose = {onClose}
            />
        )}
      
    </div>


  </div>
)
}
