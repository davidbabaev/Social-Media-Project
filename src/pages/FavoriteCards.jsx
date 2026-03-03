import React from 'react'
import useFavoriteCards from '../hooks/useFavoriteCards'
import { useNavigate } from 'react-router-dom';
import useUsers from '../hooks/useUsers';
export default function FavoriteCards() {

    const {favoriteCards, handleRemoveCard} = useFavoriteCards();

    const {users} = useUsers()

    const navigate = useNavigate();

  return (
    <div>
        <div>
            <h2>Selected Cards</h2>
            {favoriteCards.map((favCard) => {

                const currentUser = users.find(user => favCard.userId === user._id) 
                if(!currentUser) return;

                return(
                    <div style={{
                        border: 'solid black 1px', 
                        padding: '20px', 
                        borderRadius: '20px', 
                        margin: '20px 0px'
                    }} key={favCard._id}>

                        <h2>{favCard.title}</h2>
                        <p>{favCard.content}</p>
                        <img src={favCard.image} style={{
                            width: '500px',
                            borderRadius: '20px'
                        }}/>
                        <hr />
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'row', 
                            gap: '10px'
                        }}>
                            <img style={{width: '6%', height: '6%', borderRadius: '50%', marginTop: '4px'}} src={currentUser.profilePicture || 'https://cdn.pixabay.com/profilePicture/2023/02/18/11/00/icon-7797704_640.png'}/>
                            <p>{currentUser.name}</p>
                            <p>|</p>
                            <p>Created at: {new Date(favCard.createdAt).toLocaleDateString()}</p>
                            <p>|</p>
                            {!favCard.category ? (<p>Don't Have Categoty</p>) : (<p>Category: {favCard.category}</p>)}
                            
                            <button onClick={() => handleRemoveCard(favCard)}>Remove</button>
                        </div>
                    </div>
                )
        })}
        </div>
    </div>
  )
}
