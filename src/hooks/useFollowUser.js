import { useAuth } from "../providers/AuthProvider";
import useUsers from "./useUsers";

function useFollowUser() {

  const{ handleToggleFollow, user} = useAuth(); 
  const {users, getUsers} = useUsers();

    // toggle Follow

    const toggleFollow = async (userId) => {
        if(!user) return false;
        await handleToggleFollow(userId);
        getUsers(); // re-fetch users so counts update
    }

    // isFollow by me
    const isFollowByMe = (userId) => {
        if(!user) return false;
        return (user?.following || []).includes(userId)
    }

    // get following Count
    const getFollowingCount = (userId) => {
        const foundUser = users.find(user => user._id === userId);
        if(!foundUser) return 0;
        return (foundUser?.following || []).length
    }

    const getFollowersCount = (userId) => {
        if(!users) return 0;
        return users.filter(userU => (userU.following || []).includes(userId)).length;
    }

  return {toggleFollow, isFollowByMe, getFollowingCount, getFollowersCount} 
}

export default useFollowUser;
