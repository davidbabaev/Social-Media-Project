import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import useUsers from '../../hooks/useUsers';
import useFollowUser from '../../hooks/useFollowUser';
import UserProfileAbout from './UserProfileAbout';
import UserProfileMain from './UserProfileMain';
import { useAuth } from '../../providers/AuthProvider';
import UserProfileFollowing from './UserProfileFollowing';
import UserProfileFollowers from './UserProfileFollowers';
import { useCardsProvider } from '../../providers/CardsProvider';

export default function UserProfileLayout() {

    const {id} = useParams();
    const{users} = useUsers();
    const {user} = useAuth();
    const {refreshFeed} = useCardsProvider();
    
    const {toggleFollow, isFollowByMe, getFollowingCount, getFollowersCount} = useFollowUser();
    
    const userProfile = users.find(u => u._id === id);
    
    const mystyle = {marginRight: '8px'};
    const navigate = useNavigate();
    
    if(!userProfile){
        return <p>Loading..</p>
    }

  return (
    <div>

    <div
      style={{
      border: 'solid black 1px', 
      padding: '20px', 
      borderRadius: '20px', 
      margin: '20px 0px'
      }}
      >
      <img style={{
        width: '100%', 
        borderRadius: '10px', 
        height:'230px', 
        objectFit:'cover'}} 
        src={userProfile.coverImage}
        />
      <img 
      style={{
        marginTop: '-100px',
        marginLeft: '20px',
        width: '17%', 
        borderRadius: '50%', 
        border: 'solid 2px white', 
        objectFit:'cover', 
        height:'170px'
      }} 
      src={userProfile.profilePicture}
      />

      <h2>{userProfile.name} {userProfile.lastName}</h2>

      <div style={{display:'flex', gap: '20px'}}>
        <div style={{display:'block', border: '1px solid black', padding: '10px', borderRadius: '10px'}}>
            <p>Followers</p>
            <p>{getFollowersCount(userProfile._id)}</p>
        </div>

        <div style={{display:'block', border: '1px solid black', padding: '10px', borderRadius: '10px'}}>
            <p>following</p>
            <p>{getFollowingCount(userProfile._id)}</p>
        </div>

        {user?._id === userProfile._id && (<button onClick={() => navigate(`/dashboard/myprofile`)}>Edit Your Profile</button>)}
      
      {user?._id !== userProfile._id && (
        <button onClick={async() => {
            await toggleFollow(userProfile._id)
            await refreshFeed();
        }}>
            {isFollowByMe(userProfile._id) ? "Unfollow" : "Follow"}
        </button>
      )}

        <div>
          <nav>
              <Link style={mystyle} to={`/profiledashboard/${id}/profilemain`}>All Media</Link>
              <Link style={mystyle} to={`/profiledashboard/${id}/about`}>About</Link>
              <Link style={mystyle} to={`/profiledashboard/${id}/following`}>Following</Link>
              <Link style={mystyle} to={`/profiledashboard/${id}/followers`}>Followers</Link>
          </nav>
      </div>
    </div> 
    </div>
            <Routes>
              <Route index element = {<UserProfileMain/>}/>
              <Route path='/profilemain' element = {<UserProfileMain/>}/>
              <Route path='/about' element = {<UserProfileAbout/>}/>
              <Route path='/following' element = {<UserProfileFollowing/>}/>
              <Route path='/followers' element = {<UserProfileFollowers/>}/>
            </Routes>
    </div>
  )
}

