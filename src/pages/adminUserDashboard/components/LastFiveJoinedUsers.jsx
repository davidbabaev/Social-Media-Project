import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { useNavigate } from 'react-router-dom';

export default function LastFiveJoinedUsers() {

    const {
        lastFiveUsers
    } = useAnalytics();

    const navigate = useNavigate();

  return (
    <div 
        style={{
            border:'1px solid lightgray', 
            borderRadius: '10px', 
            padding: '15px'
        }}>
        <h2>Last 5 joined users</h2>
        {lastFiveUsers.map((userF) => (
        <div key={userF._id}>
            <span 
                style={{
                    display:'flex', 
                    gap: '10px', 
                    marginBottom: '15px', 
                    borderBottom: '1px solid lightgray', 
                    cursor: 'pointer'
                }} 
                onClick={() => navigate(`/profiledashboard/${userF._id}/profilemain`)}>
                <img 
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px, solid, white',
                    objectFit: 'cover',
                }} 
                    src={userF.profilePicture}
                />
                <p>{userF.name} {userF.lastName} -</p>
                <p>Joined At {userF.createdAt.split("T")[0]}</p>
            </span>
        </div>
        ))}
    </div>
  )
}
