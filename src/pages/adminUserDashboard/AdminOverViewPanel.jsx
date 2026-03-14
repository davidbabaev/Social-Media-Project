import RetentionAnalyticsUsers from './components/RetentionAnalyticsUsers';
import MostPopular from './components/MostPopular';
import TotalAnalytics from './components/TotalAnalytics';
import LoggedInThirtyDays from './components/LoggedInThirtyDays';
import RetentionUserRegisterLoginLastTwoWeeks from './components/RetentionUserRegisterLoginLastTwoWeeks';
import TopAndLastFiveCards from './components/TopAndLastFiveCards';
import LastFiveJoinedUsers from './components/LastFiveJoinedUsers';
import CountPostsByCategoriesList from './components/CountPostsByCategoriesList';
import TopTenActiveUsers from './components/TopTenActiveUsers';
import TenMostPopularCategories from './components/TenMostPopularCategories';
import GenderAndAgesAnalytics from './components/GenderAndAgesAnalytics';
import UserRegistrationByMonths from './components/UserRegistrationByMonths';
import CountriesAnalytics from './components/CountriesAnalytics';

export default function AdminOverViewPanel() {
  return (
    <div>
      <h1>Overview</h1>
      <div 
        style={{
          width: '80vw', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap:'15px'
        }}>
          <TotalAnalytics/>
          <MostPopular/>
          <RetentionAnalyticsUsers/>
          <LoggedInThirtyDays/>
          <RetentionUserRegisterLoginLastTwoWeeks/>
      </div>

      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <TopAndLastFiveCards/>
      </div>

      <div style={{display: 'flex', gap:'15px'}}>
        <LastFiveJoinedUsers/>
        <CountPostsByCategoriesList/>
      </div>

      <TopTenActiveUsers/>
      <TenMostPopularCategories/>
      <GenderAndAgesAnalytics/>
      <UserRegistrationByMonths/>
      <CountriesAnalytics/>
    </div>
)
}

