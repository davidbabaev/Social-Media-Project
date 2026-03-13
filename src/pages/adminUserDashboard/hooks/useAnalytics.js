import { useCardsProvider } from '../../providers/CardsProvider'
import useUsers from '../../hooks/useUsers';
import useCountries from '../../hooks/useCountries';

function useAnalytics() {

  const {apiCountriesList} = useCountries(); 
  const {registeredCards} = useCardsProvider();
  const {users} = useUsers();

  const registeredCardsLength = registeredCards.length;
  const usersLength = users.length;

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
  
  const topTenUsers = [...usersC].sort((a,b) => b.posts - a.posts).slice(0,10)
  
  const mostActiveUser = usersC.length > 0
  ? usersC.reduce((max, current) => current.posts > max.posts ? current : max)
  : null;
  
  const mostLikesCard = registeredCards.length > 0
  ? registeredCards.reduce((max, current) => current.likes.length > max.likes.length ? current : max)
  : null;
  
  
  const lastFiveUsers = [...users].sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,5)
  const lastFiveCards = [...registeredCards].sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,5)

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
  
  const topTenCategories = [...arrayCountPerCategory].sort((a,b) => b.posts - a.posts).slice(0,10)
  
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
  
  const loggedInThirtyDays = users.filter((user) => {
    const userDate = new Date(user.lastLoginAt).getTime();

    const ThertyDays = userDate > dateThertyDays
    return ThertyDays;
  }) 

    const groupUsersLoginActivity = loggedInThirtyDays.reduce((acc, user) => {
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

  return{
    commentsCount,
    likesCount,
    newRegisteredUsers_ThisWeek_count,
    newRegisteredUsers_LastWeek_count,
    weeklyActiveUsersCount,
    moreThenSevenDaysCount,
    loggedInThirtyDays,
    arrayCountPerCategory,
    topTenUsers,
    mostActiveUser,
    mostLikesCard,
    lastFiveUsers,
    lastFiveCards,
    topTenCategories,
    arrayGroupUsersRegistarationByMonth,
    arrayGroup_countPerGender,
    group_genderByAge,
    group_countCountriesPerUsers,
    avgEngagement,
    topFiveCards,
    dailyActiveUsersCount,
    registeredGrowthRate,
    loggedInYesterdayCount,
    weekLoginGrowth,
    retention,
    arrayGroupUsersLoginActivity,
    registeredCardsLength,
    usersLength
  }
}

export default useAnalytics;