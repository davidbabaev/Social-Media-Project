import React, { useState } from 'react'
import useFavoriteCards from '../hooks/useFavoriteCards';
import useUsers from '../hooks/useUsers';
import { useAuth } from '../providers/AuthProvider';
import useLikedCards from '../hooks/useLikedCards';
import { useNavigate } from 'react-router-dom';
import useCommentsCards from '../hooks/useCommentsCards';
import CardsComments from './CardsComments';
import LoginPopup from './LoginPopup';

export default function CardItem({card}) {

  const [isOpen, setIsOpen] = useState(false);
    function onClose(){
      setIsOpen(false)
    }

    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const {addComment, countComments, removeComment} = useCommentsCards();
    const navigate = useNavigate();
    const {toggleLike, isLikeByMe, getLikeCount} = useLikedCards()
    const {user} = useAuth();
    const {users} = useUsers(); 
    const {favoriteCards ,handleFavoriteCards} = useFavoriteCards();

    const creator = users.find(u => u._id === card.userId);

  return (
    <div>
      <div style={{
          border: 'solid lightgray 1px', 
          padding: '20px', 
          borderRadius: '20px', 
          margin: '20px 0px'
          }}>

          <h2><span style={{cursor: 'pointer'}} onClick={() => navigate(`/carddetails/${card._id}`)}>{card.title}</span></h2>
          <p>{card.content}</p>
          <img src={card.image} style={{
              width: '500px',
              borderRadius: '20px'
          }}/>
          <hr />
          <div style={{
              display: 'flex', 
              flexDirection: 'row', 
              gap: '10px'
              }}>
              <img 
                  style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px, solid, white',
                        objectFit: 'cover',
                        cursor: 'pointer'
                  }} 
                      src={creator?.profilePicture || 'https://cdn.pixabay.com/profilePicture/2023/02/18/11/00/icon-7797704_640.png'}
                  onClick={() => creator && navigate(`/profiledashboard/${creator._id}/profilemain`)}    
              />
              <p>
                  <span
                      style={{cursor: 'pointer'}}
                      onClick={() => creator && navigate(`/profiledashboard/${creator._id}/profilemain`)}
                  >
                      {creator?.name} {creator?.lastName}
                  </span>
              </p>
              <p>|</p>
              <p>Created at: {new Date(card.createdAt).toLocaleDateString()}</p>
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
                          <button onClick={() => {setIsCommentOpen(!isCommentOpen)}}>add new comment</button>
                      ): (
                          <button onClick={() => setIsOpen(true)}>add new comment</button>
                      )}

                      <button onClick={() => navigate(`/carddetails/${card._id}`)}>Show Card Details</button>    
                  </div>
          </div>
          <div>
              {
              isCommentOpen &&(  
                  <CardsComments
                      card = {card}
                      users={users}
                      addComment={addComment}
                      removeComment = {removeComment}
                  />
              )}
          </div>
      </div>

    {  isOpen && (
        <LoginPopup
            onClose = {onClose}
        />
    )}
    </div>
    
  )
}
