import React, { useState } from 'react'

export default function CardsComments({card, allUsers, addComment, removeComment}) {

    const [commentText, setCommentText] = useState('');


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
                        <p>{user.name}</p>
                        <p>{comment.commentText}</p>
                        <button onClick={() => removeComment(card.cardId, comment.commentId)}>X</button>
                    </div>
                )
            })
        }

    </div>
  )
}
