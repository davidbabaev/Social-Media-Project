import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useUsers from '../../hooks/useUsers';
import { useAuth } from '../../providers/AuthProvider';
import useFollowUser from '../../hooks/useFollowUser';

export default function UserProfileFollowing() {

  const {id} = useParams();
  const {users} = useUsers();
  const {user} = useAuth();
  const {toggleFollow, isFollowByMe} = useFollowUser();
  const navigate = useNavigate();
  
  const currentUserProfile = users.find((userP) => userP._id === id);

  if(!currentUserProfile){
    return <p>Loading...</p>
  }
  
  const currentUserFollowing = users.filter((userF) => currentUserProfile.following.includes(userF._id));

  return (
    <div>
      <h2>Following</h2>
      {currentUserFollowing.length === 0 && (<p>Still Not Have Following</p>)}

      {currentUserFollowing.map((following) => (
        <div key={following._id} style={{display:'flex', gap: '10px', marginBottom: '15px'}}>
          <img style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px, solid, white',
              objectFit: 'cover',
              cursor: 'pointer'
          }} src={following.profilePicture}/>
          <p>
            <span
                style={{cursor: 'pointer'}}
                onClick={() => navigate(`/profiledashboard/${following._id}/profilemain`)}
            >
              {following.name} {following.lastName}
            </span>
          </p>
          {user?._id !== following._id && (
            <button
              onClick={() => toggleFollow(following._id)}
            >{isFollowByMe(following._id) ? "Unfollow" : "Follow"}</button>
          )}
        </div>
      ))}

    </div>
  )
}
