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
import { Box } from '@mui/material';

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
          <LoggedInThirtyDays/>
          <MostPopular/>
          <Box sx={{display:'flex', gap: 2}}>
            <RetentionAnalyticsUsers/>
            <RetentionUserRegisterLoginLastTwoWeeks/>
          </Box>
      </div>

        <Box pt={2}>
          <TopAndLastFiveCards/>
        </Box>

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

