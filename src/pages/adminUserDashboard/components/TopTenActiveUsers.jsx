import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function TopTenActiveUsers() {

    const {topTenUsers} = useAnalytics();

  return (
    <div 
        style={{
            border:'1px solid lightgray', 
            borderRadius: '10px', 
            padding: '15px'
        }}>
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
  )
}
