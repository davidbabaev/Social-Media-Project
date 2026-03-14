import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

export default function TenMostPopularCategories() {

    const COLORS = [
        '#0088FE', 
        '#00C49F', 
        '#FFBB28', 
        '#FF8042', 
        '#8884d8', 
        '#6BCB77', 
        '#ff6b6b', 
        '#ffd93d', 
        '#6bcb77', 
        '#4d96ff'
    ];
    const {topTenCategories} = useAnalytics();

  return (
    <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
    <h2>10 Most popular categories</h2>
    <PieChart  width={700} height={400} style={{outline: 'none'}}>
            <Pie 
            data={topTenCategories} 
            nameKey="name" 
            dataKey="posts"
            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {topTenCategories.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]}/>
            ))}
            </Pie>
            <Tooltip />
    </PieChart>
    </div>
  )
}
