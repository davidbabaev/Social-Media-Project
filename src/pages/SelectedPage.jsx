import React from 'react'
import useSelectedUsers from '../hooks/useSelectedUsers'
import useFavoriteCards from '../hooks/useFavoriteCards'
import { useNavigate } from 'react-router-dom';
import useAllUsers from '../hooks/useAllUsers';

export default function SelectedPage() {

    const {selectedUsers, handleRemoveUser} = useSelectedUsers()
    const {favoriteCards, handleRemoveCard} = useFavoriteCards();

    const {allUsers} = useAllUsers()

    const navigate = useNavigate();

  return (
    <div>
        <div>
            <h2>Selected Users</h2>
            {!selectedUsers[0] && (<p>You Didn't Select Users  Yet</p>)}
            {selectedUsers.map((selected) => (
                <div key={selected.userId}>
                    <img style={{borderRadius: '50%', width: '100px'}} src={selected.photo}/>
                    <p>{selected.name}</p>
                    <button onClick={() => handleRemoveUser(selected)}>Remove</button>
                    <button onClick={() => navigate(`/appusers/userprofile/${selected.userId}`)}>to the user page</button>
                    <hr />
                </div>
            ))}
        </div>


        <div>
            <h2>Selected Cards</h2>
            {favoriteCards.map((favCard) => {

                const currentUser = allUsers.find(user => favCard.userId === user.userId) 

                return(
                    <div style={{
                        border: 'solid black 1px', 
                        padding: '20px', 
                        borderRadius: '20px', 
                        margin: '20px 0px'
                    }} key={favCard.cardId}>

                        <h2>{favCard.title}</h2>
                        <p>{favCard.text}</p>
                        <img src={favCard.img} style={{
                            width: '500px',
                            borderRadius: '20px'
                        }}/>
                        <hr />
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'row', 
                            gap: '10px'
                        }}>
                            <img style={{width: '6%', height: '6%', borderRadius: '50%', marginTop: '4px'}} src={currentUser.photo || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}/>
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
