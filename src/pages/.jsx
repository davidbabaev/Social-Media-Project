  return (
    <div>
        <div>
        <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                onChange={(e) => setAgeSort(e.target.value)}>
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
                onChange={(e) => setNameSort(e.target.value)}>
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
                onChange={(e) => setGenderFilter(e.target.value)}>
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
            </select>

            <select
                style={{
                    backgroundColor: countryFilter ? 'lightblue' : 'white', 
                    border: 'none', 
                    marginRight: '8px',
                    padding: '8px',
                }}
                value={countryFilter} 
                onChange={(e) => setCountryFilter(e.target.value)}>
                    <option value="">All countries</option>
                    {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
            </select>
        <br />
        <br />
        {visibleUsers.map((user) => (
            <div key={user._id}>
                <img style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    border: '2px, solid, white',
                    objectFit: 'cover',
                    cursor: 'pointer'
                }} src={user.profilePicture}/>
                <h3>{user.name} {user.lastName}</h3>
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>
                <p>Country: {user.address.country}</p>
                <p>Gender: {user.gender}</p>

                {selectedUsers.some(selUser => selUser._id === user._id) ? (
                    <button onClick={() => selectHandleUser(user)}>Deselecte User</button>
                ): (
                    <button onClick={() => selectHandleUser(user)}>Select User</button>
                )}

                <button onClick={() => navigateToUser(`/profiledashboard/${user._id}/profilemain`)}>To The User</button>
                <hr />
            </div>
        ))}

        {count < filtred.length ? (<button onClick={() => setCount(count + 10)}>Load More</button>) : (<p>No More Users Found</p>)}
    </div>
  )