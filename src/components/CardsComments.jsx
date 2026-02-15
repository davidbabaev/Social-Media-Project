import React, { useState } from 'react'

export default function CardsComments({card, addComment, allUsers}) {

    const [commentText, setCommentText] = useState('')

    const onSubmit = (e) => {
        e.peventDefault();
        if(!commentText.trim()) return;

        addComment(card.cardId, comment)
        setCommentText('')
    }

    const comments = card.comments || [];

  return (
    <div>
        {/* job 1: display existing comments */}
        {comments.map((comment) => {
            const commentUser = allUsers.find((u) => u.userId === comment.userId)

            return(
                <div key={comment.commentId}>
                    <strong>{commentUser ? commentUser.name : "Unknown User"}</strong>
                    <p>{comment.commentText}</p>
                </div>
            )
        })}
    </div>
  )
}
