import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Typography } from '@mui/material';

export default function TopTenActiveUsers() {

    const {topTenUsers} = useAnalytics();

  return (
    <div 
        style={{
            border:'1px solid lightgray', 
            borderRadius: '10px', 
            padding: '15px'
        }}>
        <Typography fontWeight={700} fontSize={15}>Top 10 Active Users</Typography>
        <ResponsiveContainer  
            width="100%" height={400}>
            <BarChart 
                data={topTenUsers}
                layout='vertical'
                margin={{top: 5, right: 40, left: 20, bottom: 5}}
            >
                <XAxis type='number' hide/>
                <YAxis 
                    dataKey="name" 
                    type='category'
                    width={120}
                    tick={{fontSize:14, color: 'text.secondary'}}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip />
                <Bar 
                    dataKey="posts" 
                    fill="#7F77DD" 
                    radius={10}
                    barSize={30}
                    label={{position: 'right', fontSize:13}}

                />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
