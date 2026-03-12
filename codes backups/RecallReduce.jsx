import React from 'react'
import { useCardsProvider } from '../src/providers/CardsProvider'
import { useAuth } from '../src/providers/AuthProvider';
import { CARD_CATEGORIES } from '../src/constants/cardsCategories';

export default function RecallReduce() {

    const {registeredCards} = useCardsProvider();
    const {users} = useAuth();

    // you have an array of cards --> registeredCards [{category: 'cars'}, {category:'beauty'}]

    // build an object that counts how many cards exist per category:

    const perCat = registeredCards.reduce((acc, card) => {
        if(acc[card.category]){
            acc[card.category] = acc[card.category] + 1
        } else{
            acc[card.category] = 1
        }
        return acc
    }, {})    
    console.log(perCat);
    
    // const sort
    const sortOld = registeredCards.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
    const sortNew = registeredCards.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))














    const categoryCount = registeredCards.reduce((acc, card) => {
        if(acc[card.category]){
            acc[card.category] = acc[card.category] + 1
        }
        else{
            acc[card.category] = 1
        }
        return acc
    }, {})











const engaged = [...result]
.map((card) => {
    return {...card, cardEngagemnet: card.comments.length + card.likes.length}
})
.sort((a,b) => {
    return b.cardEngagemnet - a.cardEngagemnet
}).slice(0,5)



const ageGender = users.reduce((acc, user) => {
    const ageRangeUser = ageRange(user.age)

    if(!acc[ageRangeUser]){
        acc[ageRangeUser] = {Male: 0, Female: 0}
    }
    acc[ageRangeUser][user.gender] = acc[ageRangeUser][user.gender] + 1

    return acc;
}, {}) 







    
  return (
    <div>
    </div>
  )
}
