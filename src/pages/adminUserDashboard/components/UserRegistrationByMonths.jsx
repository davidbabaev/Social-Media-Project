import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { LineChart, Line, ResponsiveContainer,XAxis, YAxis, Tooltip} from 'recharts';


export default function UserRegistrationByMonths() {

    const {arrayGroupUsersRegistarationByMonth} = useAnalytics();

  return (
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
  )
}
