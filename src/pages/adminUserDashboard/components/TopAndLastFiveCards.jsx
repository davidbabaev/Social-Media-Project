import React from 'react'
import TopAndLastFiveCardReuse from './reusable components/TopAndLastFiveCardReuse'
import useAnalytics from '../hooks/useAnalytics'
import useUsers from '../../../hooks/useUsers';

export default function TopAndLastFiveCards() {

    const {
        topFiveCards,
        lastFiveCards,
    } = useAnalytics();
    const {users} = useUsers();

  return (
    <div>
        <TopAndLastFiveCardReuse
            topFiveValue = {topFiveCards}
            usersArrayValue = {users}
            mainTitle = {"Top 5 cards"}
            showInteractions = {true}
            />

        <TopAndLastFiveCardReuse
            topFiveValue = {lastFiveCards}
            usersArrayValue = {users}
            mainTitle = {"Last 5 created posts"}
            showInteractions = {false}
        />
    </div>
  )
}
