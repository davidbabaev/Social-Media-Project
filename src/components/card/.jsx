//   return (
//     <div>
//         <div style={{
//             border: 'solid black 1px', 
//             padding: '20px', 
//             borderRadius: '20px', 
//             margin: '20px 0px'
//             }} key={currentCard._id}>

//             <h2>{currentCard.title}</h2>
//             <MediaDisplay
//                 mediaUrl={currentCard.mediaUrl}
//                 mediaType={currentCard.mediaType}
//                 style={{width: '500px', borderRadius: '20px'}}
//             />
//             <p>{currentCard.content}</p>
//             <hr />
//             <div style={{
//                 display: 'flex', 
//                 flexDirection: 'row', 
//                 gap: '10px'
//                 }}>
//                 <img 
//                     style={{
//                         width: '6%', 
//                         height: '6%', 
//                         borderRadius: '50%', 
//                         marginTop: '4px',
//                         cursor: 'pointer'
//                     }} 
//                         src={creator?.profilePicture || 'https://cdn.pixabay.com/profilePicture/2023/02/18/11/00/icon-7797704_640.png'}
//                     onClick={() => navigate(`/profiledashboard/${creator._id}/profilemain`)}    
//                 />
//                 <p>
//                     <span
//                         style={{cursor: 'pointer'}}
//                         onClick={() => navigate(`/profiledashboard/${creator._id}/profilemain`)}
//                     >
//                         {creator?.name} {creator?.lastName}
//                     </span>
//                 </p>
//                 <p>|</p>
//                 <p
//                 style={{
//                     color: 'gray', 
//                     fontSize:'13px', 
//                 }}
//                 >{getTimeAgo(currentCard.createdAt)}</p>
//                 <p>|</p>
//                 {!currentCard.category ? (<p>Category: Don't Have Yet</p>) : (<p>Category: {currentCard.category}</p>)}
//                 <p>|</p>
//                 <p>{getLikeCount(currentCard._id)} likes</p>
//                 <p>|</p>
//                 <p>{countComments(currentCard._id)} comments</p>
//                 <p>|</p>

//                 <div>
//                     {user ? (
//                         <button onClick={() => toggleLike(currentCard._id)}>
//                             {isLikeByMe(currentCard._id) ? "Unlike" : "Like"}
//                         </button>
//                     ):(
//                         <button onClick={() => setIsLoginPopupOpen(true)}>Like</button>
//                     )}

//                     {user ? (
//                         <div>
//                             {favoriteCards.some(c => c._id === currentCard._id) ? (
//                                 <button onClick={() => handleFavoriteCards(currentCard)}>Remove From Favorite</button>
//                             ) : (
//                                 <button onClick={() => handleFavoriteCards(currentCard)}>Add To Favorites</button>
//                             )}
//                         </div>
//                         ) : (
//                             <button onClick={() => setIsLoginPopupOpen(true)}>Add to favorites</button>
//                     )}
//                 </div>
//             </div>
//             <div>
//                 { currentCard._id && (  
//                     <CardsComments
//                         card = {currentCard}
//                         users={users}
//                         addComment={addComment}
//                         removeComment = {removeComment}
//                     />
//                 )}
//             </div>

//             {  isLoginPopupOpen && (
//                 <LoginPopup
//                     onCloseLoginPopup = {onCloseLoginPopup}
//                 />
//             )}
                
//         </div>

//     </div>
//   )


















// comments

  return (
    <div>
        <hr />
        { loggedInUser &&
            (<form onSubmit={handleSubmit}>
                <input 
                ref={inputRef}
                    type="text" 
                    placeholder='Write your comment...'
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                />
                <button type='submit'>Send</button>
            </form>)
        }

        <h4>Comments</h4>

        {countedComments.length === 0 && <p>ther'es no comments yet</p>}

        {
            countedComments.map((comment) => {
                const user = users.find(u => u._id === comment.userId);

                return(
                    <div key= {comment._id}>
                        <p>{user?.name || "Unknown User"}</p>
                        <p>{comment.commentText}</p>
                        { loggedInUser && 
                        (loggedInUser._id === comment.userId || 
                            loggedInUser._id === card.userId
                        ) && (
                            <button onClick={() => removeComment(card._id, comment._id)}>X</button>
                        )}
                        <hr />
                    </div>
                )
            })
        }
        {commentsCount >= 
        (card?.comments || []).length ? 
        (<p>No more Cards</p>): (
            <button onClick={() => setCommentsCount(commentsCount + 5)}>Read More</button>
        )}

    </div>
  )