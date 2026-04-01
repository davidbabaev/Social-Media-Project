import React, { useMemo, useState } from 'react'
import { useCardsProvider } from '../providers/CardsProvider'
import useUsers from '../hooks/useUsers';

import useDebounce from '../hooks/useDebounce';
import useFavoriteCards from '../hooks/useFavoriteCards';
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import useLikedCards from '../hooks/useLikedCards';
import LoginPopup from '../components/LoginPopup';
import CardsComments from '../components/CardsComments';
import useCommentsCards from '../hooks/useCommentsCards';
import getTimeAgo from '../utils/getTimeAgo';
import MediaDisplay from '../components/MediaDisplay';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import CardItem from '../components/CardItem';

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

    const [openCommentCardId, setOpenCommentCardId] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);
    

    const [isOpen, setIsOpen] = useState(false);
    function onClose(){
        setIsOpen(false)
    }

    const [isCommentOpen, setIsCommentOpen] = useState(null);

    const {addComment, countComments, removeComment} = useCommentsCards();

    const navigate = useNavigate();
    
    const {registeredCards} = useCardsProvider();
    const {toggleLike, isLikeByMe, getLikeCount} = useLikedCards()
    const {user} = useAuth();
    const [count, setCount] = useState(2);
    const {users} = useUsers(); 
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
    <Container maxWidth="lg" sx={{py:3}}>
        <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid 
                size={{md:4}} 
                sx={{
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 2
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
                        Show
                    </Typography>
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

                <Box sx={{display: 'flex', justifyContent: 'space-between', p:1}}>
                    <Typography color='text.secondary'>
                        47 posts found
                    </Typography>

                    <Typography color='text.secondary'>
                        Newest | Design | David Babaev
                    </Typography>
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

            </Grid>
        </Grid>
    </Container>
  )
}