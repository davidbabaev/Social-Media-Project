import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import StatCardReuse from './reusable components/StatCardReuse';

export default function TotalAnalytics() {

    const {
      commentsCount, 
      likesCount, 
      usersLength, 
      registeredCardsLength, 
      avgEngagement
    } = useAnalytics();

  return (
    <div>
        <StatCardReuse value={commentsCount} label="Total Commnts"/>
        <StatCardReuse value={likesCount} label="Total Likes"/>
        <StatCardReuse value={usersLength} label="Total Users"/>
        <StatCardReuse value={registeredCardsLength} label="total Posts"/>
        <StatCardReuse value={avgEngagement} label="Posts Avg. Engagement"/>
    </div>
  )
}
