import React, { useState, useMemo } from 'react'
import useUsers from '../../hooks/useUsers'
import { useCardsProvider } from '../../providers/CardsProvider';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';


export default function AdminUsersPanel() {

  const {users, handleDeleteUser, loading} = useUsers();
  const {registeredCards} = useCardsProvider();
  const [count, setCount] = useState(10);
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 2000);
  const {user} = useAuth();

  // sort table
  const [sortConfig, setSortConfig] = useState({column: '', direction: 'asc'});
  
  const handleSortTable = (column) => {
    // first click:
    // reset to asc, new column
    if(column !== sortConfig.column){
      setSortConfig({column: column, direction: 'asc'})
    }
    
    // second click:
    // toggle direction
    if(column === sortConfig.column){
      setSortConfig({column:column ,direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'})
    }
  }
  

  // sorts
  const [ageSort, setAgeSort] = useState('');
  const [nameSort, setNameSort] = useState('');

  // filters
  const [genderFilter, setGenderFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  const navigate = useNavigate();

  const countries = [...new Set(users.map(user => user.address?.country.toLowerCase()))]


  const filtred = useMemo(() => {
  
    let result = users;

    // search by name;
    result = result.filter((user) => {
        return user?.name?.toLowerCase().includes(debounceSearch.toLowerCase())
    });

    // filter: Gender
    if(genderFilter !== ''){
        result = result.filter(user => user.gender === genderFilter)
    }

    // country filter:
    if(countryFilter !== ''){
        result = result.filter(user => user?.address?.country.toLowerCase() === countryFilter.toLowerCase())
    }

    // Role filter:
    if(roleFilter === 'admin'){
        result = result.filter(user => user.isAdmin === true)
    }

    if(roleFilter === 'user'){
        result = result.filter(user => user.isAdmin === false)
    }

    // sorts:
    result.sort((a,b) => {
        let comparison = 0;

        // age sort:
        if(ageSort === 'low'){
            comparison = a.age - b.age;
        } else if(ageSort === 'high'){
            comparison = b.age - a.age;
        }

        // name sort:
        if(comparison === 0){
            if(nameSort === 'az'){
                comparison = a.name.localeCompare(b.name);
            } else if(nameSort === 'za'){
                comparison = b.name.localeCompare(a.name);
            }
        }

        // sort table
        if(sortConfig.column !== ''){
            if(sortConfig.column === 'followers'){
              const aFollowers = users.filter(u => u.following.includes(a._id)).length;
              const bFollowers = users.filter(u => u.following.includes(b._id)).length;
              
              if(sortConfig.direction === 'asc'){
                return aFollowers - bFollowers
              }
              else{
                return bFollowers - aFollowers
              }
            }
            
            if(sortConfig.column === 'joined'){
              if(sortConfig.direction === 'asc'){
                return new Date(a.createdAt) - new Date(b.createdAt)
              }
              else{
                return new Date(b.createdAt) - new Date(a.createdAt)
              }
            }
            
            if(sortConfig.column === 'posts'){
              const aPosts = registeredCards.filter(c => c.userId === a._id).length;
              const bPosts = registeredCards.filter(c => c.userId === b._id).length;
              
              if(sortConfig.direction === 'asc'){
                return aPosts - bPosts
              }
              else{
                return bPosts - aPosts
              }
            }
        }

        return comparison;
    });

    return result;
}, [debounceSearch, users, ageSort, nameSort, genderFilter, countryFilter, roleFilter,sortConfig])


  const visibleUsers = filtred.slice(0, count)
  
  if(loading){
      return <p>Loading...</p>
  }
  
  
  return(
    <div>
      <div style={{border: '1px solid lightgray', margin: '20px 0px', padding: '15px', borderRadius: '10px'}}>
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
                  backgroundColor: roleFilter ? 'lightblue' : 'white', 
                  border: 'none', 
                  marginRight: '8px',
                  padding: '8px',
              }}
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}>
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
              onChange={(e) => setCountryFilter(e.target.value)}>
                  <option value="">All countries</option>
                  {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                  ))}
            </select>
        </div>
        <div>
      </div>

      <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#count</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th onClick={() => handleSortTable('joined')} 
                  style={{cursor: 'pointer'}}
                  >
                Joined
                {sortConfig.column === 'joined' ? 
                (sortConfig.direction === 'asc' ? '▲': '▼')
                : '▼'}
              </th>
              <th 
                onClick={() => handleSortTable('posts')} 
                style={{cursor: 'pointer'}}
              >
                {sortConfig.column === 'posts' ? 
                (sortConfig.direction === 'asc' ? '▲' : '▼')
                : '▼'
              }
                Posts
              </th>
              <th 
                onClick={() => handleSortTable('followers')}
                style={{cursor: 'pointer'}}
              >
                {sortConfig.column === 'followers' ? 
                  (sortConfig.direction === 'asc' ? '▲' : '▼')
                  : '▼'
                }
                  Followers
                </th>
              <th>Role</th>
              <th>Remove</th>
            </tr>
          </thead>
        <tbody>

        {visibleUsers.map((userM, indexM) => {
          const userCardsCount = registeredCards.filter((card) => {
            return card.userId === userM._id
          }).length;
    
          const userFollowersCount = users.filter((userF) => {
            return userF.following.includes(userM._id)
          }).length;
          
          return(
                  <tr 
                    key={userM._id} 
                    onClick={() => navigate(`/profiledashboard/${userM._id}/profilemain`)}>
                    <td>{indexM + 1}</td>
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
                    <td>{userM.createdAt.split("T")[0]}</td>
                    <td>{userCardsCount}</td>
                    <td>{userFollowersCount}</td>
                    <td>{userM.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      {userM._id !== user._id ? (
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(userM._id);
                        }}>Delete User</button>
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
        {count < filtred.length ? (<button onClick={() => setCount(count + 10)}>Load More</button>) : (<p>No More Users Found</p>)}
  </div>
  )
}
