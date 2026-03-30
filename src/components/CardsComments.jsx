import React, { useRef, useState } from 'react'
import { useAuth } from '../providers/AuthProvider';
import { Avatar, Box, Button, TextField } from '@mui/material';

export default function CardsComments({card, users, addComment, removeComment}) {

    const [commentText, setCommentText] = useState('');
    const {user: loggedInUser} = useAuth();
    const [commentsCount, setCommentsCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false)
    
    const inputRef = useRef(null);
    
    const handleSubmit = (e) => {
        setIsLoading(false)
        e.preventDefault();
        addComment(commentText, card._id)
        setCommentText('');
        setIsLoading(true)
    }

    const countedComments = (card?.comments || []).slice(0, commentsCount)

  return (
    <Box>
        {loggedInUser && (
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', mb: 2}}>
                <Avatar
                    src={loggedInUser.profilePicture}
                    sx={{width: 36, height: 36}}
                />

                <TextField
                    fullWidth
                    size='small'
                    placeholder='Write your opinion..'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    sx={{
                        '& .MuiOutlinedInput-root':{
                            borderRadius: 5,
                            fontSize: 13
                        }
                    }}
                />   

                <Button
                    type='submit'
                    variant='contained'
                    loading={isLoading}
                    loadingPosition='start'
                    disabled={!commentText.trim()}
                    sx={{ml: 'auto', borderRadius: 5, minWidth: 90}}
                    onClick={handleSubmit}
                    color='primary'
                >
                    {isLoading ? "Sending..." : "Send"}
                </Button>

                
            </Box>   
        )}

    </Box>
  )
}
