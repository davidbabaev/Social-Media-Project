import { useAuth } from "../providers/AuthProvider";
import { useCardsProvider } from "../providers/CardsProvider";

function useCommentsCards() {

const {registeredCards ,handleAddComment, handleRemoveComment} = useCardsProvider();
const {user} = useAuth();


const addComment = (commentText, cardId) => {
  if(!user) return;
  return handleAddComment(cardId, user.userId, commentText)
}

const removeComment = () => {
  if(!user) return;
  return handleRemoveComment()
}

const countComments = (cardId) => {
  const card = registeredCards.find(c => c.cardId === cardId)
  const count = (card?.comments || []).length
  return count
}

  return {addComment, countComments}
}

export default useCommentsCards;
















/*   const {user} = useAuth();
  const {registeredCards, handleAddComment} = useCardsProvider();
    
  const addComment = (cardId, commentText) => {
    if(!user) return;
    handleAddComment(cardId, user.userId, commentText)
  }


  // count comments
  const countComments = (cardId) => {
    const card = registeredCards.find(c => c.cardId === cardId); 
    // guarde
    const commentsCount = (card?.comments || []).length;
    return commentsCount;
  }

  return{addComment, countComments} */
