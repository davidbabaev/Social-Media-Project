import React from 'react'

export default function MostPupularCardReuse({
    valueTitle, 
    valueCount, 
    title, 
    description}) {

  return (
    <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
        <h2>{valueTitle}</h2>
        <p>{title}</p>
        <h2>{valueCount}</h2>
        <p>{description}</p>
    </div>
  )
}
