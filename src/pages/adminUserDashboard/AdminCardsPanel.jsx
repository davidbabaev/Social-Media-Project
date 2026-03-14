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

  const {loading, getUsers} = useUsers();
  const {registeredCards, refreshFeed, fetchCards, handleDeleteCard, handleBanCard} = useCardsProvider();

  // const pageSize = 10;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // filter cards by creator
    const [creatorId, setCreatorId] = useState('')

    // search cards by title/ text
    const [searchCard, setSearchCard] = useState('')

    const debounceSearchCard = useDebounce(searchCard, 2000);

    // favorite/ like cards
    const [favorites, setFavorites] = useState('')

    // card categories/ tags
    const [categoryFilter, setCategoryFilter] = useState('');

    const {user} = useAuth();
    const {users} = useUsers(); 
    const {favoriteCards} = useFavoriteCards();


  const [confirmCard, setConfirmCard] = useState(null);
 
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

    if(categoryFilter !== ''){
        result = result.filter(card => card.category === categoryFilter)
    }

    result = [...result].sort((a,b) => {

      if(sortConfig.column !== ''){
        // createdAt
        if(sortConfig.column === 'createdAt'){
          if(sortConfig.direction === 'asc'){
              return new Date(a.createdAt) - new Date(b.createdAt)
            }
            else{
              return new Date(b.createdAt) - new Date(a.createdAt)
          }
        }

        // likes
        if(sortConfig.column === 'likes'){

          if(sortConfig.direction === 'asc'){
            return a.likes.length - b.likes.length
          }
          else{
            return b.likes.length - a.likes.length
          }
        }
        
        // category
        if(sortConfig.column === "categories"){
            if(sortConfig.direction === 'asc'){
                return (a.category).localeCompare(b.category);
              }
              else{
                return (b.category).localeCompare(a.category);
            }
        }

        // creator name
        if(sortConfig.column === "creators"){
            const aCreator = users.find(u => u._id === a.userId);
            const bCreator = users.find(u => u._id === b.userId);

            if(sortConfig.direction === 'asc'){
                return (aCreator?.name || '').localeCompare(bCreator?.name || '');
              }
              else{
                return (bCreator?.name || '').localeCompare(aCreator?.name || '');
            }
        }
      }
    })
  
      return result;
  }, [creatorId, registeredCards, debounceSearchCard, categoryFilter, favorites, sortConfig, users])

  const totalPages = Math.ceil(filteredCards.length / pageSize);

  const numbersArray = (num) => {
    return Array.from({length: num}, (_, i) => i + 1);
  }
  const pagesNumbers = numbersArray(totalPages) // [1,2,3]

  const sliced = filteredCards.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const start = (currentPage - 1) * pageSize + 1;
  const endPage = Math.min(currentPage * pageSize ,filteredCards.length)
  const total = filteredCards.length
  
  if(loading){
      return <p>Loading...</p>
  }

  return(
    <div>
      <div style={{border: '1px solid lightgray', margin: '20px 0px', padding: '15px', borderRadius: '10px'}}>
          
        <div>
            <select 
                value={creatorId}
                onChange={(e) => {
                  setCreatorId(e.target.value)
                  setCurrentPage(1)
                }}    
            >
                <option value="">All Users</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>{user?.name}</option>
                ))}
            </select>
        </div>

        <div>
            <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value)
                  setCurrentPage(1)
                }}
            >
                <option value="">All Categories</option>
                {CARD_CATEGORIES.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <select 
                value={favorites}
                onChange={(e) => {
                  setFavorites(e.target.value)
                  setCurrentPage(1)
                }}
            >
                <option value="">All / Favorites</option>
                <option value="myFavorites">My Favorites Cards</option>
            </select>
        </div>

        <div>
            <input 
                type="text" 
                value={searchCard}
                onChange={(e) => {
                  setSearchCard(e.target.value)
                  setCurrentPage(1)
                }}
            />
        </div>
        
      </div>

      <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#Count</th>
              <th
                onClick={
                  () => handleSortTable('creators')} 
                  style={{cursor: 'pointer'}}
              >
                Creator
                {sortConfig.column === 'creators' ? 
                (sortConfig.direction === 'asc' ? '▲': '▼')
                : ' ↕'}
              </th>
              <th>Thumbnail Image</th>
              <th>Title</th>
              <th onClick={() => handleSortTable('categories')} 
                  style={{cursor: 'pointer'}}
                  >
                  Category
                {sortConfig.column === 'categories' ? 
                (sortConfig.direction === 'asc' ? '▲': '▼')
                : ' ↕'}
              </th>
              <th onClick={() => handleSortTable('createdAt')} 
                  style={{cursor: 'pointer'}}
                  >
                  Created Date
                {sortConfig.column === 'createdAt' ? 
                (sortConfig.direction === 'asc' ? '▲': '▼')
                : ' ↕'}
              </th>
              <th onClick={() => handleSortTable('likes')} 
                  style={{cursor: 'pointer'}}
                  >
                  Likes
                {sortConfig.column === 'likes' ? 
                (sortConfig.direction === 'asc' ? '▲': '▼')
                : ' ↕'}
              </th>
              <th>Comments</th>
              <th>Delete</th>
              <th>Ban</th>
              <th>Status</th>
            </tr>
          </thead>
        <tbody>

        {sliced.map((card, indexM) => {
          
          const creator = users.find(user => user._id === card.userId);
          
          return(
                  <tr 
                    key={card._id} 
                    onClick={() => navigate(`/carddetails/${card._id}`)}>
                    <td>{indexM + (currentPage - 1) * pageSize + 1}</td>
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
                        setConfirmCard(card)
                        }}>
                      Delete Post
                    </button>
                    </td>
                    <td>
                      {creator?._id !== user._id ? (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleBanCard(card._id);
                        }}>{card.isBanned ? "Unban Post" : "Ban Post"}</button>
                      ):(
                        <p>You Admin</p>
                      )}
                    </td>
                    <td>{card.isBanned ? "Banned" : "Not Banned"}</td>
                  </tr>  
              )})}
              </tbody>
            </table>
        </div>
              {
                confirmCard && (
                  <ConfirmationDialog
                      message={`Delete card: ${confirmCard.title}?`}
                      onClose={() => setConfirmCard(null)}
                      onConfirm={async () => {
                          await handleDeleteCard(confirmCard._id);
                          await getUsers();
                          await fetchCards();
                          await refreshFeed();
                          setConfirmCard(null);
                      }}
                  />
                )
              }
    </div>
    <div style={{display: 'flex', width: '100%'}}>
      <button 
        disabled = {currentPage === 1}
        style={{margin: '4px', padding: '8px 20px'}}
        onClick={() => setCurrentPage(currentPage - 1)}
      >◀ Previous</button>
      {pagesNumbers.map((page, index) => (
        <div key={page}>
            <button 
              style={{margin: '4px', padding: '8px 10px'}} 
              disabled = {currentPage === page}
              onClick={() => setCurrentPage(page)}
            >{page}</button>
        </div>
      ))}
      <button 
        disabled = {currentPage === totalPages}
        style={{margin: '4px', padding: '8px 20px'}}
        onClick={() => setCurrentPage(currentPage + 1)}
      >Next ▶</button>

    <select 
      style={{margin: '4px', padding: '8px 20px'}}
      onChange={(e) => {
        setPageSize(Number(e.target.value))
        setCurrentPage(1)
      }}  
    >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <p>{start} - {endPage} of {total}</p>
    </div>

  </div>
  )
}
