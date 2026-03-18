import React from 'react'
import useAnalytics from '../hooks/useAnalytics'

export default function CountriesAnalytics() {

    const {group_countCountriesPerUsers} = useAnalytics();

  return (
    <div style={{border:'1px solid lightgray', borderRadius: '10px', padding: '15px'}}>
        <h2>Countries</h2>
        {group_countCountriesPerUsers.map((item, index) => (
          <div key={index} style={{display: 'flex'}}>
            <p style={{margin: '10px 0px'}}>{item.country}</p>
            <img 
              style={{
                width: '40px', 
                height: '25px', 
                borderRadius: '5px', 
                objectFit:'cover',
                margin: '10px'
              }} 
              onError= {(e) => e.target.src = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
              src={item.flag} 
            />
            <div 
              style={{
                backgroundColor: 'lightgray', 
                width: '100%',
                height: '20%', 
                borderRadius: '5px',
                margin: '10px 0px'
              }}
            >
              <div 
                style={{backgroundColor: '#00C49F', width:`${item.percent}%`, borderRadius: '5px'}}>
                <p style={{color: 'white',margin: '0px', minWidth: '40px', padding: '10px'}}>{item.percent}%</p>
              </div>
            </div>
            <p style={{margin: '10px'}}>{item.count} {item.count < 2 ? "user" : "users"}</p>
          </div>
        ))}
    </div>
  )
}
