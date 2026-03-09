import React, { useState, useMemo } from 'react'
import useUsers from '../../hooks/useUsers'
import { useCardsProvider } from '../../providers/CardsProvider';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useFavoriteCards from '../../hooks/useFavoriteCards';
import { CARD_CATEGORIES } from '../../constants/cardsCategories';
export default function AdminCardsPanel() {

  const {handleDeleteUser, loading, handleBanUser, getUsers} = useUsers();
  const {registeredCards, refreshFeed, fetchCards} = useCardsProvider();

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

    const {user} = useAuth();
    const {users} = useUsers(); 
    const {favoriteCards} = useFavoriteCards();


  const [confirmUser, setConfirmUser] = useState(null);
 
  // sort table
  const [sortConfig, setSortConfig] = useState({column: '', direction: 'asc'});
  
  const handleSortTable = (column) => {
    if(column !== sortConfig.column){
      setSortConfig({column: column, direction: 'asc'})
    }
    else{
      setSortConfig({column:column ,direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'})
    }
  }

  const navigate = useNavigate();

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


  
  if(loading){
      return <p>Loading...</p>
  }

  return(
    <div>
      <div style={{border: '1px solid lightgray', margin: '20px 0px', padding: '15px', borderRadius: '10px'}}>
          
        <div>
            <select 
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value)}    
            >
                <option value="">All Users</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>{user?.name}</option>
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
        
      </div>

      <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#Count</th>
              <th>Creator</th>
              <th>Thumbnail Image</th>
              <th>Title</th>
              <th>Category</th>
              <th onClick={() => handleSortTable('joined')} 
                  style={{cursor: 'pointer'}}
                  >
                  Created Date
                {sortConfig.column === 'joined' ? 
                (sortConfig.direction === 'asc' ? '▲': '▼')
                : ' ↕'}
              </th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Delete</th>
              <th>Ban</th>
              <th>Status</th>
            </tr>
          </thead>
        <tbody>

        {filteredCards.map((card, indexM) => {
          
          const creator = users.find(user => user._id === card.userId);
          
          return(
                  <tr 
                    key={card._id} 
                    onClick={() => navigate(`/carddetails/${card._id}`)}>
                    <td>{indexM + 1}</td>
                      <td><img
                      src={creator?.profilePicture} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px, solid, white',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                      /> {creator?.name} {creator?.lastName}</td>
                    <td>
                      <img 
                        src={card.image}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '10px',
                            border: '2px, solid, white',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}  
                      />
                    </td>
                    <td>{card.title}</td>
                    <td>{card.category}</td>
                    <td>{card.createdAt.split("T")[0]}</td>
                    <td>{card.likes.length}</td>
                    <td>{card.comments.length}</td>
                    <td>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmUser(creator)
                        }}>
                      Delete Post
                    </button>
                    </td>
                    <td>
                      {creator?._id !== user._id ? (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleBanUser(creator?._id);
                        }}>{creator?.isBanned ? "Unban User" : "Ban User"}</button>
                      ):(
                        <p>You Admin</p>
                      )}
                    </td>
                    <td>{creator?.isBanned ? "Banned" : "Not Banned"}</td>
                  </tr>  
              )})}
              </tbody>
            </table>
        </div>
              {
                confirmUser && (
                  <ConfirmationDialog
                      creator={confirmUser}
                      onClose={() => setConfirmUser(null)}
                      onConfirm={async () => {
                          await handleDeleteUser(confirmUser._id);
                          await getUsers();
                          await fetchCards();
                          await refreshFeed();
                          setConfirmUser(null);
                      }}
                  />
                )
              }
    </div>
  </div>
  )
}
