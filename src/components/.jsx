  return (
    <div style={{display: 'flex', width:"100%"}}>





        <div style={{width:"100%", margin: '5px', textAlign:'center'}}>
            <img 
                style={{width: '100%', borderRadius: '10px', height: '100px'}}
                src= {user?.coverImage}
            />
            <img 
                style={{width: '40%', borderRadius: '50%', marginTop:'-50px', border: '2px solid white'}}
                src= {user?.profilePicture}    
            />
            <p style={{fontSize: '20px', fontWeight:'bold'}}>{user?.name} {user?.lastName}</p>
            <p style={{}}>{user?.job}</p>
            <p style={{}}>{user?.address?.country}, {user?.address?.city}</p>
            <div style={{display:'flex', justifyContent: 'center'}}>
                {userFollowing.slice(0,6).map((followedUser) => (
                    <img 
                        key= {followedUser._id} 
                        src= {followedUser.profilePicture}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px, solid, white',
                            marginLeft: '-20px',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/profiledashboard/${followedUser._id}/profilemain`)}
                    />
                ))}

            </div>

            <div style={{display: 'flex', gap: '10px'}}>
              <p>followers - {getFollowersCount(user?._id)}</p>
              <p>following - {getFollowingCount(user?._id)}</p>
              <p>posts - {myCardsCount}</p>
            </div>
            <button 
                style={{border: '1px solid lightGray', padding: '10px', borderRadius: '10px', cursor: 'pointer'}}
                onClick={() => navigate(`/dashboard/myfavorites`)}  
            >Favorite Users</button>
            <br />
            <br />
            <button 
                style={{border: '1px solid lightGray', padding: '10px', borderRadius: '10px', cursor: 'pointer'}}
                onClick={() => navigate(`/dashboard/myfavoritescards`)}  
            >Favorite Posts</button>
        </div>














        <div style={{padding: '5px', width:"100%", margin: '5px'}}>



            {/* Popup for edit profile */}
            {isFilled === true && (
                <div>
                    <p>Complete you profile data</p>
                    <button
                        onClick={() => 
                            navigate(`/dashboard/myprofile`, { state: {editMode: true} })}
                    >
                        Edit Profile 📝
                    </button>
                </div>
            )}







            <div style={{padding: '5px', border: '1px solid lightGray',     borderRadius:'10px'}}>
                <CreateCardForm
                    onSuccess = {() => refreshFeed()}
                />    
            </div>
            <div style={{padding: '5px'}}>
                {countedRegisterCards.map((card) => (
                    <CardItem key={card._id} card={card}/>
                ))}
                <div>
                    {count >= feedCards.length ? (<p>No More Cards</p>) : (
                    <button onClick={() => setCount(count + 2)}>Read more</button>
                    )} 

                </div>
            </div>
        </div>


{/* ====================================================== */}

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
                <label>Image</label>
                <br />
                <input 
                    value={img}
                    type="text" 
                    onChange={(e) => setImg(e.target.value)}
                />
            </div>

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

            {error && <p style={{color: 'red'}}>{error}</p>}
            <br />
            <button type='submit'>Post Your Card</button>
            <p>{successMessage}</p>
        </form>
        </div>
    </div>
  )
















        <div style={{padding: '5px', border: '1px solid lightGray', borderRadius:'10px', width:"100%", margin: '5px'}}>
            <p>New Friends Suggestions</p>
            <hr style={{border: '1px solid lightgray'}}/>
            {uniqueFriendsOfFriends.length === 0 && (<p>No Suggestion</p>)}
            <div 
                style={{
                    padding: '5px', 
                    borderRadius:'10px',
                }}>
                    {uniqueFriendsOfFriends.map((userF) => (
                           <div key={userF._id} style={{display:'flex', gap: '10px', marginBottom: '15px'}}>
                            <img style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '2px, solid, white',
                                objectFit: 'cover',
                                cursor: 'pointer',
                            }} src={userF.profilePicture}/>
                            <p>
                                <span
                                    style={{cursor: 'pointer'}}
                                    onClick={() => navigate(`/profiledashboard/${userF._id}/profilemain`)}
                                >
                                {userF.name} {userF.lastName}
                                </span>
                            </p>
                            {user?._id !== userF._id && (
                                <button
                                style={{
                                    border: '1px solid lightGray', padding: '5px', 
                                    borderRadius: '10px', 
                                    cursor: 'pointer'
                                }}
                                onClick={
                                    async() => {
                                        await toggleFollow(userF._id)
                                        await refreshFeed();
                                }}
                                >{isFollowByMe(userF._id) ? "Unfollow" : "Follow"}</button>
                            )}
                    </div>
                ))}
            </div>
        </div>  







    </div>
  )