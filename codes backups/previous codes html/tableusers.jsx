{/* <Box
sx={{
display: 'flex',
gap: 2,
flexWrap: 'wrap',
alignItems: 'center',
mb: 3,
p: 2,
border: '1px solid',
borderColor: 'divider',
borderRadius: 3,
bgcolor: 'background.paper'
}}
>
<div>
    <input 
        type="text" 
        value={search}
        onChange={(e) => {
        setSearch(e.target.value)
        setCurrentPage(1)
        }}
    />
    </div>
    <select 
    disabled={nameSort}
    style={{
        backgroundColor: ageSort ? 'lightblue' : 'white', 
        border: 'none', 
        marginRight: '8px',
        padding: '8px',
    }}
    value={ageSort} 
    onChange={(e) => {
        setAgeSort(e.target.value)
        setCurrentPage(1)  
    }}>
        <option value="">All Ages</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
    </select>
    
    <select
    disabled={ageSort}
    style={{
        backgroundColor: nameSort ? 'lightblue' : 'white', 
        border: 'none', 
        marginRight: '8px',
        padding: '8px',
    }}
    value={nameSort} 
    onChange={(e) => {
        setNameSort(e.target.value)
        setCurrentPage(1)  
    }}>
        <option value="">A-Z Default</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
    </select>

    <select
    style={{
        backgroundColor: genderFilter ? 'lightblue' : 'white', 
        border: 'none', 
        marginRight: '8px',
        padding: '8px',
    }}
    value={genderFilter} 
    onChange={(e) => {
        setGenderFilter(e.target.value)
        setCurrentPage(1)  
    }}>
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>

    <select
    style={{
        backgroundColor: roleFilter ? 'lightblue' : 'white', 
        border: 'none', 
        marginRight: '8px',
        padding: '8px',
    }}
    value={roleFilter} 
    onChange={(e) => {
        setRoleFilter(e.target.value)
        setCurrentPage(1)  
    }}>
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
    </select>

    <select
    style={{
        backgroundColor: countryFilter ? 'lightblue' : 'white', 
        border: 'none', 
        marginRight: '8px',
        padding: '8px',
    }}
    value={countryFilter} 
    onChange={(e) => {
        setCountryFilter(e.target.value)
        setCurrentPage(1)  
    }}>
        <option value="">All countries</option>
        {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
        ))}
    </select>
</Box> */}


{/*       <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>#Count</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Logged In</th>
                <th>country</th>
                <th onClick={() => handleSortTable('joined')} 
                    style={{cursor: 'pointer'}}
                    >
                    Joined
                  {sortConfig.column === 'joined' ? 
                  (sortConfig.direction === 'asc' ? '▲': '▼')
                  : ' ↕'}
                </th>
                <th 
                  onClick={() => handleSortTable('posts')} 
                  style={{cursor: 'pointer'}}
                >
                  Posts
                  {sortConfig.column === 'posts' ? 
                  (sortConfig.direction === 'asc' ? '▲' : '▼')
                  : ' ↕'
                }
                </th>
                <th 
                  onClick={() => handleSortTable('followers')}
                  style={{cursor: 'pointer'}}
                >
                  Followers
                  {sortConfig.column === 'followers' ? 
                    (sortConfig.direction === 'asc' ? '▲' : '▼')
                    : ' ↕'
                  }
                  </th>
                <th>Role</th>
                <th>Status</th>
                <th>Remove</th>
                <th>Ban</th>
                <th>Promote</th>
              </tr>
            </thead>
          <tbody>

          {sliced.map((userM, indexM) => {
            const userCardsCount = registeredCards.filter((card) => {
              return card.userId === userM._id
            }).length;
      
            const userFollowersCount = users.filter((userF) => {
              return userF.following.includes(userM._id)
            }).length;

            if(!apiCountriesList) return;
            const userFlag = apiCountriesList.find(f => f.name === userM.address?.country);

            return(
                    <tr 
                      key={userM._id} 
                      onClick={() => navigate(`/profiledashboard/${userM._id}/profilemain`)}>
                      <td>{indexM + (currentPage - 1) * pageSize + 1}</td>
                      <td>
                        <img src={userM.profilePicture} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px, solid, white',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}/>
                      </td>
                      <td>{userM.name} {userM.lastName}</td>
                      <td>{userM.email}</td>
                      <td>{userM.lastLoginAt.split("T")[0]}</td>
                      <td>
                        <img 
                        style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            border: '2px, solid, white',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                        src={userFlag?.flag || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
                        onError={(e) => {
                          e.target.src = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        }}
                      /></td>
                      <td>{userM.createdAt.split("T")[0]}</td>
                      <td>{userCardsCount}</td>
                      <td>{userFollowersCount}</td>
                      <td>{userM.isAdmin ? "Admin" : "User"}</td>
                      <td>{userM.isBanned ? "Banned" : "Not Banned"}</td>
                      <td>
                        {userM._id !== user._id ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmUser(userM)
                              }}>
                            Delete User
                          </button>
                        ):(
                          <p>You Admin</p>
                        )}
                      </td>
                      <td>
                        {userM._id !== user._id ? (
                          <button onClick={(e) => {
                            e.stopPropagation();
                            handleBanUser(userM._id);
                          }}>{userM.isBanned ? "Unban User" : "Ban User"}</button>
                        ):(
                          <p>You Admin</p>
                        )}
                      </td>
                      <td>
                        {userM._id !== user._id ? (
                          <button onClick={(e) => {
                            e.stopPropagation();
                            handlePromoteUser(userM._id);
                          }}>{userM.isAdmin ? "Unpromote" : "Promote User"}</button>
                        ):(
                          <p>You Admin</p>
                        )}
                      </td>
                    </tr>  
                )})}
                </tbody>
              </table>
          </div>
      </div>
 */}
/* 
    <div>
      <button 
        disabled = {currentPage === 1}
        style={{margin: '4px', padding: '8px 20px'}}
        onClick={() => setCurrentPage(currentPage - 1)}
      >◀ Previous</button>
      {pagesNumbers.map((page) => (
        <button 
          style={{margin: '4px', padding: '8px 10px'}}
          key={page}
          onClick={() => setCurrentPage(page)}
          disabled = {currentPage === page}
        >
          {page}
        </button>
      ))}
      <button 
        disabled = {currentPage === totalPages}
        style={{margin: '4px', padding: '8px 20px'}}
        onClick={() => setCurrentPage(currentPage + 1)}
      >Next ▶</button>

      <select
        style={{margin: '4px', padding: '8px 20px'}}
        onChange={
          (e) => {
            setPageSize(Number(e.target.value))
            setCurrentPage(1)
          }
        }
        >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
        
      <p>{startPage} - {endPage} of {total} results</p>
    </div> */

