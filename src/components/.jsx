
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