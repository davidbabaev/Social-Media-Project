import React from 'react'
import useUsers from '../../hooks/useUsers';
import { useParams } from 'react-router-dom';

export default function UserProfileLayout() {

    const{users} = useUsers();
    const {id} = useParams();

    // take the current page user:
    const currentProfileUser = users.find((user) => user._id === id);

    const followingList = users.filter((user) => currentProfileUser.following.includes(user._id))
    
    const followersList = users.filter((user) => currentProfileUser.following.includes(!user._id))

  return (
    <div>UserProfileLayout</div>
  )
}
