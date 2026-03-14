import React from 'react'
import useAnalytics from '../hooks/useAnalytics'

export default function RetentionUserRegisterLoginLastTwoWeeks() {

    const {
        retention,
        weeklyActiveUsersCount,
        newRegisteredUsers_LastWeek_count,
    } = useAnalytics();

  return (
    <div style={{border:'1px solid lightgray' ,borderRadius: '10px', padding: '15px'}}>
        <h2>{retention}%</h2>
        <p>Retention Users</p>
        <p>Logged In This week</p>
        <p>{weeklyActiveUsersCount}</p>
        <p>Registered Last Week</p>
        <p>{newRegisteredUsers_LastWeek_count}</p>
    </div>
  )
}
