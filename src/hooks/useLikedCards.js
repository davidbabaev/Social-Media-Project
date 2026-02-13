import { useAuth } from "../providers/AuthProvider";
import { useCardsProvider } from "../providers/CardsProvider";

function useLikedCards() {
    const {user} = useAuth();
    const {registeredCards, handleToggleLike} = useCardsProvider();

    // write the three functions. start with the simplest one -> toggleLike
    // all it does is call handleToggleLike but passes user.userId automatically so the page doesn't have to.

    // handling add/ filer likes and unlikes with card object, likedUsers array.
    const toggleLike = (cardId) => {
        handleToggleLike(cardId, user.userId)
    }

    // for the UI, the real add and filter from the array happening is handleToggleLike
    const isLikeByMe = (cardId) => {
        const card = registeredCards.find(card => card.cardId === cardId);
        if(!card && !user) return false;
        return (card.likedUsers || []).includes(user.userId);
    }

    const getLikeCount = (cardId) => {
        const card = registeredCards.find(c => c.cardId === cardId)
        const likeCount = (card?.likedUsers || []).length;
        return likeCount;
    }

    return{toggleLike, isLikeByMe, getLikeCount}
}

export default useLikedCards;
