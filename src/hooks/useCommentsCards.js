import { useAuth } from "../providers/AuthProvider";
import { useCardsProvider } from "../providers/CardsProvider";

function useCommentsCards() {

  const {user} = useAuth();
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

  return{addComment, countComments}
}

export default useCommentsCards;