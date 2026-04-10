import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useDebounce from '../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import useUsers from '../hooks/useUsers';
import useSelectedUsers from '../hooks/useSelectedUsers';
import OnLoadingSkeletonBox from '../src/components/OnLoadingSkeletonBox';


function UsersPage({value}) {

    const debounceSearch = useDebounce(value, 2000);
    const {users, loading} = useUsers();
    const {selectedUsers ,selectHandleUser} = useSelectedUsers();
    const [count, setCount] = useState(10);

    // sorts
    const [ageSort, setAgeSort] = useState('');
    const [nameSort, setNameSort] = useState('');

    // filters
    const [genderFilter, setGenderFilter] = useState('');
    // const [countryFilter, setCountryFilter] = useState('');
    
    const navigateToUser = useNavigate();

    // const countries = [...new Set(users.map(user => user.address.country.toLowerCase()))]
    // remove doplicates from array, and we get new array by name countries that without duplicates
    
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
        // if(countryFilter !== ''){
        //     result = result.filter(user => user.address?.country?.toLowerCase() === countryFilter.toLowerCase())
        // }

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

            return comparison;
        });

        return result;
    }, [debounceSearch, users, ageSort, nameSort, genderFilter])
    
    const visibleUsers = filtred.slice(0, count)
    
    if(loading) return <OnLoadingSkeletonBox/>

  return (
    <div>
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

{/*             <select
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
            </select> */}
        <br />
        <br />
        {visibleUsers.map((user) => (
            <div key={user._id}>
                <img style={{borderRadius: '50%', width: '15%'}} src={user.profilePicture}/>
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

                <button onClick={() => navigateToUser(`/userprofile/${user._id}`)}>To The User</button>
                <hr />
            </div>
        ))}

        {count < filtred.length ? (<button onClick={() => setCount(count + 10)}>Load More</button>) : (<p>No More Users Found</p>)}
    </div>
  )
}

export default React.memo(UsersPage)
