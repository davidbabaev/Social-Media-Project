import React, { useState } from 'react'
import { useCardsProvider } from '../../providers/CardsProvider';
import { useAuth } from '../../providers/AuthProvider';
import { CARD_CATEGORIES } from '../../constants/cardsCategories';
export default function MyCardsSection() {

    const {registeredCards, handleDeleteCard, handleEditCard} = useCardsProvider();
    const {user} = useAuth();
    const [editingCardId, setEditingCardId] = useState(null);
    
    // edit card values states:
    const [editTitle, setEditTitle] = useState('');
    const [editText, setEditText] = useState('');
    const [editImg, setEditImg] = useState('');
    const [editCategory, setEditCategory] = useState('');
  
    const myCards = registeredCards.filter(card => card.userId === user._id);
    console.log("user._id: ", user._id);
    console.log("card userIds: ", registeredCards.map(c => c.userId));
    

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
            <div>
                <p>EDITING:</p>
                <hr />
                <h2>{editTitle}</h2>
                <p>{editCategory}</p>
                <p>{editText}</p>
                <p>link: {editImg}</p>
                <input 
                placeholder='Title'
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                placeholder='Text'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}  
                />

                <select 
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                >
                <option value="">All Categories</option>
                {CARD_CATEGORIES.map((cardCategory) => (
                    <option key={cardCategory} value={cardCategory}>{cardCategory}</option>
                ))}
                </select>

                <input 
                placeholder='Image: https://example.com/image.jpg'
                value={editImg}
                onChange={(e) => setEditImg(e.target.value)}  
                />
                <button onClick={() => setEditingCardId(null)}>Cancel</button>
                <button
                onClick={async () => {
                    let result = await handleEditCard(
                        card._id, 
                    {
                        title: editTitle, 
                        content: editText, 
                        image: editImg, 
                        category: editCategory
                    })
                    if(result.success){
                        setEditingCardId(false)
                    }else{
                        alert(result.message)
                    }
                }}
                >Save</button>
            </div>
            ) : (
            // no - I am not being edited -> show normally
            <div>
                <h2>{card.title}</h2>
                <p>{card.content}</p>
                <p><span style={{fontWeight: 'bold'}}>Category: </span>{card.category}</p>
                <img src={card.image} style={{width: '90%', borderRadius: '20px'}}/>
                <hr />
                <div style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '10px'
                    }}>
                    <img style={{width: '6%', height: '6%', borderRadius: '50%', marginTop: '4px'}} src={user?.profilePicture || 'https://cdn.pixabay.com/profilePicture/2023/02/18/11/00/icon-7797704_640.png'}/>
                    <p>{user?.name} {user?.lastName}</p>
                    <p>|</p>
                    <p>Created at: {new Date(card.createdAt).toLocaleDateString()}</p>
                    <button onClick={() => handleDeleteCard(card._id)}>Remove</button>
                    <button onClick={() => {
                        setEditingCardId(card._id);
                        setEditTitle(card.title);
                        setEditText(card.content);
                        setEditImg(card.image);
                        setEditCategory(card.category);
                    }}>Edit</button>
                </div>
            </div>
            )}
        </div>
    ))}
</div>
)
}
