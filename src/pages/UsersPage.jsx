import React, { useMemo, useState } from 'react'
import useDebounce from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import useUsers from '../hooks/useUsers';
import useSelectedUsers from '../hooks/useSelectedUsers';
import { Box, Checkbox, Container, Grid, Paper, Typography } from '@mui/material';
import UsersPageSorts from '../components/UsersPageSorts';


function UsersPage() {

    const {users, loading} = useUsers();
    const {selectedUsers ,selectHandleUser} = useSelectedUsers();
    const [count, setCount] = useState(10);
    const [search, setSearch] = useState('')
    const debounceSearch = useDebounce(search, 2000);
    
    // sorts
    const [ageSort, setAgeSort] = useState('');
    const [nameSort, setNameSort] = useState('');

    // filters
    const [genderFilter, setGenderFilter] = useState('');
    const [CountriesFilter, setCountriesFilter] = useState([]);
    
    const navigateToUser = useNavigate();

    const SORT_AGE = [
        {label: 'All', value: ''},
        {label: 'Youngest', value: 'youngest'},
        {label: 'Oldest', value: 'oldest'}
    ]
    
    const SORT_NAME_AZ = [
        {label: 'All', value: ''},
        {label: 'A → Z', value: 'az'},
        {label: 'Z → A', value: 'za'}
    ]
    
    const SORT_GENDER = [
        {label: 'All', value: ''},
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}
    ]

    const countries = [...new Set(users.map(user => user.address?.country.toLowerCase()))]
    // remove doplicates from array, and we get new array by name countries that without duplicates

    const handleCountryToggle = (country) => {
        setCountriesFilter((prev) => {
            const include = prev.includes(country)
            if(!include){
                return [...prev, country]
            }
            return prev.filter(c => c !== country)
        })
    }
    
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
        //     result = result.filter(user => user?.address?.country.toLowerCase() === countryFilter.toLowerCase())
        // }

        // sorts:
        result.sort((a,b) => {
            let comparison = 0;

            // age sort:
            if(ageSort === 'youngest'){
                comparison = a.age - b.age;
            } else if(ageSort === 'oldest'){
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
    
    if(loading){
        return <p>Loading...</p>
    }

    return(
        <Container maxWidth='lg' sx={{py:3}}>
            <Grid container spacing={3}>

                {/* Side Bar */}
                <Grid 
                    size={{md: 4}}
                    sx={{
                        position: 'sticky',
                        top: 64,
                        overflow: 'auto',
                        maxHeight: 'calc(100vh - 64px)',
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: 2,
                        
                        // hide scrollbar visually but keep it functional
                        '&::-webkit-scrollbar': {display: 'none'}
                    }}
                >   
                    {/* Sort Age*/}
                    <UsersPageSorts
                        title = 'Sort by age'
                        options = {SORT_AGE}
                        selectedValue = {ageSort}
                        onSelect = {setAgeSort}
                    />
                    
                    {/* Sort */}
                    <UsersPageSorts
                        title = 'Sort by A-Z'
                        options = {SORT_NAME_AZ}
                        selectedValue = {nameSort}
                        onSelect = {setNameSort}
                    />
                    
                    {/* Sort */}
                    <UsersPageSorts
                        title = 'Sort by A-Z'
                        options = {SORT_GENDER}
                        selectedValue = {genderFilter}
                        onSelect = {setGenderFilter}
                    />

                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: '0.5px solid',
                            borderColor: 'divider',
                            p: 2,
                        }}
                    >
                        {countries.slice(0, 10).map((countryC, index) => {
                            const countedUsersByCountry = users.filter(u => u.address.country === countryC).length

                            return(
                                <Box 
                                    key={countryC} 
                                    onClick ={() => handleCountryToggle(countryC)}
                                    sx={{
                                        display: 'flex', 
                                        alignItems: 'center',
                                        borderRadius: 2,
                                        bgcolor: CountriesFilter.includes(countryC) ? 'action.selected' : 'transparent',
                                        cursor: 'pointer',
                                        pr: 1,
                                        my: 1,
                                        opacity: countedUsersByCountry === 0 ? 0.4 : 1,
                                        pointerEvents: countedUsersByCountry === 0 ? 'none' : 'auto'
                                    }}
                                
                                >
                                    <Checkbox
                                        size='small'
                                        checked={CountriesFilter.includes(countryC)}
                                        disabled={countedUsersByCountry < 1}
                                        />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            flex: 1,
                                        }}
                                    >
                                        <Typography
                                            fontSize={14} 
                                            color='text.secondary'
                                        >
                                            {countryC}
                                        </Typography>
    
                                        <Typography fontWeight={700} fontSize={13} color='text.disabled'>
                                            {countedUsersByCountry}
                                        </Typography>
                                    </Box>
                            </Box>
                            )
                        })}
                    </Paper>
                    
                </Grid>
                
                

                <Grid size={{md:8}}>
                    
                </Grid>

            </Grid>
        </Container>
    )
}

export default React.memo(UsersPage)
