import React, { useState } from 'react'
import CardItem from '../components/CardItem'
import { useCardsProvider } from '../providers/CardsProvider';

export default function FeedPage() {

    const {feedCards} = useCardsProvider();
    const [count, setCount] = useState(2);

    const countedRegisterCards = feedCards.slice(0, count)

  return (
    <div style={{display: 'flex', width:"100%"}}>
        <div style={{border: '1px solid black', padding: '20px', width:"100%", margin: '5px'}}>
            <p style={{border: '1px solid black', padding: '20px'}}>cover image</p>
            <p style={{border: '1px solid black', padding: '20px'}}>Profile image</p>
            <p style={{border: '1px solid black', padding: '5px'}}>name</p>
            <p style={{border: '1px solid black', padding: '5px'}}>job</p>
            <p style={{border: '1px solid black', padding: '5px'}}>iamges</p>
            <div style={{display: 'flex', gap: '10px'}}>
              <p>followers</p>
              <p>following</p>
              <p>posts</p>
            </div>
            <p style={{border: '1px solid black', padding: '5px'}}>favorites</p>
            <p style={{border: '1px solid black', padding: '5px'}}>selected</p>
        </div>

        <div style={{border: '1px solid black', padding: '20px', width:"100%", margin: '5px'}}>
            <p style={{border: '1px solid black', padding: '20px'}}>Create new card</p>
            <div style={{border: '1px solid black', padding: '20px'}}>
              feed of cards of users that i follow on
                {countedRegisterCards.map((card) => (
                    <CardItem key={card._id} card={card}/>
                ))}
                <div>
                    {count >= countedRegisterCards.length ? (<p>No More Cards</p>) : (
                    <button onClick={() => setCount(count + 2)}>Read more</button>
                    )} 

                </div>
            </div>
        </div>

        <div style={{border: '1px solid black', padding: '20px', width:"100%", margin: '5px'}}>
            <p style={{border: '1px solid black', padding: '20px'}}>add new firsnds 'friends of friends'</p>
        </div>
    </div>
  )
}
