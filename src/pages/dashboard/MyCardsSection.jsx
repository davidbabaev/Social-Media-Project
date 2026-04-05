import React, { useState } from 'react'
import { useCardsProvider } from '../../providers/CardsProvider';
import { useAuth } from '../../providers/AuthProvider';
import getTimeAgo from '../../utils/getTimeAgo';
import MediaDisplay from '../../components/MediaDisplay';
import CreateCardForm from '../../components/CreateCardForm';
export default function MyCardsSection() {

    const {registeredCards, handleDeleteCard} = useCardsProvider();
    const {user} = useAuth();
    const [editingCardId, setEditingCardId] = useState(null);
  
    const myCards = registeredCards.filter(card => card.userId === user._id);

    if(!user){
        return <p>Loading ...</p>
    }

return (
<div>
    <h2>My Cards</h2>
    {myCards.length === 0 && <p>You haven't created any cards yet.</p>}
    {myCards.map((card) => (
        <div style={{
        border: 'solid black 1px', 
        padding: '20px', 
        borderRadius: '20px', 
        margin: '20px 0px'
        }} key={card._id}>
            {editingCardId === card._id ? (
            // yes - I am being edited -> show form
            <CreateCardForm 
                card={card}
                onSuccess={() => setEditingCardId(null)}
            />
            ) : (
            // no - I am not being edited -> show normally
            <div>
                <h2>{card.title}</h2>
                <p>{card.content}</p>
                <p><span style={{fontWeight: 'bold'}}>Category: </span>{card.category}</p>

                <MediaDisplay
                    mediaUrl={card.mediaUrl}
                    mediaType={card.mediaType}
                    style={{width: '90%', borderRadius: '20px'}}
                />

                <hr />
                <div style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '10px'
                    }}>
                    <img style={{width: '6%', height: '6%', borderRadius: '50%', marginTop: '4px'}} src={user?.profilePicture || 'https://cdn.pixabay.com/profilePicture/2023/02/18/11/00/icon-7797704_640.png'}/>
                    <p>{user?.name} {user?.lastName}</p>
                    <p>|</p>
                    <p
                    style={{
                        color: 'gray', 
                        fontSize:'13px', 
                        margin: 0,
                    }}
                    >
                        {getTimeAgo(card.createdAt)}
                    </p>

                    <button onClick={() => handleDeleteCard(card._id)}>Remove</button>
                    <button onClick={() => setEditingCardId(card._id)}>Edit</button>
                </div>
            </div>
            )}
        </div>
    ))}
</div>
)
}
