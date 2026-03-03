import React, { useState } from 'react'
import CardItem from '../components/CardItem'
import { useCardsProvider } from '../providers/CardsProvider';
import { useAuth } from '../providers/AuthProvider';
import useUsers from '../hooks/useUsers';
import useFollowUser from '../hooks/useFollowUser';
import { useNavigate } from 'react-router-dom';

export default function FeedPage() {

    const {feedCards} = useCardsProvider();
    const [count, setCount] = useState(2);
    const {user} = useAuth();
    const {users} = useUsers();
    const{getFollowingCount, getFollowersCount} = useFollowUser();
    const navigate = useNavigate();

    const userFollowing = users.filter(userU => user.following.includes(userU._id))

    const {registeredCards} = useCardsProvider();

    const myCardsCount = registeredCards.filter(card => card.userId === user._id).length;

    const countedRegisterCards = feedCards.slice(0, count)

  return (
    <div style={{display: 'flex', width:"100%"}}>
        <div style={{width:"100%", margin: '5px', textAlign:'center'}}>
            <img 
                style={{width: '100%', borderRadius: '10px', height: '100px'}}
                src= {user?.coverImage}
            />
            <img 
                style={{width: '40%', borderRadius: '50%', marginTop:'-50px', border: '2px solid white'}}
                src= {user?.profilePicture}    
            />
            <p style={{fontSize: '20px', fontWeight:'bold'}}>{user?.name} {user?.lastName}</p>
            <p style={{}}>{user?.job}</p>
            <p style={{}}>{user?.address?.country}, {user?.address?.city}</p>
            <div style={{display:'flex', justifyContent: 'center'}}>
                {userFollowing.slice(0,6).map((followedUser) => (
                    <img 
                        key= {followedUser._id} 
                        src= {followedUser.profilePicture}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '2px, solid, white',
                            marginLeft: '-20px',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/profiledashboard/${followedUser._id}/profilemain`)}
                    />
                ))}

            </div>

            <div style={{display: 'flex', gap: '10px'}}>
              <p>followers - {getFollowersCount(user?._id)}</p>
              <p>following - {getFollowingCount(user?._id)}</p>
              <p>posts - {myCardsCount}</p>
            </div>
            <button 
                style={{border: '1px solid lightGray', padding: '10px', borderRadius: '10px', cursor: 'pointer'}}
                onClick={() => navigate(`/dashboard/myfavorites`)}  
            >Favorite Users</button>
            <br />
            <br />
            <button 
                style={{border: '1px solid lightGray', padding: '10px', borderRadius: '10px', cursor: 'pointer'}}
                onClick={() => navigate(`/dashboard/myfavoritescards`)}  
            >Favorite Posts</button>
        </div>

        <div style={{padding: '5px', width:"100%", margin: '5px'}}>
            <p style={{padding: '5px', border: '1px solid lightGray', borderRadius:'10px'}}>Create new card</p>
            <div style={{padding: '5px'}}>
                {countedRegisterCards.map((card) => (
                    <CardItem key={card._id} card={card}/>
                ))}
                <div>
                    {count >= countedRegisterCards.length ? (<p>No More Cards</p>) : (
                    <button onClick={() => setCount(count + 2)}>Read more</button>
                    )} 

                </div>
            </div>
        </div>

        <div style={{padding: '5px', border: '1px solid lightGray', borderRadius:'10px', width:"100%", margin: '5px'}}>
            <p style={{padding: '5px', border: '1px solid lightGray', borderRadius:'10px'}}>add new firsnds 'friends of friends'</p>
        </div>
    </div>
  )
}
