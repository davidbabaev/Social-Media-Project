import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { LineChart, Line, ResponsiveContainer} from 'recharts';

export default function LoggedInThirtyDays() {

    const {
        loggedInThirtyDaysCount,
        arrayGroupUsersLoginActivity,
    } = useAnalytics();

  return (
    <div 
    style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
    <h2>{loggedInThirtyDaysCount}</h2>
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
  )
}
