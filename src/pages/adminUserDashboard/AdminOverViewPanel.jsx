import React from 'react'
import { useCardsProvider } from '../../providers/CardsProvider'
import useUsers from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';


import { LineChart, Line, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar ,PieChart, Pie, Cell, CartesianGrid, Legend} from 'recharts';
import useCountries from '../../hooks/useCountries';

export default function AdminOverViewPanel() {

  const {apiCountriesList} = useCountries(); 
  const {registeredCards} = useCardsProvider();
  const {users} = useUsers();
  const navigate = useNavigate();
  const COLORS = [
    '#0088FE', 
    '#00C49F', 
    '#FFBB28', 
    '#FF8042', 
    '#8884d8', 
    '#6BCB77', 
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
  const lastFiveCards = registeredCards.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,5)

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
    const userCreatedDate = user.createdAt.slice(0,10);
    if(acc[userCreatedDate]){
          acc[userCreatedDate] = acc[userCreatedDate] + 1
      }
      else{
        acc[userCreatedDate] = 1
      }
      return acc
  }, {})

  const arrayGroupUsersRegistarationByMonth = Object.entries(groupUsersRegistarationByMonth).map((item) => {
    return{month: item[0], users: item[1]}
  }).sort((a,b) => new Date(a.month) - new Date(b.month))


  const ageRange = (age) => {
    if(age >= 18 && age <= 24) return "18-24"
    if(age >= 25 && age <= 34) return "25-34"
    if(age >= 35 && age <= 44) return "35-44"
    if(age >= 45 && age <= 54) return "45-54"
    if(age >= 55 && age <= 64) return "55-64"
    if(age > 64) return "65+"
  }

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

  const genderByAge = users.reduce((acc, user) => {
    const range = ageRange(user.age); // "25-34"

    if(!acc[range]){
      acc[range] = {Male: 0, Female: 0}
    }
    acc[range][user.gender] = acc[range][user.gender] + 1
    return acc;
  }, {}) 
  // [
  // {ages:'18-24', Male: 2, Female: 1}
  // {ages:'25-34', Male: 0, Female: 1}
  // ]

  const group_genderByAge = Object.entries(genderByAge).map((item) => {
    return { ages: item[0], ...item[1]}
  }).sort((a,b) => a.ages[0] - b.ages[0])

  // item 0 -> the key
  // item 1 -> the value


  const countCountriesPerUsers = users.reduce((acc, user) => {
    if(acc[user.address.country]){
      acc[user.address.country] = acc[user.address.country] + 1;
    }
    else{
      acc[user.address.country] = 1;
    }
    return acc;
  },{})

  const group_countCountriesPerUsers = 
  Object.entries(countCountriesPerUsers).map((item) => {
    const foundCountry = apiCountriesList.find(f => f.name === item[0])

    return {
      country: item[0], 
      count: item[1],
      percent: (item[1] / users.length * 100).toFixed(0),
      flag: foundCountry?.flag
    }
  }).sort((a,b) => b.count - a.count)

  const avgEngagement = ((commentsCount + likesCount) / registeredCards.length).toFixed(1);


  const topFiveCards = [...registeredCards]

  .sort((a,b) => {
      const aEng = a.likes.length + a.comments.length
      const bEng = b.likes.length + b.comments.length
      return bEng - aEng;
  }).slice(0,5)


  const date = new Date();

  const DailyActiveUsers = users.filter((user) => {
    const todayLoggedInDate = date.toISOString().split("T")[0] === user.lastLoginAt?.split("T")[0];

    return todayLoggedInDate;
  })

  // logged in today
  const dailyActiveUsersCount = DailyActiveUsers.length;


  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
  const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
  const dateInSevenDays = date.getTime() - sevenDaysInMs
  const dateInFourteenDays = date.getTime() - fourteenDaysInMs
  
  const WeeklyActiveUsers = users.filter((user) => {
    const userDate = new Date(user.lastLoginAt).getTime();
    const loggedIn = userDate >= dateInSevenDays
    return loggedIn
  })
  
  // logged in this week
  const weeklyActiveUsersCount = WeeklyActiveUsers.length;
  
  const moreThenSevenDays = users.filter((user) => {
    const userDate = new Date(user.lastLoginAt).getTime();
    const loggedIn = userDate >= dateInFourteenDays && userDate < dateInSevenDays

    return loggedIn
  })

  const newRegisteredUsers_ThisWeek = users.filter((user) => {
    const userDate = new Date(user.createdAt);
    const created = userDate >= dateInSevenDays
    return created
  })

  const newRegisteredUsers_ThisWeek_count = newRegisteredUsers_ThisWeek.length;
  
  const newRegisteredUsers_LastWeek = users.filter((user) => {
    const userDate = new Date(user.createdAt);
    const created = userDate >= dateInFourteenDays && userDate < dateInSevenDays
    
    return created;
  })

  const newRegisteredUsers_LastWeek_count = newRegisteredUsers_LastWeek.length;
  
  const registeredGrowthRate = 
  newRegisteredUsers_LastWeek_count === 0 ? 0 : 
  (newRegisteredUsers_ThisWeek_count - newRegisteredUsers_LastWeek_count) / newRegisteredUsers_LastWeek_count * 100;

  const moreThenSevenDaysCount = moreThenSevenDays.length;
  
  const oneDayInMs = 1 * 24 * 60 * 60 * 1000;
  const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
  const dateInOneDay = date.getTime() - oneDayInMs;
  const dateInTwoDays = date.getTime() - twoDaysInMs;
  
  const loggedInYesterday = users.filter((user) => {
    const userDate = new Date(user.lastLoginAt).getTime();
    const Yesterday = userDate < dateInOneDay && userDate >= dateInTwoDays
    return Yesterday;
  }) 
  
  // logged in yesterday
  const loggedInYesterdayCount = loggedInYesterday.length;
  
  const weekLoginGrowth = (weeklyActiveUsersCount - moreThenSevenDaysCount) / moreThenSevenDaysCount * 100


  const retentionUsers = newRegisteredUsers_LastWeek.filter((user) => {
    return WeeklyActiveUsers.some(userS => userS._id === user._id)
  })

  const retentionUsersCount = retentionUsers.length;

  const retention = 
  newRegisteredUsers_LastWeek_count === 0 ? 0 :
  (retentionUsersCount / newRegisteredUsers_LastWeek_count) * 100



  const thertyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const dateThertyDays = date.getTime() - thertyDaysInMs;
  
  const loggedInTheryDays = users.filter((user) => {
    const userDate = new Date(user.lastLoginAt).getTime();

    const ThertyDays = userDate > dateThertyDays
    return ThertyDays;
  }) 

    const groupUsersLoginActivity = loggedInTheryDays.reduce((acc, user) => {
    const userLoginDate = user.lastLoginAt.slice(0,10);
    if(acc[userLoginDate]){
          acc[userLoginDate] = acc[userLoginDate] + 1
      }
      else{
        acc[userLoginDate] = 1
      }
      return acc
  }, {})

  const arrayGroupUsersLoginActivity = 
  Object.entries(groupUsersLoginActivity).map((item) => {
    return{day: item[0], users: item[1]}
  }).sort((a,b) => new Date(a.day) - new Date(b.day))

  return (
    <div>
      <h1>Overview</h1>
      <div style={{width: '80vw', display: 'flex', flexWrap: 'wrap', gap:'15px'}}>
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

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{dailyActiveUsersCount}</h2>
            <p>Logged In Today</p>
            <p>
              +
              {dailyActiveUsersCount - loggedInYesterdayCount} 
              VS Yesterday</p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{newRegisteredUsers_ThisWeek_count}</h2>
            <p>
              Registered This Week
            </p>
            <p
              style={{color: newRegisteredUsers_ThisWeek_count > 0 ? '#6BCB77' : '#FF6B6B'}}
            >
              {newRegisteredUsers_ThisWeek_count > newRegisteredUsers_LastWeek_count ? '+' : ''}
              {newRegisteredUsers_ThisWeek_count - newRegisteredUsers_LastWeek_count}
              VS previous week
            </p>
            <p style={{color: registeredGrowthRate > 0 ? '#6BCB77' : '#FF6B6B'}}>
              {registeredGrowthRate > 0 && '+'}
              {registeredGrowthRate.toFixed(1)}
              % Than Last Week
            </p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{weeklyActiveUsersCount}</h2>
            <p>Logged In this Week</p>
            <p
              style={{color: weeklyActiveUsersCount > moreThenSevenDaysCount ? '#6BCB77' : '#FF6B6B'}}
            >
              {weeklyActiveUsersCount > moreThenSevenDaysCount ? "+" : "-"}
              {weeklyActiveUsersCount - moreThenSevenDaysCount}
               VS Previous Week
            </p>
            <p 
              style={{color: weekLoginGrowth > 0 ? '#6BCB77' : '#FF6B6B'}}>
              {weekLoginGrowth > 0 && '+'}
              {weekLoginGrowth.toFixed(1)}
              % Than Last Week
            </p>
          </div>

          <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>{loggedInTheryDays.length}</h2>
            <p>Logged In this Month</p>

            <div>
              <ResponsiveContainer width={'100%'} height={60}>
                <LineChart
                  data={arrayGroupUsersLoginActivity}
                >
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke={"#6BCB77"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              </div>
          </div>

          <div style={{border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}}>
              <h2>{avgEngagement}</h2>
              <p>Posts Avg. Engagement</p>
           </div>

          <div style={{border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}}>
              <h2>{retention}%</h2>
              <p>Retention Users</p>
              <p>Logged In This week</p>
              <p>{weeklyActiveUsersCount}</p>
              <p>Registered Last Week</p>
              <p>{newRegisteredUsers_LastWeek_count}</p>
           </div>
          
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>

          <div style={{width: "60%",border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
            <h2>Top 5 cards</h2>
            {topFiveCards.map((card) => {
              const cardCreator = users.find(u => u._id === card.userId)

              return(
                <div 
                  key={card._id}
                  style={{display:'flex', gap: '10px', alignItems: 'center', marginBottom: '15px'}}  
                >
                  <img 
                    src={card.image}
                    style={{width: '200px', height: '120px',borderRadius: '10px', objectFit: 'cover', cursor: 'pointer'}}
                    onClick={() => navigate(`/carddetails/${card._id}`)}
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
                          <p style={{color: 'gray', fontSize:'12px', margin: 0}}>{card.createdAt.split("T")[0]}</p>
                        </div>
                      </div>
                      <p 
                        style={{fontWeight: 'bold', margin: 0, cursor: 'pointer'}}
                        onClick={() => navigate(`/carddetails/${card._id}`)}
                        >{card.title}</p>
                      <p 
                        onClick={() => navigate(`/carddetails/${card._id}`)}
                        style={{
                          cursor: 'pointer',
                          margin: '5px 0px',
                          margin: 0,
                          whiteSpace: 'nowrap',        // prevent text from wrapping
                          overflow: 'hidden',          // hide overflow
                          textOverflow: 'ellipsis',    // show "..." at the end
                          maxWidth: '200px'
                        }}>{card.content}</p>
                      <p>
                        {card.comments.length + card.likes.length} 
                         {(card.comments + card.likes).length < 2 ? " Interactions" : " Interaction"}
                      </p>
                  </div>
                </div>
              )
            })}
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
            {lastFiveCards.map((cardF) => {
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
        <h2>Gender & Ages Analytics</h2>
        <div>
          <PieChart  width={700} height={400} style={{outline: 'none'}}>
                <Pie 
                  data={arrayGroup_countPerGender} 
                  nameKey="gender" 
                  dataKey="count"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {arrayGroup_countPerGender.map((entry, index) => (
                    <Cell key={index} fill={entry.gender === 'Male' ? '#E44687' : '#0088FE'}/>
                  ))}
                  </Pie>
                <Tooltip />
          </PieChart>
        </div>
        <div>
          <ResponsiveContainer width="90%" height={400}>
              <BarChart
                data={group_genderByAge}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ages" niceTicks="snap125" />
                <YAxis niceTicks="snap125" />
                <Tooltip />
                <Bar dataKey="Male" stackId="a" fill="#0088FE" background />
                <Bar dataKey="Female" stackId="a" fill="#E44687" background />
             </BarChart>
          </ResponsiveContainer>
        </div>
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

      <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
        <h2>Countries</h2>
        {group_countCountriesPerUsers.map((item, index) => (
          <div key={index} style={{display: 'flex'}}>
            <p style={{margin: '10px 0px'}}>{item.country}</p>
            <img 
              style={{
                width: '40px', 
                height: '25px', 
                borderRadius: '5px', 
                objectFit:'cover',
                margin: '10px'
              }} 
              src={item.flag} 
            />
            <div 
              style={{
                backgroundColor: 'lightgray', 
                width: '100%',
                height: '20%', 
                borderRadius: '5px',
                margin: '10px 0px'
              }}
            >
              <div 
                style={{backgroundColor: '#00C49F', width:`${item.percent}%`, borderRadius: '5px'}}>
                <p style={{color: 'white',margin: '0px', minWidth: '40px', padding: '10px'}}>{item.percent}%</p>
              </div>
            </div>
            <p style={{margin: '10px'}}>{item.count} {item.count < 2 ? "user" : "users"}</p>
          </div>
        ))}
      </div>

    </div>
)
}

