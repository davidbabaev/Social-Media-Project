import { useNavigate, useParams } from 'react-router-dom'
import useUsers from '../hooks/useUsers';

import { useAuth } from '../providers/AuthProvider';
import { useCardsProvider } from '../providers/CardsProvider';

import React, { useState } from 'react'
import useFavoriteCards from '../hooks/useFavoriteCards';
import useLikedCards from '../hooks/useLikedCards';
import LoginPopup from '../components/LoginPopup';
import CardsComments from '../components/CardsComments';
import useCommentsCards from '../hooks/useCommentsCards';
import useFollowUser from '../hooks/useFollowUser';

export default function UserProfile() {

    const {id} = useParams();

    const{users} = useUsers();
    const navigate = useNavigate();
    const {registeredCards, refreshFeed} = useCardsProvider();
    const {user} = useAuth()    

    const [isOpen, setIsOpen] = useState(false);
    function onClose(){
        setIsOpen(false)
    }

    const [isCommentOpen, setIsCommentOpen] = useState(null);
    const {addComment, countComments, removeComment} = useCommentsCards();    
    const {toggleLike, isLikeByMe, getLikeCount} = useLikedCards()
    const {favoriteCards, handleFavoriteCards} = useFavoriteCards();
    const {toggleFollow, isFollowByMe, getFollowingCount, getFollowersCount} = useFollowUser();
    
    const userProfile = users.find(u => u._id === id);
    
    if(!userProfile){
        return <p>Loading..</p>
    }

    const userCards = registeredCards.filter(uCard => uCard.userId === userProfile._id)


  return (
    <div>

    <div
      style={{
      border: 'solid black 1px', 
      padding: '20px', 
      borderRadius: '20px', 
      margin: '20px 0px'
      }}
      >
      <img style={{width: '100%', borderRadius: '10px', height:'230px', objectFit:'cover'}} src={userProfile.coverImage}/>
      <img style={{marginTop: '-100px',marginLeft: '20px',width: '17%', borderRadius: '50%', border: 'solid 2px white', objectFit:'cover', height:'170px'}} src={userProfile.profilePicture}/>
      <h2>{userProfile.name} {userProfile.lastName}</h2>
      <div style={{display:'flex', gap: '20px'}}>
        <div style={{display:'block', border: '1px solid black', padding: '10px', borderRadius: '10px'}}>
            <p>Followers</p>
            <p>{getFollowersCount(userProfile._id)}</p>
        </div>
        <div style={{display:'block', border: '1px solid black', padding: '10px', borderRadius: '10px'}}>
            <p>following</p>
            <p>{getFollowingCount(userProfile._id)}</p>
        </div>
      </div>
      <hr />
      <p><span style={{fontWeight:'bold', fontSize: '20px'}}>About</span><br/> {userProfile.aboutMe}</p>

      <hr />
      
      <p>Email: {userProfile.email}</p>
      <p>Country: {userProfile.address?.country}</p>
      <p>City: {userProfile.address?.city}</p>
      <p>Age: {userProfile.age}</p>
      <p>Job: {userProfile.job}</p>
      <p>Gender: {userProfile.gender}</p>
      <p>Phone: {userProfile.phone}</p>
      <p>Joined On: {userProfile.createdAt}</p>
      
      {user?._id === userProfile._id && (<button onClick={() => navigate(`/dashboard/myprofile`)}>Edit Your Profile</button>)}

      {user?._id !== userProfile._id && (
        <button onClick={async() => {
            console.log("1 - before toggle");
            await toggleFollow(userProfile._id)
            console.log("2 - after Toggle toggle");
            await refreshFeed();
            console.log("3 - after refresh");
        }}>
            {isFollowByMe(userProfile._id) ? "Unfollow" : "Follow"}
        </button>
      )}

      </div>
      

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
  )
}
