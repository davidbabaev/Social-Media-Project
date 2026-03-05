import React from 'react'
import { useCardsProvider } from '../../providers/CardsProvider'
import useUsers from '../../hooks/useUsers';

export default function AdminOverViewPanel() {

  const {registeredCards} = useCardsProvider();
  const {users} = useUsers();

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
    </div>

)
}

