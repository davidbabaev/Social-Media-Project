import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProvider';

export default function CardsComments({card, allUsers, addComment, removeComment}) {

    const [commentText, setCommentText] = useState('');
    const {user: loggedInUser} = useAuth();


    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(commentText, card.cardId)
        setCommentText('');
    }

  return (
    <div>
        <hr />
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Write your comment...'
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
            />
            <button type='submit'>Send</button>
        </form>

        {
            (card?.comments || []).map((comment) => {
                const user = allUsers.find(u => u.userId === comment.userId);
                return(
                    <div key= {comment.commentId}>
                        <hr />
                        <p>{user?.name || "Unknown User"}</p>
                        <p>{comment.commentText}</p>
                        { loggedInUser && 
                        (loggedInUser.userId === comment.userId || 
                            loggedInUser.userId === card.userId
                        ) && (
                            <button onClick={() => removeComment(card.cardId, comment.commentId)}>X</button>
                        )}
                    </div>
                )
            })
        }

    </div>
  )
}
