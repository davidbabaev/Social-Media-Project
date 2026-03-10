import React from 'react'
import { useCardsProvider } from '../../providers/CardsProvider'
import useUsers from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

import { LineChart, Line, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar ,PieChart, Pie, Cell} from 'recharts';

export default function AdminOverViewPanel() {

  const {registeredCards} = useCardsProvider();
  const {users} = useUsers();
  const navigate = useNavigate();
  const COLORS = [
    '#0088FE', 
    '#00C49F', 
    '#FFBB28', 
    '#FF8042', 
    '#8884d8', 
    '#82ca9d', 
    '#ff6b6b', 
    '#ffd93d', 
    '#6bcb77', 
    '#4d96ff'
  ];

  const commentsCount = registeredCards.reduce((sum, card) => sum + (card.comments || []).length, 0);
  const likesCount = registeredCards.reduce((sum, card) => sum + (card.likes || []).length, 0);
  
  const usersC = users.map((user) => {
    const maxCardsUser = registeredCards.filter((card) => {
      const usersCards = card.userId === user._id
      return usersCards;
    })
    return {name: user.name + ' ' + user.lastName, posts: (maxCardsUser || []).length}
  }) 
  // look like:
  // [{user: {...}, cardCount: 3}, {user: {...}, cardCount: 1}]
  
  const topTenUsers = usersC.sort((a,b) => b.posts - a.posts).slice(0,10)
  
  const mostActiveUser = usersC.length > 0
  ? usersC.reduce((max, current) => current.posts > max.posts ? current : max)
  : null;
  
  const mostLikesCard = registeredCards.length > 0
  ? registeredCards.reduce((max, current) => current.likes.length > max.likes.length ? current : max)
  : null;
  
  
  const lastFiveUsers = users.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,5)
  const lstFiveCards = registeredCards.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,5)

  const countPerCategory = registeredCards.reduce((acc, card) => {
    if(acc[card.category]){
      acc[card.category] = acc[card.category] + 1
    } else{
      acc[card.category] = 1
    }
    return acc
  }, {})
  // looks like:
  // { tech: 3, sport: 1, food: 1 }
  
  const arrayCountPerCategory = Object.entries(countPerCategory).map((item) => {
    return {name: item[0], posts: item[1]}
  });
  // {[ ["tech": 3], ["sport": 1], ["food": 1] ]}
  
  const topTenCategories = arrayCountPerCategory.sort((a,b) => b.posts - a.posts).slice(0,10)
  
  const groupUsersRegistarationByMonth = users.reduce((acc, user) => {
    const userCrestedDate = user.createdAt.slice(0,10);
    if(acc[userCrestedDate]){
          acc[userCrestedDate] = acc[userCrestedDate] + 1
      }
      else{
        acc[userCrestedDate] = 1
      }
      return acc
  }, {})

  const arrayGroupUsersRegistarationByMonth = Object.entries(groupUsersRegistarationByMonth).map((item) => {
    return{month: item[0], users: item[1]}
  }).sort((a,b) => new Date(a.month) - new Date(b.month))



  const countPerGender = users.reduce((acc, user) => {
    if(acc[user.gender]){
      acc[user.gender] = acc[user.gender] + 1
    }
    else{
      acc[user.gender] = 1
    }

    return acc;
  }, {})

  // [Male: 1]
  // [0] - [1]

  const arrayGroup_countPerGender = Object.entries(countPerGender).map((item) => {
    return {gender: item[0], count: item[1]}
  })
  // [{gender: 'Male', count: 7}, {gender: 'Female', count: 5}]




  return (
    <div>
      <h1>Overview</h1>
      <div style={{width: '80vw', display: 'flex', gap:'15px'}}>
          <div style={{border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}}>
            <h2>{commentsCount}</h2>
            <p>Total Comments</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{likesCount}</h2>
            <p>Total Likes</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{users.length}</h2>
            <p>Total Users</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{mostActiveUser?.name}</h2>
            <p>Most Active User</p>
            <h2>{mostActiveUser?.posts}</h2>
            <p>total Posts</p>
          </div>
          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{mostLikesCard?.title}</h2>
            <p>Most like card</p>
            <h2>{mostLikesCard?.likes.length}</h2>
            <p>Total likes</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{registeredCards.length}</h2>
            <p>total Posts</p>
          </div>
          
      </div>
      <br />

      <div style={{display: 'flex', gap:'15px'}}>
          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>Last 5 joined users</h2>
            {lastFiveUsers.map((userF) => (
              <div 
              key={userF._id}
              >
                <span style={{display:'flex', gap: '10px', marginBottom: '15px', borderBottom: '1px solid lightgray', cursor: 'pointer'}} onClick={() => navigate(`/profiledashboard/${userF._id}/profilemain`)}>
                  <img style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px, solid, white',
                      objectFit: 'cover',
                  }} src={userF.profilePicture}/>
                  <p>{userF.name} {userF.lastName} -</p>
                  <p>Joined At {userF.createdAt.split("T")[0]}</p>
                </span>
              </div>
            ))}
          </div>

          <div style={{width: "40%",border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>Last 5 created posts</h2>
            {lstFiveCards.map((cardF) => {
              const cardCreator = users.find(u => u._id === cardF.userId)

              return(
                <div 
                  key={cardF._id}
                  style={{display:'flex', gap: '10px', alignItems: 'center', marginBottom: '15px'}}  
                >
                  <img 
                    src={cardF.image}
                    style={{width: '100px', height: '80px',borderRadius: '10px', objectFit: 'cover', cursor: 'pointer'}}
                    onClick={() => navigate(`/carddetails/${cardF._id}`)}
                  />
                  <div>
                      <div style={{display:'flex'}}>
                        <img style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px, solid, white',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }} 
                        src={cardCreator?.profilePicture}
                        onClick={() => navigate(`/profiledashboard/${cardCreator?._id}/profilemain`)}
                        />

                        <div style={{display: 'flex', flexDirection:'column'}}>
                          <p 
                            style={{margin: '5px 0px', cursor: 'pointer'}}
                            onClick={() => navigate(`/profiledashboard/${cardCreator?._id}/profilemain`)}
                            >{cardCreator?.name} {cardCreator?.lastName}  
                          </p>
                          <p style={{color: 'gray', fontSize:'12px', margin: 0}}>{cardF.createdAt.split("T")[0]}</p>
                        </div>
                      </div>
                      <p 
                        style={{fontWeight: 'bold', margin: 0, cursor: 'pointer'}}
                        onClick={() => navigate(`/carddetails/${cardF._id}`)}
                        >{cardF.title}</p>
                      <p 
                        onClick={() => navigate(`/carddetails/${cardF._id}`)}
                        style={{
                          cursor: 'pointer',
                          margin: '5px 0px',
                          margin: 0,
                          whiteSpace: 'nowrap',        // prevent text from wrapping
                          overflow: 'hidden',          // hide overflow
                          textOverflow: 'ellipsis',    // show "..." at the end
                          maxWidth: '200px'
                        }}>{cardF.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}}>
            <h2>Posts by catrgories</h2>
            {arrayCountPerCategory.map((item, index) => (
              <p key={index}>{item.name} - {item.posts} {item.posts === 1 ? "Post" : "Posts"}</p>
            ))}
          </div>
      </div>

      <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
        <h2>Top 10 Active Users</h2>
        <ResponsiveContainer  
          width="90%" height={300}>
            <BarChart 
              responsive
              data={topTenUsers}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="name" />
              <YAxis/>
              <Tooltip />
              <Bar dataKey="posts" fill="gray" />
            </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
        <h2>10 Most popular categories</h2>
        <PieChart  width={700} height={400} style={{outline: 'none'}}>
              <Pie 
                data={topTenCategories} 
                nameKey="name" 
                dataKey="posts"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {topTenCategories.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}
                </Pie>
              <Tooltip />
        </PieChart>
      </div>

      <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
        <h2>Gender</h2>
        <PieChart  width={700} height={400} style={{outline: 'none'}}>
              <Pie 
                data={arrayGroup_countPerGender} 
                nameKey="gender" 
                dataKey="count"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {arrayGroup_countPerGender.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                ))}
                </Pie>
              <Tooltip />
        </PieChart>
      </div>

    
      <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
        <h2>Users registration</h2>
        <ResponsiveContainer  
          width="90%" height={300}>
            <LineChart 
              responsive
              data={arrayGroupUsersRegistarationByMonth}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="month" />
              <YAxis/>
              <Tooltip />
              <Line dataKey="users" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
      </div>





    </div>
)
}

