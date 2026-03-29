import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import { useCardsProvider } from '../providers/CardsProvider';
import EmojiPicker from 'emoji-picker-react';
import MediaDisplay from './MediaDisplay';
import { Alert, Avatar, Box, Button, IconButton, Input, InputAdornment, MenuItem, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';
import MovieIcon from '@mui/icons-material/Movie';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddLinkIcon from '@mui/icons-material/AddLink';
import TitleIcon from '@mui/icons-material/Title';
import { useNavigate } from 'react-router-dom';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CategoryIcon from '@mui/icons-material/Category';

export default function CreateCardForm({onSuccess, mediaButton}) {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [category, setCategory] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {handleCardRegister} = useCardsProvider();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [isLinkFieldShown, setIsLinkFieldShown] = useState(false);
    const [isTitleOn, setIsTitleOn] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(mediaButton){
            fileInputRef.current.accept = mediaButton === 'image' ? 'image/*' : 'video/*';
            fileInputRef.current.click();
        }
    }, [])

    const theme = useTheme();

    const onEmojiClick = (emojiData) => {
        setText(prev => prev + emojiData.emoji);
        setIsEmojiOpen(false);
    }

    const noUnderlineSx = {
        '& .MuiInput-underline:before': { borderBottom: 'none' },
        '& .MuiInput-underline:after': { borderBottom: 'none' },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
    }

    const previewMediaFile = useMemo(() => {
        return mediaFile ? URL.createObjectURL(mediaFile) : null
    }, [mediaFile])

    const handleSubmitNewCard = async (e) => {
        e.preventDefault();

        setError('');
        setSuccessMessage('');
        
        if(text.trim() === ''){
            setError('Text is required')
            return;
        }
        
        if(!mediaFile){
            setError('You must choose media')
            return;
        }
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', text);
        formData.append('category', category);
        formData.append('web', webUrl);
        formData.append('media', mediaFile);
        
        try{
            setIsLoading(true); // start is loading
            const result = await handleCardRegister(formData)
            if(!result.success){
                setError(result.message)// show error to user
                return;
            }
            
            setText('');
            setTitle('');
            setMediaFile(null);
            fileInputRef.current.value = '';
            setCategory('');
            setWebUrl('');
            setSuccessMessage('Your card created successfully')
            setIsLinkFieldShown(false)
            
            // then hand control back to parent
            onSuccess();
        }
        finally{
            setIsLoading(false);
        }
  
    }

return (
    <Box 
        component="form" 
        onSubmit={handleSubmitNewCard}
        sx={{
            bgcolor: 'background.paper',
            '& input:-webkit-autofill': {
                // theme.palette.background.paper
                // reads the actual color value from the theme, switches automatically between dark/light
                // theme.palette.text.primary: same for text color
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                WebkitTextFillColor: theme.palette.text.primary,
                transition: 'background-color 5000s ease-in-out 0s'
            }
        }}
    >
        {/* // Top: Avatar + User Info */}
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 2
        }}>
            <Avatar 
                onClick={() => navigate(`/profiledashboard/${user?._id}/profilemain`)} 
                src={user?.profilePicture}
                sx={{cursor: 'pointer'}}
            />
            <Box>
                <Typography fontWeight={600} fontSize={14}>
                    {user?.name} {user?.lastName}
                </Typography>
                <Typography fontSize={12} color='text.secondary'>
                    Post to Anyone
                </Typography>
            </Box>

        </Box>

        {/* Title Field - toggle */}
        {isTitleOn && (
            <TextField
                fullWidth
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant='standard'
                sx={{
                    mb: 1,
                    '& .MuiInput-input::placeholder': {
                        fontSize: 20,
                        color: 'text.secondary'
                    },
                    '& .MuiInput-input': {
                        fontSize: 20,
                        color: 'text.secondary'
                    },
                    ...noUnderlineSx
                }}
    
                slotProps={{
                   input: {
                       startAdornment:(
                           <InputAdornment position='start'>
                               <TitleIcon fontSize='large'/>
                           </InputAdornment>
                       )
                   }
               }}   
            />
        )}

        {/* text area */}
        <TextField 
            fullWidth
            multiline
            rows={6}
            placeholder='What on your mind?'
            value={text}
            onChange={(e) => {
                setText(e.target.value)
                setError('')
            }}
            variant='standard'
            sx={{
                p: 1,
                '& .MuiInput-input::placeholder': {
                    fontSize: 15,
                    color: 'text.secondary'
                },
                '& .MuiInput-input': {
                    fontSize: 15,
                    color: 'text.secondary'
                },
                color: 'text.secondary',
                '& .MuiInput-underline:before' : {borderBottom: 'none'},
                '& .MuiInput-underline:after' : {borderBottom: 'none'},
                '& .MuiInput-underline:hover:before' : {borderBottom: 'none'},
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
            }}
        />

        {/* URL */}
        {isLinkFieldShown && (
                <Box>
                    <TextField 
                        fullWidth
                        size='small'
                        type="url"
                        value={webUrl}
                        onChange={(e) => {
                            setWebUrl(e.target.value);
                            setError('');
                        }}
                        placeholder='Add a URL...'
                        variant='standard'
                        sx={{
                            mt: 1,
                            mb: 1,                            
                            '& .MuiInput-input::placeholder': {
                                fontSize: 14,
                                color: 'text.secondary'
                            },
                            '& .MuiInput-input': {
                                fontSize: 14,
                                color: 'text.secondary'
                            },
                            ...noUnderlineSx,
                        }}

                        slotProps={{
                            input: {
                                startAdornment:(
                                    <InputAdornment position='start'>
                                        <AddLinkIcon fontSize='small'/>
                                    </InputAdornment>
                                )
                            }
                        }}      
                    />
                </Box>
        )}

        {/* Category */}
        {isCategoryOpen && (
            <Box>
                <TextField
                    fullWidth
                    select
                    size='small'
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setError('');
                    }}
                    variant='standard'
                    sx={{
                        mt: 1,
                        mb: 1,                            
                        '& .MuiInput-input::placeholder': {
                            fontSize: 14,
                            color: 'text.secondary'
                        },
                        '& .MuiInput-input': {
                            fontSize: 14,
                            color: 'text.secondary'
                        },
                        ...noUnderlineSx,
                    }}

                    slotProps={{
                        select: {
                            startAdornment:(
                            <InputAdornment position='start'>
                                <CategoryIcon fontSize='small'/>
                            </InputAdornment>
                            ),
                            displayEmpty: true,
                            renderValue: (value) => value || 'Select a category..'
                        }
                    }} 
                >
                    <MenuItem value='' disabled>No Category</MenuItem>
                    {CARD_CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    )
                    )}  
                </TextField>
            </Box>
        )}

        {/* media preview */}   
        {previewMediaFile && (
            <Box sx={{position: 'relative', mt: 1, mb:1}}>
                
                {/* Floating Buttons over image */}
                <Box 
                    sx={{
                        display: 'flex', 
                        gap: 0.5,
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1000
                    }}>
                    <Tooltip title = "Remove Media">
                        <IconButton 
                            onClick={() => {
                                setMediaFile(null);
                                fileInputRef.current.value = '';
                                setError('');
                            }}
                            sx={{
                                color: 'white',
                                bgcolor: 'rgba(0,0,0,0.4)',
                                borderRadius: 3,
                                p: 0.5
                            }}
                        >
                                <CloseIcon/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title = "Edit">
                        <IconButton 
                            onClick={() => {
                                fileInputRef.current.click()
                                setError('')
                            }}
                            sx={{
                                color: 'white',
                                bgcolor: 'rgba(0,0,0,0.4)',
                                borderRadius: 3,
                                p: 0.5
                            }}
                        >
                                <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>

                <MediaDisplay
                    mediaUrl={previewMediaFile}
                    mediaType={mediaFile.type.startsWith('video/') ? 'video' : 'image'}
                    style={{width: '100%', borderRadius: '10px'}}
                />
            </Box>
        )}

        {/* Error */}
        {error && (
        <Alert severity='error' sx={{mb: 2}}>
            {error}
        </Alert>
        )}

        {/* toolbar */}
        <Box sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 2,
        }}>

            <input 
                ref={fileInputRef}
                type="file"
                accept = {'image/*,video/*'} 
                onChange={(e) => setMediaFile(e.target.files[0])}
                style={{display: 'none'}}
            />

            {!previewMediaFile && (
                <Tooltip title = "Add Photo/Video">
                    <IconButton onClick={() => {
                            fileInputRef.current.accept = 'image/*,video/*';
                            fileInputRef.current.click()
                            setError('')
                        }} sx={{ display:'flex', gap: 1, borderRadius: 5}}>
                        <InsertPhotoIcon/>
                        <Typography sx={{
                            borderRight: '0.5px solid',
                            borderColor: 'text.secondary', 
                            height: '20px',
                            }}/>
                        <MovieIcon/>
                    </IconButton>
                </Tooltip>
            )}

            <Tooltip title = "Emoji">
                <IconButton onClick={() => setIsEmojiOpen(!isEmojiOpen)}>
                    <EmojiEmotionsIcon/>
                </IconButton>
            </Tooltip>

            {isEmojiOpen && 
                <Box style={{position: 'fixed',  bottom: '80px', left: '50%',zIndex: 1050, transform: 'translateX(-50)'}}>
                    <EmojiPicker  
                        onEmojiClick={onEmojiClick}
                    />
                </Box>
            }

            <Tooltip title = "Add Link">
                <IconButton onClick={() => {
                        setIsLinkFieldShown(!isLinkFieldShown)
                        isLinkFieldShown && setWebUrl('')
                        setError('')
                    }}>
                    <AddLinkIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title = "Add Category">
                <IconButton onClick={() => {
                        setIsCategoryOpen(!isCategoryOpen)
                        isCategoryOpen && setCategory('')
                        setError('')
                    }}>
                    <CategoryIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title = "Add Title">
                <IconButton onClick={() => {
                        setIsTitleOn(!isTitleOn)
                        isTitleOn && setTitle('')
                    }}>
                    <TitleIcon/>
                </IconButton>
            </Tooltip>


            <Button
                type='submit'
                variant='contained'
                loading={isLoading}
                loadingPosition='start'
                // startIcon={<AutorenewIcon/>}
                disabled={!text || !mediaFile}
                sx={{ml: 'auto', borderRadius: 5, minWidth: 90}}
            >
                {isLoading ? "Posting..." : "Post"}
            </Button>

        </Box>

    </Box>
  )
}
