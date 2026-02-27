import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useUsers from '../../hooks/useUsers';
import { useAuth } from '../../providers/AuthProvider';
import useFollowUser from '../../hooks/useFollowUser';

export default function UserProfileFollowers() {

  const {id} = useParams();
  const {users} = useUsers();
  const {user} = useAuth();
  const {toggleFollow, isFollowByMe} = useFollowUser();
  const navigate = useNavigate();
  
  const currentUserProfile = users.find((userP) => userP._id === id);
  
  if(!currentUserProfile){
    return <p>Loading...</p>
  }

  const currentUserFollowers = users.filter((userF) => userF.following.includes(currentUserProfile._id));

  return (
    <div>
      <h2>Followers</h2>
      {currentUserFollowers.length === 0 && (<p>Still Not Have Following</p>)}
      {currentUserFollowers.map((follower) => (
        <div key={follower._id} style={{display:'flex', gap: '10px', marginBottom: '15px'}}>
          <img style={{borderRadius: '50%', width: '5%'}} src={follower.profilePicture}/>
          <p>
            <span
                style={{cursor: 'pointer'}}
                onClick={() => navigate(`/profiledashboard/${follower._id}/profilemain`)}
            >
              {follower.name} {follower.lastName}
            </span></p>
          {user?._id !== follower._id && (
            <button
              onClick={() => toggleFollow(follower._id)}
            >{isFollowByMe(follower._id) ? "Unfollow" : "Follow"}</button>
          )}
        </div>
      ))}
    </div>
  )
}
