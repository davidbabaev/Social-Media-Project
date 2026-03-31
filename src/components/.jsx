
//   return (
//     <div>
//         <div 
//             style={{
//             padding: '10px', 
//             borderRadius: '20px', 
//             }}
//         >
//         <h3>Start a post</h3>
//         <form onSubmit={handleSubmitNewCard}>
//             <div >
//                 <label>Title</label>
//                 <br />
//                 <input 
//                     type="text" 
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Text</label>
//                 <br />
//                 <textarea 
//                 rows={3}
//                 style={{resize: 'none'}}
//                     type="text" 
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Image</label>
//                 <br />
//                 <input 
//                     value={img}
//                     type="text" 
//                     onChange={(e) => setImg(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <label>Category:</label>
//                 <br />
//                 <select 
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                 >
//                     <option value="">All Categories</option>
//                     {CARD_CATEGORIES.map((category) => (
//                         <option key={category} value={category}>{category}</option>
//                     )
//                     )}
//                 </select>
//             </div>

//             {error && <p style={{color: 'red'}}>{error}</p>}
//             <br />
//             <button type='submit'>Post Your Card</button>
//             <p>{successMessage}</p>
//         </form>
//         </div>
//     </div>
//   )
















//         <div style={{padding: '5px', border: '1px solid lightGray', borderRadius:'10px', width:"100%", margin: '5px'}}>
//             <p>New Friends Suggestions</p>
//             <hr style={{border: '1px solid lightgray'}}/>
//             {uniqueFriendsOfFriends.length === 0 && (<p>No Suggestion</p>)}
//             <div 
//                 style={{
//                     padding: '5px', 
//                     borderRadius:'10px',
//                 }}>
//                     {uniqueFriendsOfFriends.map((userF) => (
//                            <div key={userF._id} style={{display:'flex', gap: '10px', marginBottom: '15px'}}>
//                             <img style={{
//                                 width: '40px',
//                                 height: '40px',
//                                 borderRadius: '50%',
//                                 border: '2px, solid, white',
//                                 objectFit: 'cover',
//                                 cursor: 'pointer',
//                             }} src={userF.profilePicture}/>
//                             <p>
//                                 <span
//                                     style={{cursor: 'pointer'}}
//                                     onClick={() => navigate(`/profiledashboard/${userF._id}/profilemain`)}
//                                 >
//                                 {userF.name} {userF.lastName}
//                                 </span>
//                             </p>
//                             {user?._id !== userF._id && (
//                                 <button
//                                 style={{
//                                     border: '1px solid lightGray', padding: '5px', 
//                                     borderRadius: '10px', 
//                                     cursor: 'pointer'
//                                 }}
//                                 onClick={
//                                     async() => {
//                                         await toggleFollow(userF._id)
//                                         await refreshFeed();
//                                 }}
//                                 >{isFollowByMe(userF._id) ? "Unfollow" : "Follow"}</button>
//                             )}
//                     </div>
//                 ))}
//             </div>
//         </div>  







//     </div>
//   )


















/* 
return (
    <div>
        <div 
            style={{
            padding: '10px', 
            borderRadius: '20px', 
            }}
        >
        <h3>Start a post</h3>
        <form onSubmit={handleSubmitNewCard}>
            <div >
                <label>Title</label>
                <br />
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Text</label>
                <br />
                <textarea 
                rows={3}
                style={{resize: 'none'}}
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <label>Upload Your Image/ Video </label>
                <br />
                <input 
                    ref={fileInputRef}
                    type="file"
                    accept='image/*,video/*' 
                    onChange={(e) => setMediaFile(e.target.files[0])}
                />
            </div>


            <button type='button' onClick={() => setIsLinkFieldShown(!isLinkFieldShown)}>Add Link 🔗</button>

            {isLinkFieldShown && (
                <div>
                    <label>Url</label>
                    <br />
                    <input 
                        value={webUrl}
                        type="url"
                        onChange={(e) => setWebUrl(e.target.value)}
                    />
                </div>
            )}

            <div>
                <label>Category:</label>
                <br />
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {CARD_CATEGORIES.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    )
                    )}
                </select>
            </div>
            

            {previewMediaFile && (
                <>
                    <MediaDisplay
                    mediaUrl={previewMediaFile}
                    mediaType={mediaFile.type.startsWith('video/') ? 'video' : 'image'}
                    style={{width: '20%', borderRadius: '10px'}}
                    />
                    <button 
                        type='button' 
                        onClick={() => {
                            setMediaFile(null);
                            fileInputRef.current.value = '';
                        }}
                    >remove</button>
                </>
            )}

            {error && <p style={{color: 'red'}}>{error}</p>}
            <br />

            <button type='button' onClick={() => setIsEmojiOpen(!isEmojiOpen)}>😊</button>

            {isEmojiOpen && <EmojiPicker onEmojiClick={onEmojiClick}/>}

            <button disabled={isLoading} type='submit'>
                {isLoading ? "Loading..." : "Post Your Card"}
            </button>

            <p>{successMessage}</p>
        </form>
        </div>
    </div>
  ) */
















    // CardItem:
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
    
              <MediaDisplay
                    mediaUrl={card.mediaUrl}
                    mediaType={card.mediaType}
                    style={{width: '500px', borderRadius: '20px'}}
              />
    
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
                  <p
                    style={{
                        color: 'gray', 
                        fontSize:'13px', 
                        margin: 0,
                    }}
                  >{getTimeAgo(card.createdAt)}</p>
                  <p>|</p>
                  {!card.category ? (<p>Category: Don't Have Yet</p>) : (<p>{card.category}</p>)}
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

