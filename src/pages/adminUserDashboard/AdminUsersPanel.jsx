import React from 'react'
import useUsers from '../../hooks/useUsers'
import { useCardsProvider } from '../../providers/CardsProvider';


export default function AdminUsersPanel() {

  const {users, handleDeleteUser} = useUsers();

  const {registeredCards} = useCardsProvider();

  
  
  return(
    <div>
      {users.map((userM) => {
        
        const userCardsCount = registeredCards.filter((card) => {
          return card.userId === userM._id
        }).length;

        const userFollowersCount = users.filter((userF) => {
          return userF.following.includes(userM._id)
        }).length;
        
        return(
          <div key={userM._id} style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
            <img src={userM.profilePicture} style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '2px, solid, white',
                objectFit: 'cover',
                cursor: 'pointer'
            }}/>
            <p>{userM.name} {userM.lastName}</p>
            <p>|</p>
            <p>{userM.email}</p>
            <p>|</p>
            <p>{userM.createdAt.split("T")[0]}</p>
            <p>|</p>
            <p>Posts: {userCardsCount}</p>
            <p>|</p>
            <p>Followers: {userFollowersCount}</p>
            <p>|</p>
            <p>Role: {userM.isAdmin ? "Admin" : "User"}</p>
            <button onClick={() => handleDeleteUser(userM._id)}>Delete User</button>
          </div>
        )})}
    </div>
  )
}
