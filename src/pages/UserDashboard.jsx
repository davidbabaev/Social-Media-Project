import React, { useCallback, useMemo, useState } from 'react'
import { useCardsProvider } from '../providers/CardsProvider'
import { useAuth } from '../providers/AuthProvider'
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import useAllUsers from '../hooks/useAllUsers';
import useCountries from '../hooks/useCountries';

export default function UserDashboard() {

    const {registeredCards, handleDeleteCard, handleEditCard} = useCardsProvider()
    const {user, editUser} = useAuth();
    const {allUsers} = useAllUsers();
    const [editingCardId, setEditingCardId] = useState(null);
    const {apiCountriesList} = useCountries(); 

    // edit card values states:
    const [editTitle, setEditTitle] = useState('');
    const [editText, setEditText] = useState('');
    const [editImg, setEditImg] = useState('');
    const [editCategory, setEditCategory] = useState('');
  
    const myCards = registeredCards.filter(card => card.userId === user.userId);
    
    // edit logged-in user values states:
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editCountry, setEditCountry] = useState('');
    const [editPhoto, setEditPhoto] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editGender, setEditGender] = useState('');
    const [editPhone, setEditPhone] = useState('');

    const [editMode, setEditMode] = useState(false);

    // import edit function that we need to initial in the AuthProvider page
    
    const currentUser = useMemo(() => {
      const currentUser = allUsers.find(logedUser => logedUser.userId === user.userId);
      return currentUser;
    }, [allUsers]) 

  return (
    <div>
        <h1>Your Dashboard</h1>
        {!editMode ? (
            <div
              style={{
                border: 'solid black 1px', 
                padding: '20px', 
                borderRadius: '20px', 
                margin: '20px 0px'
              }}
              >
              <h2>My Profile</h2>
              <img style={{width: '100px', borderRadius: '50%'}} src={currentUser.photo}/>
              <h3>{currentUser.name}</h3>
              <p>Email: {currentUser.email}</p>
              <p>Country: {currentUser.country}</p>
              <p>Age: {currentUser.age}</p>
              <p>Gender: {currentUser.gender}</p>
              <p>Phone: {currentUser.phone}</p>
              <p>Source: {currentUser.source}</p>

              <button onClick={() => {
                setEditMode(!editMode);
                setEditName(currentUser.name);
                setEditEmail(currentUser.email);
                setEditCountry(currentUser.country);
                setEditPhoto(currentUser.photo);
                setEditAge(currentUser.age);
                setEditGender(currentUser.gender);
                setEditPhone(currentUser.phone);
              }
                }>Edit Profile</button>

            </div>

        ): (
            <div>
              <div>
                <label>Edit Name:</label>
                <br />
                <input type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder= {editName}
                  />
              </div>

              <div>
                <label>Edit Email:</label>
                <br />
                <input type="text" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder= {editEmail}
                  />
              </div>

              <div>
                <label>Edit Country:</label>
                <br />
                <select 
                  value={editCountry}
                  onChange={(e) => setEditCountry(e.target.value)}  
                >
                  <option value="">All</option>
                  {apiCountriesList.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Edit Photo:</label>
                <br />
                <input type="text" 
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                  placeholder= {editPhoto}
                  />
              </div>

              <div>
                <label>Edit Age:</label>
                <br />
                <input type="number" 
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  placeholder= {editAge}
                  />
              </div>

              <div>
                <label>Edit Gender</label>
                <br />
                <select 
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

               <div>
                <label>Edit Phone:</label>
                <br />
                <input type="text" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder= {editPhone}
                  />
              </div>

              <br />

              <button
                onClick={
                  () => {
                    editUser( currentUser.userId ,editName, editEmail, editCountry, editPhoto, editAge, editGender, editPhone)
                    setEditMode(!editMode)
                  }}
              >Save Edits</button>
              <button onClick={() => setEditMode(!editMode)}>Cancel Edit Mode</button>

            </div>
        )}

        <h2>My Cards</h2>
        {myCards.length === 0 && <p>You haven't created any cards yet.</p>}
        {myCards.map((card) => (
          <div style={{
            border: 'solid black 1px', 
            padding: '20px', 
            borderRadius: '20px', 
            margin: '20px 0px'
            }} key={card.cardId}>
              {editingCardId === card.cardId ? (
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
                    onClick={() => {
                      handleEditCard(card.cardId, editTitle, editText, editImg, editCategory)
                      setEditingCardId(null)
                    }}
                  >Save</button>
                </div>
              ) : (
                // no - I am not being edited -> show normally
                <div>
                    <h2>{card.title}</h2>
                    <p>{card.text}</p>
                    <p><span style={{fontWeight: 'bold'}}>Category: </span>{card.category}</p>
                    <img src={card.img} style={{width: '90%', borderRadius: '20px'}}/>
                    <hr />
                    <div style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        gap: '10px'
                      }}>
                        <img style={{width: '6%', height: '6%', borderRadius: '50%', marginTop: '4px'}} src={currentUser.photo || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}/>
                        <p>{currentUser.name}</p>
                        <p>|</p>
                        <p>Created at: {new Date(card.createdAt).toLocaleDateString()}</p>
                        <button onClick={() => handleDeleteCard(card.cardId)}>Remove</button>
                        <button onClick={() => {
                          setEditingCardId(card.cardId);
                          setEditTitle(card.title);
                          setEditText(card.text);
                          setEditImg(card.img);
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
