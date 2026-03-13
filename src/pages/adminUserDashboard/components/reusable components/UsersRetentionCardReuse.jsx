import React from 'react'

export default function UsersRetentionCardReuse({
    mainCount, 
    secondValue, 
    percentsValue, 
    pFirstValue, 
    pVsValue, 
    pPercentsValue
}) {

    const styleDiv = {border:'1px solid lightgray', borderRadius: '10px', padding: '15px'};
    const styleVs = {color: mainCount > secondValue ? '#6BCB77' : '#FF6B6B'}
    const stylePercents = {color: percentsValue > 0 ? '#6BCB77' : '#FF6B6B'}

  return (
    <div style={styleDiv}>
        <h2>{mainCount}</h2>
        <p>{pFirstValue}</p>
        <p style={styleVs}>
            {mainCount > secondValue ? '+' : ''}
            {mainCount - secondValue}
            {pVsValue}
        </p>
        <p style={stylePercents}>
            {percentsValue > 0 && '+'}
            {percentsValue.toFixed(1)}
            {pPercentsValue}
        </p>
    </div>
  )
}
