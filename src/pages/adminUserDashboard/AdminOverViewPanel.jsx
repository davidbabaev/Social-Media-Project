import React from 'react'
import { useCardsProvider } from '../../providers/CardsProvider'
import useUsers from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

export default function AdminOverViewPanel() {

  const {registeredCards} = useCardsProvider();
  const {users} = useUsers();
  const navigate = useNavigate();

  const commentsCount = registeredCards.reduce((sum, card) => sum + (card.comments || []).length, 0);
  const likesCount = registeredCards.reduce((sum, card) => sum + (card.likes || []).length, 0);
  
  const usersC = users.map((user) => {
    const maxCardsUser = registeredCards.filter((card) => {
      const usersCards = card.userId === user._id
      return usersCards;
    })
    return {user: user, cardCount: (maxCardsUser || []).length}
  }) 


  const mostActiveUser = usersC.length > 0
  ? usersC.reduce((max, current) => current.cardCount > max.cardCount ? current : max)
  : null;

  const mostLikesCard = registeredCards.length > 0
  ? registeredCards.reduce((max, current) => current.likes.length > max.likes.length ? current : max)
  : null


  const lastFiveUsers = users.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,5)
  const lstFiveCards = registeredCards.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,5)


  const countPerCategory = registeredCards.reduce((acc, card) => {
    if(acc[card.category]){
        acc[card.category] = acc[card.category] + 1
    } else{
        acc[card.category] = 1
    }
    return acc
  }, {})




  return (
    <div>
      <h1>Overview</h1>
      <div style={{width: '80vw', display: 'flex', gap:'15px'}}>
          <div style={{border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}}>
            <h2>{commentsCount}</h2>
            <p>Total Comments</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{likesCount}</h2>
            <p>Total Likes</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{users.length}</h2>
            <p>Total Users</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{mostActiveUser?.user.name}</h2>
            <p>Most Active User</p>
            <h2>{mostActiveUser?.cardCount}</h2>
            <p>total Posts</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{mostLikesCard?.title}</h2>
            <p>Most like card</p>
            <h2>{mostLikesCard?.likes.length}</h2>
            <p>Total likes</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{registeredCards.length}</h2>
            <p>total Posts</p>
          </div>
          
      </div>
      <br />

      <div style={{display: 'flex', gap:'15px'}}>
          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>Last 5 joined users</h2>
            {lastFiveUsers.map((userF) => (
              <div 
              key={userF._id}
              >
                <span style={{display:'flex', gap: '10px', marginBottom: '15px', borderBottom: '1px solid lightgray', cursor: 'pointer'}} onClick={() => navigate(`/profiledashboard/${userF._id}/profilemain`)}>
                  <img style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px, solid, white',
                      objectFit: 'cover',
                  }} src={userF.profilePicture}/>
                  <p>{userF.name} {userF.lastName} -</p>
                  <p>Joined At {userF.createdAt.split("T")[0]}</p>
                </span>
              </div>
            ))}
          </div>

          <div style={{width: "40%",border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>Last 5 created posts</h2>
            {lstFiveCards.map((cardF) => {
              const cardCreator = users.find(u => u._id === cardF.userId)

              return(
                <div 
                  key={cardF._id}
                  style={{display:'flex', gap: '10px', alignItems: 'center', marginBottom: '15px'}}  
                >
                  <img 
                    src={cardF.image}
                    style={{width: '100px', height: '80px',borderRadius: '10px', objectFit: 'cover', cursor: 'pointer'}}
                    onClick={() => navigate(`/carddetails/${cardF._id}`)}
                  />
                  <div>
                      <div style={{display:'flex'}}>
                        <img style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px, solid, white',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }} 
                        src={cardCreator?.profilePicture}
                        onClick={() => navigate(`/profiledashboard/${cardCreator?._id}/profilemain`)}
                        />

                        <div style={{display: 'flex', flexDirection:'column'}}>
                          <p 
                            style={{margin: '5px 0px', cursor: 'pointer'}}
                            onClick={() => navigate(`/profiledashboard/${cardCreator?._id}/profilemain`)}
                            >{cardCreator?.name} {cardCreator?.lastName}  
                          </p>
                          <p style={{color: 'gray', fontSize:'12px', margin: 0}}>{cardF.createdAt.split("T")[0]}</p>
                        </div>
                      </div>
                      <p 
                        style={{fontWeight: 'bold', margin: 0, cursor: 'pointer'}}
                        onClick={() => navigate(`/carddetails/${cardF._id}`)}
                        >{cardF.title}</p>
                      <p 
                        onClick={() => navigate(`/carddetails/${cardF._id}`)}
                        style={{
                          cursor: 'pointer',
                          margin: '5px 0px',
                          margin: 0,
                          whiteSpace: 'nowrap',        // prevent text from wrapping
                          overflow: 'hidden',          // hide overflow
                          textOverflow: 'ellipsis',    // show "..." at the end
                          maxWidth: '200px'
                        }}>{cardF.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}}>
            <h2>Posts by catrgories</h2>
            {Object.entries(countPerCategory).map(([catName, count], index) => (
              <p key={index}>{catName} - {count} {count === 1 ? "Post" : "Posts"}</p>
            ))}
          </div>
      </div>
    </div>

)
}

