import React, { useMemo, useState } from 'react'
import { useCardsProvider } from '../providers/CardsProvider'
import useUsers from '../hooks/useUsers';

import useDebounce from '../hooks/useDebounce';
import useFavoriteCards from '../hooks/useFavoriteCards';
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, Checkbox, Chip, Container, Divider, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import CardItem from '../components/CardItem';
import CardPopupModal from '../components/card/CardPopupModal';
import CheckBoxIcon from '@mui/icons-material/CheckBox';




export default function AllCardsPage() {

    // control filter cards by creator
    const [creatorId, setCreatorId] = useState('')
    
    // search cards by title/ text
    const [searchCard, setSearchCard] = useState('')
    
    const debounceSearchCard = useDebounce(searchCard, 2000);
    
    // sort cards (newest/ oldest)
    const [dateSort, setDateSort] = useState('');
    
    // favorite/ like cards
    const [favorites, setFavorites] = useState('')
    
    // card categories/ tags
    const [categoriesFilter, setCategoriesFilter] = useState([]);
    
    const [openCommentCardId, setOpenCommentCardId] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);
    

    // controls the search input for users
    const [creatorSearch, setCreatorSearch] = useState('')

    const navigate = useNavigate();
    
    const {registeredCards} = useCardsProvider();
    const [count, setCount] = useState(30);
    const {users} = useUsers(); 
    const {favoriteCards ,handleFavoriteCards} = useFavoriteCards();

    const [showAllCategories, setShowAllCategories] = useState(false)

    
    const handleCategoryToggle = (category) => {
        setCategoriesFilter((prev) => {
            const include = prev.includes(category)
            if(!include){
                return [...prev, category]
            }

            return prev.filter(cat => cat !== category)
        })
    }

    const SORT_OPTIONS = [
        {label: 'Default', value: ''},
        {label: 'Newest', value: 'newest'},
        {label: 'Oldest', value: 'oldest'},
        {label: 'Most Liked', value: 'most liked'},
        {label: 'Most Commented', value: 'most commented'},
    ]

    const filterCreators = users.filter((user) => (user.name + ' ' + user.lastName).toLowerCase().includes(creatorSearch.toLowerCase()))

    const handleClearAllFilters = () => {
        setCreatorId('');
        setSearchCard('');
        setDateSort('');
        setFavorites('');
        setCategoriesFilter([]);
        setCreatorSearch('');
    }

    const activeFilters = [];

    if(dateSort !== ''){
        activeFilters.push({
            label: dateSort,
            onDelete: () => setDateSort('')
        })
    }

    if(creatorId !== ''){
        const creatorUser = users.find(u => u._id === creatorId)
        activeFilters.push({
            label: creatorUser?.name + ' ' + creatorUser?.lastName,
            onDelete: () => setCreatorId('')
        })
    }

    if(categoriesFilter.length > 0){
        categoriesFilter.forEach(category => {
            activeFilters.push({
                label: category,
                onDelete: () => handleCategoryToggle(category)
            })
        })
    }

    if(favorites !== ''){
        activeFilters.push({
            label: 'Saved Posts',
            onDelete: () => setFavorites('') 
        })
    }

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
            else if(dateSort === 'most liked'){
                result.sort((a,b) => b.likes.length - a.likes.length)
            }
            else if(dateSort === 'most commented'){
                result.sort((a,b) => b.comments.length - a.comments.length)
            }
        }

        if(categoriesFilter.length > 0){
            result = result.filter(card => categoriesFilter.includes(card.category))
        }



        return result;
    }, [creatorId, registeredCards, debounceSearchCard, dateSort, categoriesFilter, favorites, favoriteCards])
    
    const countedRegisterCards = filteredCards.slice(0, count)    

  return (
    <Container maxWidth="lg" sx={{py:3}}>
        <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid 
                size={{md:4}} 
                sx={{
                    position: 'sticky',
                    top: 0,
                    height: 'calc(100vh - 94px)',
                    overflow: 'auto',
                    overscrollBehavior: 'contain',
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 2,
                    // py: 3,
                    // px: 1,
                    
                    // hide scrollbar visually but keep it functional
                    '&::-webkit-scrollbar': {display: 'none'}
                }}>

                {/* Sort */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '0.5px solid',
                        borderColor: 'divider',
                        p: 2,
                    }}
                >
                    <Typography fontWeight={600} fontSize={13} mb={1.5}>
                        Sort By
                    </Typography>


                    {SORT_OPTIONS.map((sort) => (
                        <Box
                            key={sort.value}
                            onClick={() => setDateSort(sort.value)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                borderRadius: 2,
                                px: 1,
                                py: 0.5,
                                my: 1,
                                bgcolor: dateSort === sort.value ? 'action.selected' : 'transparent',
                                '&:hover': {bgcolor: 'action.hover'}
                            }}
                        >

                            {dateSort === sort.value && <CheckBoxIcon sx={{fontSize: 19}}/>}

                            <Typography fontSize={13} color='text.secondary'>
                                {sort.label}
                            </Typography>
                        </Box>
                        
                    ))}
                </Paper>

                {/* Category */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '0.5px solid',
                        borderColor: 'divider',
                        p: 2,
                    }}
                >
                    <Typography fontWeight={600} fontSize={13} mb={1.5}>
                        Category
                    </Typography>


                    {CARD_CATEGORIES.slice(0, showAllCategories ? CARD_CATEGORIES.length : 7).map((category, index) => {

                        const countedPostsByCat = registeredCards.filter(card => card.category === category).length

                        return(
                            <Box 
                                key={category} 
                                onClick ={() => handleCategoryToggle(category)}
                                sx={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    bgcolor: categoriesFilter.includes(category) ? 'action.selected' : 'transparent',
                                    cursor: 'pointer',
                                    pr: 1,
                                    my: 1,
                                    opacity: countedPostsByCat === 0 ? 0.4 : 1,
                                    pointerEvents: countedPostsByCat === 0 ? 'none' : 'auto'
                                }}
                            
                            >
                                <Checkbox
                                    size='small'
                                    checked={categoriesFilter.includes(category)}
                                    disabled={countedPostsByCat < 1}
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
                                        {category}
                                    </Typography>

                                    <Typography fontWeight={700} fontSize={13} color='text.disabled'>
                                        {countedPostsByCat}
                                    </Typography>
                                </Box>
                        </Box>
                        )
                    })}
                    <Button 
                        onClick={() => setShowAllCategories(!showAllCategories)}
                    >
                        {showAllCategories ? 'Show less' : 'Show More..'}
                    </Button>
                </Paper>

                {/* Creator */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '0.5px solid',
                        borderColor: 'divider',
                        p: 2,
                    }}
                >
                    <Typography fontWeight={600} fontSize={13} mb={1.5}>
                        Creator
                    </Typography>

                    <TextField
                        fullWidth
                        size='small'
                        placeholder='Search Post..'
                        value={creatorSearch}
                        onChange={(e) => setCreatorSearch(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root':{
                                borderRadius: 5,
                                fontSize: 13,
                                mb:1
                            }
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 12,
                            color: 'text.secondary'
                        }}
                    >
                        {filterCreators.length} Results
                    </Typography>

                    <Box
                        sx={{
                            // top: 20,
                            maxHeight: 300,
                            overflow: 'auto',
                        }}
                    >

                        {filterCreators.map((userF) => (
                            <Box 
                                key={userF._id}
                                onClick={() => setCreatorId(userF._id === creatorId ? '' : userF._id)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    px: 1,
                                    py: 0.5,
                                    my: 0.5,
                                    bgcolor: creatorId === userF._id ? 'action.selected' : 'transparent',
                                    '&:hover': {bgcolor: 'action.hover'}
                                }}
                                >
                                <Avatar 
                                    src={userF.profilePicture}
                                    sx={{width: 34, height: 34}}
                                    />
                                <Box
                                    sx={{display: 'flex', flexDirection: 'column', }}
                                >
                                        <Typography
                                            fontSize={14}
                                        >
                                            {userF.name} {userF.lastName}
                                        </Typography>
                                    <Typography component={'div'} fontSize={11} color='text.secondary' lineHeight={0.9}>
                                        {userF?.job}
                                    </Typography>

                                </Box>

                            </Box>
                        ))}
                    </Box>
                </Paper>

                {/* Saved Posts/ all Posts */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '0.5px solid',
                        borderColor: 'divider',
                        p: 2,
                    }}
                >
                    <Typography fontWeight={600} fontSize={13} mb={1.5}>
                        Show
                    </Typography>

                    <Box
                        onClick={() => setFavorites('')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            my: 1,
                            bgcolor: favorites === '' ? 'action.selected' : 'transparent',
                            '&:hover': {bgcolor: 'action.hover'}
                        }}
                    >

                        {favorites === '' && <CheckBoxIcon sx={{fontSize: 19}}/>}

                        <Typography fontSize={13} color='text.secondary'>
                            All posts
                        </Typography>
                    </Box>

                    <Box
                        onClick={() => setFavorites('myFavorites')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            my: 1,
                            bgcolor: favorites === 'myFavorites' ? 'action.selected' : 'transparent',
                            '&:hover': {bgcolor: 'action.hover'}
                        }}
                    >

                        {favorites === 'myFavorites' && <CheckBoxIcon sx={{fontSize: 19}}/>}

                        <Typography fontSize={13} color='text.secondary'>
                            Favorite posts
                        </Typography>
                    </Box>
                </Paper>

            </Grid>

            <Grid size={{md:8}}>
                {/* main */}
                <TextField
                    fullWidth
                    size='small'
                    placeholder='Search Post..'
                    value={searchCard}
                    onChange={(e) => setSearchCard(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root':{
                            borderRadius: 5,
                            fontSize: 13
                        }
                    }}
                />

                <Box 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        p:1,
                    }}>
                    <Typography 
                        color='text.secondary'
                        fontSize={15}
                    >
                        {filteredCards.length} Results
                    </Typography>

                    <Box sx={{
                        display: 'flex', 
                        gap: 1, 
                        alignItems: 'center', 
                        flexWrap: 'wrap'
                    }}>

                        {activeFilters.map((filter, index) => (
                            <Chip
                                key={index}
                                label={filter.label}
                                size='small'
                                onDelete={filter.onDelete}
                            />
                        ))}

                        {activeFilters.length > 0 && (
                            <Button
                                size='small'
                                onClick={handleClearAllFilters}
                                sx={{p:1, borderRadius: 5, fontSize: 11}}
                                variant='outlined'
                            >
                                Clear All Filters
                            </Button>
                        )}

                    </Box>
                </Box>

                {countedRegisterCards.map((card) => (
                    <CardItem
                        key={card._id}
                        card={card}
                        onOpenCard={() => setSelectedCardId(card._id)}
                        openCommentCardId={openCommentCardId}
                        setOpenCommentCardId = {setOpenCommentCardId}
                    />
                ))}

                {selectedCardId && (
                    <CardPopupModal
                        cardId = {selectedCardId}
                        onClose = {() => setSelectedCardId(null)}
                    />
                )}

            </Grid>
        </Grid>
    </Container>
  )
}