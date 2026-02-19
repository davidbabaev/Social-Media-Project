import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProvider';

export default function CardsComments({card, allUsers, addComment, removeComment}) {

    const [commentText, setCommentText] = useState('');
    const {user: loggedInUser} = useAuth();
    const [commentsCount, setCommentsCount] = useState(5);
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(commentText, card.cardId)
        setCommentText('');
    }

    const countedComments = (card?.comments || []).slice(0, commentsCount)

  return (
    <div>
        <hr />
        { loggedInUser &&
            (<form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Write your comment...'
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                />
                <button type='submit'>Send</button>
            </form>)
        }

        <h4>Comments</h4>

        {countedComments.length === 0 && <p>ther'es no comments yet</p>}

        {
            countedComments.map((comment) => {
                const user = allUsers.find(u => u.userId === comment.userId);

                return(
                    <div key= {comment.commentId}>
                        <p>{user?.name || "Unknown User"}</p>
                        <p>{comment.commentText}</p>
                        { loggedInUser && 
                        (loggedInUser.userId === comment.userId || 
                            loggedInUser.userId === card.userId
                        ) && (
                            <button onClick={() => removeComment(card.cardId, comment.commentId)}>X</button>
                        )}
                        <hr />
                    </div>
                )
            })
        }
        {commentsCount >= card?.comments.length ? (<p>No more Cards</p>): (
            <button onClick={() => setCommentsCount(commentsCount + 5)}>Read More</button>
        )}

    </div>
  )
}
