import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar ,PieChart, Pie, Cell, CartesianGrid, Legend} from 'recharts';


export default function GenderAndAgesAnalytics() {

    const {arrayGroup_countPerGender, group_genderByAge} = useAnalytics();

  return (
    <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
    <h2>Gender & Ages Analytics</h2>
    <div>
        <PieChart  width={700} height={400} style={{outline: 'none'}}>
            <Pie 
                data={arrayGroup_countPerGender} 
                nameKey="gender" 
                dataKey="count"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {arrayGroup_countPerGender.map((entry, index) => (
                <Cell key={index} fill={entry.gender === 'Male' ? '#E44687' : '#0088FE'}/>
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    </div>
    <div>
        <ResponsiveContainer width="90%" height={400}>
            <BarChart
            data={group_genderByAge}
            margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 5,
            }}
            >
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ages" niceTicks="snap125" />
            <YAxis niceTicks="snap125" />
            <Tooltip />
            <Bar dataKey="Male" stackId="a" fill="#0088FE" background />
            <Bar dataKey="Female" stackId="a" fill="#E44687" background />
            </BarChart>
        </ResponsiveContainer>
    </div>
    </div>
  )
}
