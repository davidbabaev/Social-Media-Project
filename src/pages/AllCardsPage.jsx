import React, { useMemo, useState } from 'react'
import { useCardsProvider } from '../providers/CardsProvider'
import useAllUsers from '../hooks/useAllUsers';
import useDebounce from '../hooks/useDebounce';
import useFavoriteCards from '../hooks/useFavoriteCards';
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import useLikedCards from '../hooks/useLikedCards';
import LoginPopup from '../components/LoginPopup';
import CardsComments from '../components/CardsComments';
import useCommentsCards from '../hooks/useCommentsCards';

export default function AllCardsPage() {

    // filter cards by creator
    const [creatorId, setCreatorId] = useState('')

    // search cards by title/ text
    const [searchCard, setSearchCard] = useState('')

    const debounceSearchCard = useDebounce(searchCard, 2000);

    // sort cards (newest/ oldest)
    const [dateSort, setDateSort] = useState('');

    // favorite/ like cards
    const [favorites, setFavorites] = useState('')

    // card categories/ tags
    const [categoryFilter, setCategoryFilter] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    function onClose(){
        setIsOpen(false)
    }

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const {addComment, countComments} = useCommentsCards();

    const navigate = useNavigate();
    
    const {registeredCards} = useCardsProvider();
    const {toggleLike, isLikeByMe, getLikeCount} = useLikedCards()
    const {user} = useAuth();
    const [count, setCount] = useState(2);
    const {allUsers} = useAllUsers(); 
    const {favoriteCards ,handleFavoriteCards} = useFavoriteCards();

    const filteredCards = useMemo(() => {

        // Step 1: Choose starting data based on favorites filter:
        let result = 
        favorites === 'myFavorites' ? [...favoriteCards] : [...registeredCards];
        
        if(creatorId !== ''){
            result = result.filter(card => card.userId === creatorId)
        }

        if(debounceSearchCard !== ''){
            result = result.filter(card => card.title.toLowerCase().includes(debounceSearchCard.toLowerCase()))
        }

        if(dateSort !== ''){
            if(dateSort === 'newest'){
                result.sort((a,b) => b.createdAt.localeCompare(a.createdAt))
            }
            else if (dateSort === 'oldest'){
                result.sort((a,b) => a.createdAt.localeCompare(b.createdAt))   
            }
        }

        if(categoryFilter !== ''){
            result = result.filter(card => card.category === categoryFilter)
        }

        return result;
    }, [creatorId, registeredCards, debounceSearchCard, dateSort, categoryFilter, favorites])
    
    const countedRegisterCards = filteredCards.slice(0, count)    

  return (
    <div>
        <h1>All Cards</h1>

        <div>
            <select 
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value)}    
            >
                <option value="">All Users</option>
                {allUsers.map((user) => (
                    <option key={user.userId} value={user.userId}>{user.name}</option>
                ))}
            </select>
        </div>

        <div>
            <select 
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
            >
                <option value="">All Dates</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
            </select>
        </div>

        <div>
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">All Categories</option>
                {CARD_CATEGORIES.map((category, index) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <select 
                value={favorites}
                onChange={(e) => setFavorites(e.target.value)}
            >
                <option value="">All / Favorites</option>
                <option value="myFavorites">My Favorites Cards</option>
            </select>
        </div>

        <div>
            <input 
                type="text" 
                value={searchCard}
                onChange={(e) => setSearchCard(e.target.value)}
            />
        </div>

        {countedRegisterCards.length === 0 && <p>You haven't created any cards yet.</p>}
        <div style={{
            display: 'flex', 
            flexDirection: 'column'
            }}>
        {countedRegisterCards.map((card) => {
            const creator = allUsers.find(user => user.userId === card.userId);
            return(
                <div style={{
                    border: 'solid black 1px', 
                    padding: '20px', 
                    borderRadius: '20px', 
                    margin: '20px 0px'
                    }} key={card.cardId}>

                    <h2>{card.title}</h2>
                    <p>{card.text}</p>
                    <img src={card.img} style={{
                        width: '500px',
                        borderRadius: '20px'
                    }}/>
                    <hr />
                    <div style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        gap: '10px'
                        }}>
                        <img 
                            style={{
                                width: '6%', 
                                height: '6%', 
                                borderRadius: '50%', 
                                marginTop: '4px',
                                cursor: 'pointer'
                            }} 
                                src={creator?.photo || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                            onClick={() => navigate(`/userprofile/${creator.userId}`)}    
                        />
                        <p>
                            <span
                                style={{cursor: 'pointer'}}
                                onClick={() => navigate(`/userprofile/${creator.userId}`)}
                            >
                                {creator?.name}
                            </span>
                        </p>
                        <p>|</p>
                        <p>Created at: {new Date(card.createdAt).toLocaleDateString()}</p>
                        <p>|</p>
                        {!card.category ? (<p>Category: Don't Have Yet</p>) : (<p>Category: {card.category}</p>)}
                        <p>|</p>
                        <p>{getLikeCount(card.cardId)}</p>
                        <p>|</p>

                            <div>
                                {user ? (
                                    <button onClick={() => toggleLike(card.cardId)}>
                                        {isLikeByMe(card.cardId) ? "Unlike" : "Like"}
                                    </button>
                                ):(
                                    <button onClick={() => setIsOpen(true)}>Like</button>
                                )}

                                {user ? (
                                    <div>
                                        {favoriteCards.some(c => c.cardId === card.cardId) ? (
                                            <button onClick={() => handleFavoriteCards(card)}>Remove From Favorite</button>
                                        ) : (
                                            <button onClick={() => handleFavoriteCards(card)}>Add To Favorites</button>
                                        )}
                                    </div>
                                    ) : (
                                        <button onClick={() => setIsOpen(true)}>Add to favorites</button>
                                    )}

                                {user ? (
                                    <button onClick={() => setIsCommentOpen(!isCommentOpen)}>add new comment</button>
                                ): (
                                    <button onClick={() => setIsOpen(true)}>add new comment</button>
                                )}
                              
                            </div>
                    </div>
                    <div>
                        {
                        isCommentOpen &&(  
                            <CardsComments
                                card = {card}
                                allUsers={allUsers}
                                addComment={addComment}
                            />
                        )}
                    </div>
                        
                </div>
            )
            
        })}

        { isOpen && (
            <LoginPopup
                onClose = {onClose}
            />
        )}

        </div>
        {count >= filteredCards.length ? (<p>No More Cards</p>) : (
            <button onClick={() => setCount(count + 2)}>Read more</button>
        )}
    </div>
  )
}