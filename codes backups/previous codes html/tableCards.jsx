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
                      <MediaDisplay
                        mediaUrl={card.mediaUrl}
                        mediaType={card.mediaType}
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
                    <td>{getTimeAgo(card.createdAt)}</td>
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
