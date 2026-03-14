import React from 'react'
import useAnalytics from '../hooks/useAnalytics'

export default function CountPostsByCategoriesList() {

    const {arrayCountPerCategory} = useAnalytics();

  return (
    <div 
        style={{
            border:'1px solid lightgray',
            borderRadius: '10px', 
            padding: '15px'
        }}>
        <h2>Posts by catrgories</h2>
        {arrayCountPerCategory.map((item, index) => (
            <p key={index}>{item.name} - {item.posts} {item.posts === 1 ? "Post" : "Posts"}</p>
        ))}
    </div>
  )
}
